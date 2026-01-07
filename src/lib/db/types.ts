/**
 * Database Types
 * Shared types for database operations across providers
 */

export interface User {
  id: string;
  email: string;
  name?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Session {
  user: User;
  expires: string;
}

export interface DatabaseClient {
  // Query methods - implement as needed per provider
  from: <T extends keyof Tables>(
    table: T
  ) => {
    select: (
      columns?: string
    ) => Promise<{ data: Tables[T][] | null; error: Error | null }>;
    insert: (
      data: Partial<Tables[T]>
    ) => Promise<{ data: Tables[T] | null; error: Error | null }>;
    update: (data: Partial<Tables[T]>) => {
      eq: (
        column: string,
        value: unknown
      ) => Promise<{ data: Tables[T] | null; error: Error | null }>;
    };
    delete: () => {
      eq: (column: string, value: unknown) => Promise<{ error: Error | null }>;
    };
  };
}

// Define your tables here
export interface Tables {
  users: User;
  // Add more tables as needed
}
