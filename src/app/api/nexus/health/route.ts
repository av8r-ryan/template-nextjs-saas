/**
 * Nexus Health Check Endpoint
 * Returns the health status of this product for Nexus monitoring
 */

import { NextResponse } from "next/server";
import { env } from "@/lib/config";

export const dynamic = "force-dynamic";

interface HealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  product: string;
  checks: {
    database: "ok" | "error" | "not_configured";
    auth: "ok" | "error" | "not_configured";
    email: "ok" | "error" | "not_configured";
  };
  uptime: number;
}

const startTime = Date.now();

async function checkDatabase(): Promise<"ok" | "error" | "not_configured"> {
  try {
    if (env.DATABASE_PROVIDER === "supabase") {
      if (!env.NEXT_PUBLIC_SUPABASE_URL) return "not_configured";
      // Simple connectivity check
      const response = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        method: "HEAD",
        headers: {
          apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
        },
      });
      return response.ok ? "ok" : "error";
    }

    if (env.DATABASE_PROVIDER === "neon") {
      if (!env.DATABASE_URL) return "not_configured";
      // Neon check would require actual query
      return "ok";
    }

    return "not_configured";
  } catch {
    return "error";
  }
}

async function checkAuth(): Promise<"ok" | "error" | "not_configured"> {
  try {
    if (env.AUTH_PROVIDER === "supabase") {
      return env.NEXT_PUBLIC_SUPABASE_URL ? "ok" : "not_configured";
    }
    if (env.AUTH_PROVIDER === "nextauth") {
      return env.NEXTAUTH_SECRET ? "ok" : "not_configured";
    }
    return "not_configured";
  } catch {
    return "error";
  }
}

async function checkEmail(): Promise<"ok" | "error" | "not_configured"> {
  try {
    if (!env.AWS_ACCESS_KEY_ID || !env.SES_FROM_EMAIL) {
      return "not_configured";
    }
    return "ok";
  } catch {
    return "error";
  }
}

export async function GET() {
  const [database, auth, email] = await Promise.all([
    checkDatabase(),
    checkAuth(),
    checkEmail(),
  ]);

  const hasErrors = database === "error" || auth === "error";
  const status: HealthStatus["status"] = hasErrors
    ? "unhealthy"
    : database === "not_configured" || auth === "not_configured"
      ? "degraded"
      : "healthy";

  const health: HealthStatus = {
    status,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "0.1.0",
    product: env.NEXUS_PRODUCT_SLUG ?? "unknown",
    checks: {
      database,
      auth,
      email,
    },
    uptime: Math.floor((Date.now() - startTime) / 1000),
  };

  return NextResponse.json(health, {
    status: status === "unhealthy" ? 503 : 200,
  });
}
