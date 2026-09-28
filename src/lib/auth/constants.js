// Shared by proxy.js (edge-safe) and server code.
export const SESSION_COOKIE = 'baniyas_admin_session';
export const LOGIN_PATH = '/admin/login';
export const ADMIN_HOME = '/admin';

export function getSecretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_SECRET must be set and at least 32 characters long.');
  }
  return new TextEncoder().encode(secret);
}
