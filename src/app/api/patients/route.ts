import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import type { Patient } from "@/lib/types";
import { validatePatientPayload } from "@/lib/validation/patient";
import { readDb, writeDb } from "@/server/db";

const unauthorizedResponse = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return unauthorizedResponse();
  }

  const db = await readDb();
  return NextResponse.json(db.patients);
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return unauthorizedResponse();
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validatePatientPayload(rawBody);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const db = await readDb();
  const maxId = db.patients.reduce((max, patient) => Math.max(max, patient.id), 0);
  const createdPatient: Patient = {
    id: maxId + 1,
    ...validated.data
  };

  db.patients.push(createdPatient);
  await writeDb(db);

  return NextResponse.json(createdPatient, { status: 201 });
}
