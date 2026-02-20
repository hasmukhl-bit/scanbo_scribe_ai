import { NextResponse } from "next/server";

const jsonServerUrl = process.env.JSON_SERVER_URL || "http://localhost:4000";

type BackendUser = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  specialty?: string;
  createdAt?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      fullName?: string;
      specialty?: string;
      email?: string;
      password?: string;
    };

    const fullName = body.fullName?.trim() || "";
    const specialty = body.specialty?.trim() || "";
    const email = body.email?.trim().toLowerCase() || "";
    const password = body.password?.trim() || "";

    if (!fullName || !specialty || !email || !password) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required fields." },
        { status: 400 }
      );
    }

    const existing = await fetch(
      `${jsonServerUrl}/users?email=${encodeURIComponent(email)}`,
      { cache: "no-store" }
    ).then((res) => res.json());

    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { ok: false, message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const username = email.split("@")[0] || `user-${Date.now()}`;
    const payload: BackendUser = {
      username,
      email,
      password,
      name: fullName,
      role: "Clinician",
      specialty,
      createdAt: new Date().toISOString()
    };

    const created = await fetch(`${jsonServerUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then((res) => res.json());

    return NextResponse.json({
      ok: true,
      user: {
        id: created.id,
        username: created.username,
        email: created.email,
        name: created.name,
        role: created.role,
        specialty: created.specialty
      }
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to create account right now. Please try again." },
      { status: 500 }
    );
  }
}
