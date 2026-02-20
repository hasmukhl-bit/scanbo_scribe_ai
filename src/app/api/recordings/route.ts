import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { readDb, writeDb } from "@/server/db";

const unauthorizedResponse = () =>
  NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return unauthorizedResponse();
  }

  const db = await readDb();
  return NextResponse.json(db.recordings);
}

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return unauthorizedResponse();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const ids = Array.isArray((body as { ids?: unknown[] })?.ids)
    ? (body as { ids: unknown[] }).ids
    : null;

  if (!ids || ids.some((id) => typeof id !== "string" || id.trim().length === 0)) {
    return NextResponse.json({ error: "ids must be a non-empty string array." }, { status: 400 });
  }

  const idSet = new Set(ids as string[]);
  const db = await readDb();
  db.recordings = db.recordings.filter((recording) => !idSet.has(recording.id));
  await writeDb(db);

  return NextResponse.json({ success: true });
}
