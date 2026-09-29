import { query } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET /api/health — for uptime monitors (e.g. UptimeRobot) and the e2e tests.
 * 200 {"status":"ok","version":"<commit>"} when the app and the database respond, 503 otherwise.
 * The version (the commit the Docker image was built from) lets the deploy pipeline confirm that
 * the new release is live. Nothing else is revealed.
 */
export async function GET() {
  try {
    await query('SELECT 1');
    return Response.json({ status: 'ok', version: process.env.APP_VERSION || 'dev' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[health] database check failed:', error.message);
    return Response.json({ status: 'error' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
