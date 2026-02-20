import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { readDb, writeDb } from "@/server/db";

export async function GET() {
  const db = await readDb();
  return NextResponse.json(db.guestAttempts);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const createdAt =
    typeof (body as { createdAt?: unknown })?.createdAt === "string"
      ? (body as { createdAt: string }).createdAt
      : new Date().toISOString();

  const db = await readDb();
  const maxId = db.guestAttempts.reduce((max, item) => Math.max(max, item.id), 0);
  const newAttempt = {
    id: maxId + 1,
    createdAt
  };

  db.guestAttempts.push(newAttempt);
  await writeDb(db);

  return NextResponse.json(newAttempt, { status: 201 });
}

export async function DELETE() {
  const db = await readDb();
  db.guestAttempts = [];
  await writeDb(db);
  return NextResponse.json({ success: true });
}
