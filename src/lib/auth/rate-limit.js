import 'server-only';

// Simple in-memory limiter for login attempts (per IP + email).
// For multi-instance deployments swap this for a shared store (e.g. Redis).
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = globalThis.__baniyasLoginAttempts ?? new Map();
globalThis.__baniyasLoginAttempts = attempts;

export function isRateLimited(key) {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function registerFailedAttempt(key) {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    attempts.set(key, { count: 1, first: Date.now() });
  } else {
    entry.count += 1;
  }
}

export function clearAttempts(key) {
  attempts.delete(key);
}
