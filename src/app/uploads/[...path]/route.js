import fs from 'node:fs/promises';
import path from 'node:path';
import { uploadRoot } from '@/lib/uploads';

const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

// Serves admin-uploaded images from UPLOAD_DIR (files added after `next build`
// are not served from /public, so uploads live outside it).
export async function GET(_request, { params }) {
  const { path: segments } = await params;
  const root = uploadRoot();
  const target = path.resolve(/*turbopackIgnore: true*/ root, ...segments);
  const ext = path.extname(target).slice(1).toLowerCase();

  if (!target.startsWith(root + path.sep) || !MIME[ext]) {
    return new Response('Not found', { status: 404 });
  }
  try {
    const file = await fs.readFile(target);
    return new Response(file, {
      headers: {
        'Content-Type': MIME[ext],
        'Content-Length': String(file.length),
        // File names are unique per upload, so they can be cached forever.
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
