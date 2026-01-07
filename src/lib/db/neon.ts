/**
 * Neon Database Client with Drizzle ORM
 * Used when DATABASE_PROVIDER=neon
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { env } from "../config";

// Define your schema
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Export schema for migrations
export const schema = {
  users,
  // Add more tables as needed
};

// Create database connection
function createNeonClient() {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for Neon database");
  }

  const sql = neon(env.DATABASE_URL);
  return drizzle(sql, { schema });
}

// Singleton for the database client
let dbInstance: ReturnType<typeof createNeonClient> | null = null;

export function getNeonClient() {
  if (!dbInstance) {
    dbInstance = createNeonClient();
  }
  return dbInstance;
}

// Export typed client
export const db = getNeonClient;
export type NeonDatabase = ReturnType<typeof getNeonClient>;
