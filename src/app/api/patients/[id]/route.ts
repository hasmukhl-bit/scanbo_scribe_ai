import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { validatePatientPayload } from "@/lib/validation/patient";
import { readDb, writeDb } from "@/server/db";

const unauthorizedResponse = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

const parseId = (id: string) => {
  const value = Number.parseInt(id, 10);
  return Number.isInteger(value) && value > 0 ? value : null;
};

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req: request });
  if (!token) {
    return unauthorizedResponse();
  }

  const patientId = parseId(params.id);
  if (!patientId) {
    return NextResponse.json({ error: "Invalid patient id." }, { status: 400 });
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
  const index = db.patients.findIndex((patient) => patient.id === patientId);
  if (index < 0) {
    return NextResponse.json({ error: "Patient not found." }, { status: 404 });
  }

  db.patients[index] = {
    id: patientId,
    ...validated.data
  };
  await writeDb(db);

  return NextResponse.json(db.patients[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req: request });
  if (!token) {
    return unauthorizedResponse();
  }

  const patientId = parseId(params.id);
  if (!patientId) {
    return NextResponse.json({ error: "Invalid patient id." }, { status: 400 });
  }

  const db = await readDb();
  const index = db.patients.findIndex((patient) => patient.id === patientId);
  if (index < 0) {
    return NextResponse.json({ error: "Patient not found." }, { status: 404 });
  }

  db.patients.splice(index, 1);
  await writeDb(db);

  return NextResponse.json({ success: true });
}
