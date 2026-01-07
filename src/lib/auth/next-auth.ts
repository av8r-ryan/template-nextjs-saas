/**
 * NextAuth.js Authentication Provider (v4)
 * Used when AUTH_PROVIDER=nextauth
 */

import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "../config";
import type { AuthProvider, AuthResult, AuthSession, AuthUser } from "./types";

// NextAuth.js configuration
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Implement your own authentication logic here
        // This is a placeholder - replace with actual database lookup
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Example: Verify against your database
        // const user = await db.users.findByEmail(credentials.email);
        // if (!user || !await verifyPassword(credentials.password, user.passwordHash)) {
        //   return null;
        // }
        // return { id: user.id, email: user.email, name: user.name };

        // Placeholder for development
        return {
          id: "1",
          email: credentials.email,
          name: "Test User",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Get NextAuth session on server
 */
export async function getNextAuthSession() {
  return getServerSession(authOptions);
}

/**
 * Server-side auth provider
 */
export async function getServerAuth(): Promise<AuthProvider> {
  return {
    async getSession(): Promise<AuthSession | null> {
      const session = await getNextAuthSession();
      if (!session?.user) return null;
      const user = session.user as { id?: string; email?: string; name?: string | null; image?: string | null };
      return {
        user: {
          id: user.id ?? "",
          email: user.email ?? "",
          name: user.name ?? null,
          image: user.image ?? null,
        },
        expires: session.expires,
      };
    },

    async getUser(): Promise<AuthUser | null> {
      const session = await getNextAuthSession();
      if (!session?.user) return null;
      const user = session.user as { id?: string; email?: string; name?: string | null; image?: string | null };
      return {
        id: user.id ?? "",
        email: user.email ?? "",
        name: user.name ?? null,
        image: user.image ?? null,
      };
    },

    async signIn(_email: string, _password: string): Promise<AuthResult> {
      // NextAuth handles this via form submission to /api/auth/signin
      // This method is for programmatic sign-in if needed
      return {
        user: null,
        session: null,
        error: new Error("Use NextAuth form submission for sign-in"),
      };
    },

    async signUp(_email: string, _password: string): Promise<AuthResult> {
      // Implement your own sign-up logic
      return {
        user: null,
        session: null,
        error: new Error("Implement sign-up in your application"),
      };
    },

    async signOut(): Promise<{ error: Error | null }> {
      // NextAuth signOut is client-side
      return { error: new Error("Use NextAuth signOut on client-side") };
    },

    async resetPassword(_email: string): Promise<{ error: Error | null }> {
      // Implement your own password reset logic
      return { error: new Error("Implement password reset in your application") };
    },
  };
}

export const auth = {
  server: getServerAuth,
  options: authOptions,
  // Client-side auth is handled via NextAuth's useSession hook
};
