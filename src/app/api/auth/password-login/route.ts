import { NextResponse } from "next/server";
import seedDb from "@/data/db.json";

const jsonServerUrl = process.env.JSON_SERVER_URL || "http://localhost:4000";

type BackendUser = {
  id: number;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  role?: string;
  specialty?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { identifier?: string; password?: string };
    const identifier = body.identifier?.trim();
    const password = body.password?.trim();

    if (!identifier || !password) {
      return NextResponse.json(
        { ok: false, message: "Email/username and password are required." },
        { status: 400 }
      );
    }

    const localUsers = (seedDb.users ?? []) as BackendUser[];
    let user: BackendUser | undefined;

    try {
      const query = encodeURIComponent(identifier);
      const [byEmail, byUsername] = await Promise.all([
        fetch(`${jsonServerUrl}/users?email=${query}`, { cache: "no-store" }).then((res) => res.json()),
        fetch(`${jsonServerUrl}/users?username=${query}`, { cache: "no-store" }).then((res) => res.json())
      ]);

      const emailMatches = Array.isArray(byEmail) ? (byEmail as BackendUser[]) : [];
      const usernameMatches = Array.isArray(byUsername) ? (byUsername as BackendUser[]) : [];
      user = emailMatches[0] ?? usernameMatches[0];
    } catch {
      // Fallback to bundled users when JSON server is unavailable.
    }

    if (!user) {
      const normalized = identifier.toLowerCase();
      user = localUsers.find((candidate) => {
        const byEmail = candidate.email?.toLowerCase() === normalized;
        const byUsername = candidate.username?.toLowerCase() === normalized;
        return byEmail || byUsername;
      });
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
        username: user.username || user.email || "",
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
