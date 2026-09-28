import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/schemas';
import { fieldErrors } from '@/lib/validation/fields';
import { messagesRepo } from '@/lib/repositories';
import { createLimiter, clientIp } from '@/lib/auth/rate-limit';

// Flood protection (in-memory): 5 messages per IP and 60 in total per 10 minutes.
const WINDOW_MS = 10 * 60 * 1000;
const perIp = createLimiter('contact-ip', { windowMs: WINDOW_MS, max: 5 });
const overall = createLimiter('contact-all', { windowMs: WINDOW_MS, max: 60 });

// Spam traps: a hidden "website" field humans never fill in, and a minimum time
// between showing the form and submitting it.
const MIN_FILL_MS = 3000;

function looksLikeBot(body) {
  if (typeof body?.website === 'string' && body.website.trim() !== '') return true;
  const startedAt = Number(body?.startedAt);
  return !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS;
}

async function forward(data) {
  const url = process.env.CONTACT_FORWARD_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(8000),
    });
  } catch (error) {
    console.error('[contact] forwarding failed:', error.message);
  }
}

export async function POST(request) {
  const ip = clientIp(request.headers);
  if (perIp.isLimited(ip) || overall.isLimited('all')) {
    return NextResponse.json({ success: false, message: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Pretend success so bots don't learn they were caught.
  if (looksLikeBot(body)) return NextResponse.json({ success: true });
  perIp.hit(ip);
  overall.hit('all');

  const parsed = contactSchema.safeParse(body ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Please correct the highlighted fields.', errors: fieldErrors(parsed.error) },
      { status: 422 }
    );
  }

  try {
    await messagesRepo.createMessage({ ...parsed.data, ipAddress: ip === 'unknown' ? null : ip });
  } catch (error) {
    console.error('[contact] could not store message:', error.message);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
  await forward(parsed.data);
  return NextResponse.json({ success: true });
}
