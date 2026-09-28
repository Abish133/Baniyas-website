import fs from 'node:fs/promises';
import path from 'node:path';
import { uploadRoot } from '@/lib/uploads';

const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', mp4: 'video/mp4', webm: 'video/webm' };

const BASE_HEADERS = {
  // File names are unique per upload, so they can be cached forever.
  'Cache-Control': 'public, max-age=31536000, immutable',
  'X-Content-Type-Options': 'nosniff',
  'Accept-Ranges': 'bytes',
};

/** Parses a single "bytes=start-end" range. Returns null when absent/unsupported. */
function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header || '');
  if (!match || (match[1] === '' && match[2] === '')) return null;
  let start;
  let end;
  if (match[1] === '') {
    start = Math.max(0, size - Number(match[2]));
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === '' ? size - 1 : Math.min(Number(match[2]), size - 1);
  }
  return start <= end && start < size ? { start, end } : 'invalid';
}

// Serves admin-uploaded images and videos from UPLOAD_DIR (files added after
// `next build` are not served from /public, so uploads live outside it).
// Supports byte ranges, which browsers (Safari especially) need to play video.
export async function GET(request, { params }) {
  const { path: segments } = await params;
  const root = uploadRoot();
  const target = path.resolve(/*turbopackIgnore: true*/ root, ...segments);
  const ext = path.extname(target).slice(1).toLowerCase();

  if (!target.startsWith(root + path.sep) || !MIME[ext]) {
    return new Response('Not found', { status: 404 });
  }

  let handle;
  try {
    handle = await fs.open(target, 'r');
    const { size } = await handle.stat();
    const range = parseRange(request.headers.get('range'), size);

    if (range === 'invalid') {
      return new Response(null, { status: 416, headers: { ...BASE_HEADERS, 'Content-Range': `bytes */${size}` } });
    }
    if (range) {
      const length = range.end - range.start + 1;
      const buffer = Buffer.alloc(length);
      await handle.read(buffer, 0, length, range.start);
      return new Response(buffer, {
        status: 206,
        headers: {
          ...BASE_HEADERS,
          'Content-Type': MIME[ext],
          'Content-Length': String(length),
          'Content-Range': `bytes ${range.start}-${range.end}/${size}`,
        },
      });
    }

    const file = await handle.readFile();
    return new Response(file, {
      headers: { ...BASE_HEADERS, 'Content-Type': MIME[ext], 'Content-Length': String(size) },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  } finally {
    await handle?.close();
  }
}
