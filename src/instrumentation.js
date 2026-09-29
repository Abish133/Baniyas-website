// Server error reporting (Next.js instrumentation hook).
// Every server error is written to the log. When ERROR_WEBHOOK_URL is set (e.g. a Slack /
// Discord / Google Chat incoming-webhook, or an email service), an alert is also POSTed there:
// at most one per distinct error every 10 minutes, so a broken page cannot flood you.

const THROTTLE_MS = 10 * 60 * 1000;
const lastSent = new Map();

export async function onRequestError(error, request, context) {
  const message = error instanceof Error ? error.message : String(error);
  const digest = typeof error === 'object' && error !== null && 'digest' in error ? String(error.digest) : undefined;
  console.error(`[error] ${request.method} ${request.path} (${context.routeType}): ${message}${digest ? ` [digest ${digest}]` : ''}`);

  const url = process.env.ERROR_WEBHOOK_URL;
  if (!url || process.env.NODE_ENV !== 'production') return;

  const key = `${context.routePath}|${message}`;
  const now = Date.now();
  if (now - (lastSent.get(key) || 0) < THROTTLE_MS) return;
  lastSent.set(key, now);
  if (lastSent.size > 200) lastSent.clear();

  const text = `⚠️ Website error on ${request.method} ${request.path}\n${message}\nRoute: ${context.routePath} (${context.routeType})${digest ? `\nDigest: ${digest}` : ''}`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // "text" works for Slack / Google Chat, "content" for Discord; the rest is for custom receivers.
      body: JSON.stringify({ text, content: text, message, digest, path: request.path, method: request.method, route: context.routePath, routeType: context.routeType, time: new Date().toISOString() }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error('[error] could not send alert:', err.message);
  }
}
