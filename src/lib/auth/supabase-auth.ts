/**
 * Supabase Authentication Provider
 * Used when AUTH_PROVIDER=supabase
 */

import { getSupabaseServerClient, getSupabaseBrowserClient } from "../db/supabase";
import type { AuthProvider, AuthResult, AuthSession, AuthUser } from "./types";

function mapSupabaseUser(user: { id: string; email?: string; user_metadata?: { name?: string; avatar_url?: string } } | null): AuthUser | null {
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      return {
        user: mapSupabaseUser(session.user)!,
        expires: new Date(session.expires_at! * 1000).toISOString(),
      };
    },

    async getUser(): Promise<AuthUser | null> {
      const { data: { user } } = await supabase.auth.getUser();
      return mapSupabaseUser(user);
    },

    async signIn(email: string, password: string): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return {
        user: mapSupabaseUser(data.user),
        session: data.session ? {
          user: mapSupabaseUser(data.user)!,
          expires: new Date(data.session.expires_at! * 1000).toISOString(),
        } : null,
        error: error ? new Error(error.message) : null,
      };
    },

    async signUp(email: string, password: string): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return {
        user: mapSupabaseUser(data.user),
        session: data.session ? {
          user: mapSupabaseUser(data.user)!,
          expires: new Date(data.session.expires_at! * 1000).toISOString(),
        } : null,
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      return {
        user: mapSupabaseUser(session.user)!,
        expires: new Date(session.expires_at! * 1000).toISOString(),
      };
    },

    async getUser(): Promise<AuthUser | null> {
      const { data: { user } } = await supabase.auth.getUser();
      return mapSupabaseUser(user);
    },

    async signIn(email: string, password: string): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return {
        user: mapSupabaseUser(data.user),
        session: data.session ? {
          user: mapSupabaseUser(data.user)!,
          expires: new Date(data.session.expires_at! * 1000).toISOString(),
        } : null,
        error: error ? new Error(error.message) : null,
      };
    },

    async signUp(email: string, password: string): Promise<AuthResult> {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      return {
        user: mapSupabaseUser(data.user),
        session: data.session ? {
          user: mapSupabaseUser(data.user)!,
          expires: new Date(data.session.expires_at! * 1000).toISOString(),
        } : null,
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
