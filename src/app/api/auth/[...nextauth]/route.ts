import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import seedDb from "@/data/db.json";

const jsonServerUrl = process.env.JSON_SERVER_URL || "http://localhost:4000";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      name: "Username and Password",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim();
        const password = credentials?.password;

        if (!username || !password) {
          return null;
        }

        try {
          const existing = await fetch(
            `${jsonServerUrl}/users?username=${encodeURIComponent(username)}`,
            { cache: "no-store" }
          ).then((res) => res.json());

          if (Array.isArray(existing) && existing.length > 0) {
            const user = existing[0];
            if (user?.password === password) {
              return {
                id: String(user.id),
                name: user.name || user.username,
                email: user.email || `${user.username}@scanbo.local`,
                image: user.image || null
              };
            }
          }
        } catch {
          // Fall back to local seed data if JSON server is unavailable.
        }

        const localUser = seedDb.users.find(
          (user) => user.username === username && user.password === password
        );

        if (!localUser) {
          return null;
        }

        return {
          id: String(localUser.id),
          name: localUser.name || localUser.username,
          email: `${localUser.username}@scanbo.local`,
          image: null
        };
      }
    })
  ],
  pages: {
    signIn: "/login-password"
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

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
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
