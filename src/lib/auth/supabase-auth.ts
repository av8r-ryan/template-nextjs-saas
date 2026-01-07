/**
 * Supabase Authentication Provider
 * Used when AUTH_PROVIDER=supabase
 */

import {
  getSupabaseServerClient,
  getSupabaseBrowserClient,
} from "../db/supabase";
import type { AuthProvider, AuthResult, AuthSession, AuthUser } from "./types";

function mapSupabaseUser(
  user: {
    id: string;
    email?: string;
    user_metadata?: { name?: string; avatar_url?: string };
  } | null
): AuthUser | null {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.name ?? null,
    image: user.user_metadata?.avatar_url ?? null,
  };
}

/**
 * Server-side auth provider
 */
export async function getServerAuth(): Promise<AuthProvider> {
  const supabase = await getSupabaseServerClient();

  return {
    async getSession(): Promise<AuthSession | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return null;
      const user = mapSupabaseUser(session.user);
      if (!user) return null;
      return {
        user,
        expires: session.expires_at
          ? new Date(session.expires_at * 1000).toISOString()
          : new Date(Date.now() + 3600 * 1000).toISOString(),
      };
    },

    async getUser(): Promise<AuthUser | null> {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return mapSupabaseUser(user);
    },

    async signIn(email: string, password: string): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const user = mapSupabaseUser(data.user);
      return {
        user,
        session:
          data.session && user
            ? {
                user,
                expires: data.session.expires_at
                  ? new Date(data.session.expires_at * 1000).toISOString()
                  : new Date(Date.now() + 3600 * 1000).toISOString(),
              }
            : null,
        error: error ? new Error(error.message) : null,
      };
    },

    async signUp(email: string, password: string): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      const user = mapSupabaseUser(data.user);
      return {
        user,
        session:
          data.session && user
            ? {
                user,
                expires: data.session.expires_at
                  ? new Date(data.session.expires_at * 1000).toISOString()
                  : new Date(Date.now() + 3600 * 1000).toISOString(),
              }
            : null,
        error: error ? new Error(error.message) : null,
      };
    },

    async signOut(): Promise<{ error: Error | null }> {
      const { error } = await supabase.auth.signOut();
      return { error: error ? new Error(error.message) : null };
    },

    async resetPassword(email: string): Promise<{ error: Error | null }> {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error: error ? new Error(error.message) : null };
    },
  };
}

/**
 * Client-side auth provider
 */
export function getClientAuth(): AuthProvider {
  const supabase = getSupabaseBrowserClient();

  return {
    async getSession(): Promise<AuthSession | null> {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return null;
      const user = mapSupabaseUser(session.user);
      if (!user) return null;
      return {
        user,
        expires: session.expires_at
          ? new Date(session.expires_at * 1000).toISOString()
          : new Date(Date.now() + 3600 * 1000).toISOString(),
      };
    },

    async getUser(): Promise<AuthUser | null> {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return mapSupabaseUser(user);
    },

    async signIn(email: string, password: string): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const user = mapSupabaseUser(data.user);
      return {
        user,
        session:
          data.session && user
            ? {
                user,
                expires: data.session.expires_at
                  ? new Date(data.session.expires_at * 1000).toISOString()
                  : new Date(Date.now() + 3600 * 1000).toISOString(),
              }
            : null,
        error: error ? new Error(error.message) : null,
      };
    },

    async signUp(email: string, password: string): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      const user = mapSupabaseUser(data.user);
      return {
        user,
        session:
          data.session && user
            ? {
                user,
                expires: data.session.expires_at
                  ? new Date(data.session.expires_at * 1000).toISOString()
                  : new Date(Date.now() + 3600 * 1000).toISOString(),
              }
            : null,
        error: error ? new Error(error.message) : null,
      };
    },

    async signOut(): Promise<{ error: Error | null }> {
      const { error } = await supabase.auth.signOut();
      return { error: error ? new Error(error.message) : null };
    },

    async resetPassword(email: string): Promise<{ error: Error | null }> {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error: error ? new Error(error.message) : null };
    },
  };
}

export const auth = {
  server: getServerAuth,
  client: getClientAuth,
};
