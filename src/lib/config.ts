/**
 * Centralized Environment Configuration
 * All environment variables are validated and typed here
 */

import { z } from "zod";

const envSchema = z.object({
  // Database Provider
  DATABASE_PROVIDER: z.enum(["supabase", "neon"]).default("supabase"),

  // Auth Provider
  AUTH_PROVIDER: z.enum(["supabase", "nextauth"]).default("supabase"),

  // Supabase (when DATABASE_PROVIDER=supabase or AUTH_PROVIDER=supabase)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // Neon (when DATABASE_PROVIDER=neon)
  DATABASE_URL: z.string().optional(),

  // NextAuth (when AUTH_PROVIDER=nextauth)
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().url().optional(),

  // AWS SES
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().default("us-east-1"),
  SES_FROM_EMAIL: z.string().email().optional(),

  // Nexus Integration
  NEXUS_API_URL: z.string().url().optional(),
  NEXUS_PRODUCT_SLUG: z.string().optional(),

  // Stripe (optional)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),

  // App
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

type Env = z.infer<typeof envSchema>;

function getEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("Invalid environment variables:", parsed.error.flatten());
    // In development, continue with defaults; in production, throw
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables");
    }
  }

  return parsed.data ?? ({} as Env);
}

export const env = getEnv();

// Helper functions
export function isDevelopment() {
  return env.NODE_ENV === "development";
}

export function isProduction() {
  return env.NODE_ENV === "production";
}

export function isTest() {
  return env.NODE_ENV === "test";
}

export function useSupabaseDatabase() {
  return env.DATABASE_PROVIDER === "supabase";
}

export function useNeonDatabase() {
  return env.DATABASE_PROVIDER === "neon";
}

export function useSupabaseAuth() {
  return env.AUTH_PROVIDER === "supabase";
}

export function useNextAuth() {
  return env.AUTH_PROVIDER === "nextauth";
}
