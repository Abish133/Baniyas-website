import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, LOGIN_PATH } from './constants';
import { signSession, verifySession } from './jwt';
import { findAdminById } from '@/lib/repositories/adminUsers';

function sessionHours() {
  const hours = Number(process.env.AUTH_SESSION_HOURS || 12);
  return Number.isFinite(hours) && hours > 0 ? hours : 12;
}

export async function createSession(user) {
  const expiresAt = new Date(Date.now() + sessionHours() * 60 * 60 * 1000);
  const token = await signSession({ sub: String(user.id), email: user.email }, expiresAt);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** Current admin (verified against the database) or null. Memoised per request. */
export const getCurrentAdmin = cache(async () => {
  const cookieStore = await cookies();
  const payload = await verifySession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!payload?.sub) return null;
  return findAdminById(Number(payload.sub));
});

/** Use in every admin page / Server Action. Redirects to the login page when not authenticated. */
export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect(LOGIN_PATH);
  return admin;
}
