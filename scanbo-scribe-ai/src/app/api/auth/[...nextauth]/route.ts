import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const jsonServerUrl = process.env.JSON_SERVER_URL || "http://localhost:4000";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  pages: {
    signIn: "/login-password"
  },
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;

      try {
        const existing = await fetch(
          `${jsonServerUrl}/users?email=${encodeURIComponent(user.email)}`,
          { cache: "no-store" }
        ).then((res) => res.json());

        if (Array.isArray(existing) && existing.length > 0) {
          const current = existing[0];
          await fetch(`${jsonServerUrl}/users/${current.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...current,
              name: user.name,
              image: user.image,
              lastLoginAt: new Date().toISOString()
            })
          });
        } else {
          await fetch(`${jsonServerUrl}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image,
              createdAt: new Date().toISOString(),
              lastLoginAt: new Date().toISOString()
            })
          });
        }
      } catch {
        // If JSON server is unavailable, allow sign-in to proceed.
      }

      return true;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
