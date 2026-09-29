// Shared by proxy.js (edge-safe) and server code.
import { ADMIN_BASE } from '@/lib/admin-path';
export const SESSION_COOKIE = 'baniyas_admin_session';
export const LOGIN_PATH = `${ADMIN_BASE}/login`;
export const ADMIN_HOME = ADMIN_BASE;

// The old placeholder from the (removed) .env.example is public, so sessions signed with it could be forged.
const EXAMPLE_SECRET = 'replace-with-a-long-random-string-of-at-least-32-characters';
let warned = false;

export function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must be set and at least 32 characters long.');
  }
  if (secret === EXAMPLE_SECRET && process.env.NODE_ENV === 'production' && !warned) {
    warned = true;
    console.warn('!!! SECURITY: AUTH_SECRET is still the old published example value. Generate a new one before going live (see README).');
  }
  return new TextEncoder().encode(secret);
}
