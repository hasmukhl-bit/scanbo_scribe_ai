import { NextResponse } from "next/server";
import seedDb from "@/data/db.json";

const jsonServerUrl = process.env.JSON_SERVER_URL || "http://localhost:4000";

type BackendUser = {
  id: number;
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  specialty?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const localUsers = (seedDb.users ?? []) as BackendUser[];
    let user: BackendUser | undefined;

    try {
      const query = encodeURIComponent(email);
      const byEmail = await fetch(`${jsonServerUrl}/users?email=${query}`, { cache: "no-store" }).then(
        (res) => res.json()
      );
      const emailMatches = Array.isArray(byEmail) ? (byEmail as BackendUser[]) : [];
      user = emailMatches[0];
    } catch {
      // Fallback to bundled users when JSON server is unavailable.
    }

    if (!user) {
      user = localUsers.find((candidate) => candidate.email?.toLowerCase() === email);
    }

    if (!user || user.password !== password) {
      return NextResponse.json(
        { ok: false, message: "Invalid credentials. Please try again." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        username: user.email || "",
        email: user.email || "",
        name: user.name || "",
        role: user.role || "Clinician",
        specialty: user.specialty || ""
      }
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to sign in right now. Please try again." },
      { status: 500 }
    );
  }
}
