// Shrinks and recompresses JPG / PNG / WEBP images in place (same file name and format,
// so no links change). A file is only replaced when the result is at least 10% smaller.
// Usage: npm run images:optimize                      (public/assets/img)
//        npm run images:optimize -- storage/uploads   (any other folder)
//        npm run images:optimize -- --dry             (report only, change nothing)
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const ROOT = path.resolve(process.cwd(), args.find((a) => !a.startsWith('--')) || 'public/assets/img');

// Longest side after resizing. Charts/diagrams keep more pixels so small text stays readable.
const MAX_SIDE = 2000;
const MAX_SIDE_DIAGRAM = 3000;
const isDiagram = (file) => /chart|org/i.test(path.basename(file));

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) yield full;
  }
}

async function optimize(file) {
  const input = await fs.readFile(file);
  const image = sharp(input, { failOn: 'none' }).rotate(); // apply EXIF orientation
  const meta = await image.metadata();
  const limit = isDiagram(file) ? MAX_SIDE_DIAGRAM : MAX_SIDE;
  if (Math.max(meta.width, meta.height) > limit) image.resize({ width: limit, height: limit, fit: 'inside', withoutEnlargement: true });

  const ext = path.extname(file).toLowerCase();
  if (ext === '.png') image.png({ compressionLevel: 9, effort: 10, palette: !isDiagram(file) && meta.hasAlpha, quality: 90 });
  else if (ext === '.webp') image.webp({ quality: 80, effort: 6 });
  else image.jpeg({ quality: 80, mozjpeg: true, progressive: true });

  const output = await image.toBuffer();
  const saved = input.length - output.length;
  if (saved < input.length * 0.1) return { file, before: input.length, after: input.length, skipped: true };
  if (!DRY) await fs.writeFile(file, output);
  return { file, before: input.length, after: output.length };
}

const kb = (n) => `${Math.round(n / 1024)} KB`;
let before = 0;
let after = 0;
for await (const file of walk(ROOT)) {
  try {
    const r = await optimize(file);
    before += r.before;
    after += r.after;
    if (!r.skipped) console.log(`${kb(r.before).padStart(8)} → ${kb(r.after).padStart(8)}  ${path.relative(process.cwd(), file)}`);
  } catch (err) {
    console.warn(`! skipped ${file}: ${err.message}`);
  }
}
console.log(`${DRY ? 'Would save' : 'Saved'} ${kb(before - after)} (${kb(before)} → ${kb(after)}).`);
