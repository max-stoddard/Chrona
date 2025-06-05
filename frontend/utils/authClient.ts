import supabase from "./supabase";

/**
 * A tiny auth helper that mimics Supabase’s API surface:
 *   - signInWithPassword({ email, password })   -> { data: { user }, error }
 *   - signOut()                                 -> void
 *   - getUser()                                 -> { data: { user|null }, error }
 *
 * The JWT and user are cached in localStorage so the rest of the app stays stateless.
 */
export interface AuthUser {
  id: string;
  email: string;
}

const TOKEN_KEY = 'token';
const USER_KEY  = 'user';

function saveSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function signInWithPassword({
  email, /* 'test@test.com' */
  password, /* 'testuser' */
}: {
  email: string;
  password: string;
}) {
  // Always start fresh
  await supabase.auth.signOut();
  clearSession();

  const {
    data: { session, user },
    error,
  } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !user || !session) {
    return { data: { user: null }, error: error ?? new Error('Login failed') };
  }

  saveSession(session.access_token, { id: user.id, email: user.email! });
  return { data: { user: { id: user.id, email: user.email! } }, error: null };
}

export async function signOut() {
  await supabase.auth.signOut();
  clearSession();
  console.log('[Auth] Signed-out');
}

export function getUser() {
  const str = localStorage.getItem(USER_KEY);
  return {
    data : { user: str ? (JSON.parse(str) as AuthUser) : null },
    error: null,
  };
}

/** Let apiClient.ts get the bearer token without a circular import */
export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
