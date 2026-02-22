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
