import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation/schemas';
import { fieldErrors } from '@/lib/validation/fields';
import { messagesRepo } from '@/lib/repositories';

// Basic flood protection: max 5 messages per IP per 10 minutes (in-memory).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = globalThis.__baniyasContactHits ?? new Map();
globalThis.__baniyasContactHits = hits;

function tooManyRequests(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
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
  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || null;
  if (tooManyRequests(ip || 'unknown')) {
    return NextResponse.json({ success: false, message: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body ?? {});
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: 'Please correct the highlighted fields.', errors: fieldErrors(parsed.error) },
      { status: 422 }
    );
  }

  try {
    await messagesRepo.createMessage({ ...parsed.data, ipAddress: ip });
  } catch (error) {
    console.error('[contact] could not store message:', error.message);
    return NextResponse.json({ success: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
  }
  await forward(parsed.data);
  return NextResponse.json({ success: true });
}
