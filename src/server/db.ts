import { promises as fs } from "node:fs";
import path from "node:path";
import seedDb from "@/data/db.json";
import type { Consultation, Patient, Recording } from "@/lib/types";

export type AppDb = {
  users: Array<{
    id: number;
    username: string;
    password: string;
    name: string;
    role: string;
    email?: string;
    image?: string | null;
    createdAt?: string;
    lastLoginAt?: string;
  }>;
  patients: Patient[];
  consultations: Consultation[];
  guestAttempts: Array<{ id: number; createdAt: string }>;
  recordings: Recording[];
  clinicalInsights: Array<{ id: number; title: string; body: string }>;
};

const DB_PATH = path.join(process.cwd(), "db.json");

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));

const mergeWithSeed = (value: Partial<AppDb>): AppDb => ({
  ...clone(seedDb),
  ...value,
  users: (value.users ?? seedDb.users) as AppDb["users"],
  patients: (value.patients ?? seedDb.patients) as AppDb["patients"],
  consultations: (value.consultations ?? seedDb.consultations) as AppDb["consultations"],
  guestAttempts: (value.guestAttempts ?? seedDb.guestAttempts) as AppDb["guestAttempts"],
  recordings: (value.recordings ?? seedDb.recordings) as AppDb["recordings"],
  clinicalInsights: (value.clinicalInsights ?? seedDb.clinicalInsights) as AppDb["clinicalInsights"]
});

export async function readDb(): Promise<AppDb> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<AppDb>;
    return mergeWithSeed(parsed);
  } catch {
    const seeded = clone(seedDb) as AppDb;
    await writeDb(seeded);
    return seeded;
  }
}

export async function writeDb(db: AppDb): Promise<void> {
  await fs.writeFile(DB_PATH, `${JSON.stringify(db, null, 2)}\n`, "utf8");
}
