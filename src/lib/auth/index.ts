/**
 * Authentication Abstraction Layer
 * Exports the appropriate auth provider based on AUTH_PROVIDER env var
 */

import { env, useSupabaseAuth, useNextAuth } from "../config";

// Re-export types
export type { AuthUser, AuthSession, AuthResult, AuthProvider } from "./types";

// Dynamic export based on provider
export async function getAuth() {
  if (useSupabaseAuth()) {
    const { auth } = await import("./supabase-auth");
    return auth;
  }

  if (useNextAuth()) {
    const { auth } = await import("./next-auth");
    return auth;
  }

  throw new Error(`Unknown auth provider: ${env.AUTH_PROVIDER}`);
}

// For static imports when you know the provider at build time
export {
  getServerAuth as getSupabaseServerAuth,
  getClientAuth as getSupabaseClientAuth,
} from "./supabase-auth";
export {
  getServerAuth as getNextAuthServerAuth,
  authOptions as nextAuthOptions,
} from "./next-auth";
