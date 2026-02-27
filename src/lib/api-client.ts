import seedDb from "@/data/db.json";

type DbShape = typeof seedDb;
const DB_KEY = "scanbo_local_db";

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const getDb = (): DbShape => {
  if (typeof window === "undefined") {
    return clone(seedDb);
  }

  const stored = window.localStorage.getItem(DB_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as DbShape;
    } catch {
      // fall through to re-seed
    }
  }

  const seeded = clone(seedDb);
  window.localStorage.setItem(DB_KEY, JSON.stringify(seeded));
  return seeded;
};

const setDb = (db: DbShape) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const normalizePath = (path: string) => path.replace(/^\//, "").split("?")[0];

export async function apiGet<T>(path: string): Promise<T> {
  const db = getDb();
  const key = normalizePath(path) as keyof DbShape;
  if (!(key in db)) {
    throw new Error(`Unknown collection: ${String(key)}`);
  }
  return clone(db[key]) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const db = getDb();
  const key = normalizePath(path) as keyof DbShape;
  const collection = db[key];

  if (!Array.isArray(collection)) {
    throw new Error(`Collection ${String(key)} is not writable`);
  }

  const maxId = collection.reduce((max, item) => {
    const id = typeof item.id === "number" ? item.id : 0;
    return Math.max(max, id);
  }, 0);

  const newItem = { id: maxId + 1, ...(body as Record<string, unknown>) } as T;
  collection.push(newItem as never);
  setDb(db);
  return clone(newItem);
}

export async function apiPatch<T>(
  path: string,
  id: number,
  patch: Partial<Record<string, unknown>>
): Promise<T> {
  const db = getDb();
  const key = normalizePath(path) as keyof DbShape;
  const collection = db[key];

  if (!Array.isArray(collection)) {
    throw new Error(`Collection ${String(key)} is not patchable`);
  }

  const idx = collection.findIndex(
    (item) => (item as Record<string, unknown>).id === id
  );
  if (idx === -1) throw new Error(`Item with id=${id} not found`);

  const updated = { ...(collection[idx] as Record<string, unknown>), ...patch };
  (collection as Record<string, unknown>[])[idx] = updated;
  setDb(db);
  return clone(updated) as T;
}

export async function apiDelete(path: string, id: number): Promise<void> {
  const db = getDb();
  const key = normalizePath(path) as keyof DbShape;
  const collection = db[key];

  if (!Array.isArray(collection)) {
    throw new Error(`Collection ${String(key)} is not deletable`);
  }

  const idx = collection.findIndex(
    (item) => (item as Record<string, unknown>).id === id
  );
  if (idx !== -1) {
    collection.splice(idx, 1);
    setDb(db);
  }
}

/** Force-reset localStorage to the current seed (useful during dev) */
export function resetDb() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DB_KEY, JSON.stringify(clone(seedDb)));
}
