/**
 * Database Abstraction Layer
 * Exports the appropriate database client based on DATABASE_PROVIDER env var
 */

import { env, useSupabaseDatabase, useNeonDatabase } from "../config";

// Re-export types
export type { User, Session } from "./types";

// Dynamic export based on provider
export async function getDatabase() {
  if (useSupabaseDatabase()) {
    const { db } = await import("./supabase");
    return db;
  }

  if (useNeonDatabase()) {
    const { db } = await import("./neon");
    return db;
  }

  throw new Error(`Unknown database provider: ${env.DATABASE_PROVIDER}`);
}

// For static imports when you know the provider at build time
export { getSupabaseBrowserClient, getSupabaseServerClient, getSupabaseAdminClient } from "./supabase";
export { getNeonClient } from "./neon";
