import 'server-only';

// Simple in-memory limiters (per process; they reset on restart).
// For multi-instance deployments swap this for a shared store (e.g. Redis).

const stores = globalThis.__baniyasRateLimits ?? new Map();
globalThis.__baniyasRateLimits = stores;

const PRUNE_EVERY = 500;

/**
 * Fixed-window counter: `max` hits per `windowMs` for each key.
 * Expired keys are pruned regularly so the map cannot grow without bound.
 */
export function createLimiter(name, { windowMs, max }) {
  if (!stores.has(name)) stores.set(name, { entries: new Map(), ops: 0 });
  const store = stores.get(name);

  const fresh = (entry, now) => entry && now - entry.first <= windowMs;

  function prune(now) {
    store.ops += 1;
    if (store.ops % PRUNE_EVERY !== 0) return;
    for (const [key, entry] of store.entries) {
      if (!fresh(entry, now)) store.entries.delete(key);
    }
  }

  return {
    /** True when `key` already used up its allowance. */
    isLimited(key) {
      const entry = store.entries.get(key);
      return fresh(entry, Date.now()) && entry.count >= max;
    },
    /** Counts one hit for `key`. */
    hit(key) {
      const now = Date.now();
      prune(now);
      const entry = store.entries.get(key);
      if (fresh(entry, now)) entry.count += 1;
      else store.entries.set(key, { count: 1, first: now });
    },
    reset(key) {
      store.entries.delete(key);
    },
  };
}

/**
 * Best-effort client IP. Behind a reverse proxy (nginx, Plesk, cPanel, Vercel…) the proxy
 * appends the real address as the LAST x-forwarded-for entry; earlier entries can be forged
 * by the client, so they are ignored.
 */
export function clientIp(headers) {
  const forwarded = (headers.get('x-forwarded-for') || '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);
  return forwarded.at(-1) || headers.get('x-real-ip')?.trim() || 'unknown';
}

// Login: 5 failures per IP+email, and 20 per email from anywhere (stops attackers
// who rotate or forge their IP address), both within 15 minutes.
const LOGIN_WINDOW = 15 * 60 * 1000;
const loginByIp = createLimiter('login-ip-email', { windowMs: LOGIN_WINDOW, max: 5 });
const loginByEmail = createLimiter('login-email', { windowMs: LOGIN_WINDOW, max: 20 });

export function isLoginLimited(ip, email) {
  return loginByIp.isLimited(`${ip}:${email}`) || loginByEmail.isLimited(email);
}

export function registerFailedLogin(ip, email) {
  loginByIp.hit(`${ip}:${email}`);
  loginByEmail.hit(email);
}

export function clearFailedLogins(ip, email) {
  loginByIp.reset(`${ip}:${email}`);
  loginByEmail.reset(email);
}
