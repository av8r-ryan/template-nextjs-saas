/**
 * Authentication Types
 * Shared types for auth operations across providers
 */

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}

export interface AuthResult {
  user: AuthUser | null;
  session: AuthSession | null;
  error: Error | null;
}

export interface AuthProvider {
  getSession(): Promise<AuthSession | null>;
  getUser(): Promise<AuthUser | null>;
  signIn(email: string, password: string): Promise<AuthResult>;
  signUp(email: string, password: string): Promise<AuthResult>;
  signOut(): Promise<{ error: Error | null }>;
  resetPassword(email: string): Promise<{ error: Error | null }>;
}
