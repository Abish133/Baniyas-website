import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { imageSize } from 'image-size';
import sharp from 'sharp';
import { checkImage } from '@/lib/validation/image-rules';

// Detected format (from file bytes, not the client-supplied name) -> mime / extension
const FORMATS = {
  jpg: { mime: 'image/jpeg', ext: 'jpg' },
  png: { mime: 'image/png', ext: 'png' },
  webp: { mime: 'image/webp', ext: 'webp' },
};

export const UPLOAD_URL_PREFIX = '/uploads/';

// Uploaded photos are scaled down to this longest side (enough for full-width on large screens).
const DEFAULT_MAX_SIDE = 2000;

/**
 * Shrinks and recompresses an uploaded image, keeping its format. Also applies the EXIF
 * rotation and drops metadata (e.g. the GPS location of phone photos).
 * Falls back to the original bytes if processing fails or would make the file bigger.
 */
async function compressImage(image) {
  try {
    const pipeline = sharp(image.buffer, { failOn: 'none' })
      .rotate()
      .resize({ width: image.maxSide, height: image.maxSide, fit: 'inside', withoutEnlargement: true });
    if (image.ext === 'png') pipeline.png({ compressionLevel: 9, effort: 8 });
    else if (image.ext === 'webp') pipeline.webp({ quality: 82, effort: 5 });
    else pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true });
    const output = await pipeline.toBuffer();
    return output.length < image.buffer.length ? output : image.buffer;
  } catch (error) {
    console.error('[uploads] could not compress image, storing original:', error.message);
    return image.buffer;
  }
}

export function uploadRoot() {
  return path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.UPLOAD_DIR || './storage/uploads');
}

/** True when the form actually contains a selected file for this field. */
export function hasFile(file) {
  return file && typeof file === 'object' && typeof file.arrayBuffer === 'function' && file.size > 0;
}

/**
 * Validates an uploaded image against section rules using the real file bytes.
 * Returns { error } or { image: { buffer, ext, width, height } }.
 */
export async function inspectImage(file, rules) {
  if (file.size > rules.maxSizeMB * 1024 * 1024) {
    return { error: `${rules.label} must be ${rules.maxSizeMB} MB or smaller.` };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  let dimensions;
  try {
    dimensions = imageSize(buffer);
  } catch {
    return { error: `${rules.label} is not a valid image file.` };
  }
  const format = FORMATS[dimensions.type];
  if (!format) {
    return { error: `${rules.label} must be a JPG, PNG or WEBP image.` };
  }
  // EXIF orientation 5-8 means the image is displayed rotated by 90°.
  const rotated = dimensions.orientation >= 5 && dimensions.orientation <= 8;
  const width = rotated ? dimensions.height : dimensions.width;
  const height = rotated ? dimensions.width : dimensions.height;

  const error = checkImage({ size: buffer.length, type: format.mime, width, height }, rules);
  if (error) return { error };
  return { image: { buffer, ext: format.ext, width, height, maxSide: rules.outputMaxSide || DEFAULT_MAX_SIDE } };
}

/** Writes a validated image to disk and returns its public URL (/uploads/<folder>/<file>). */
export async function saveImage(image, folder) {
  const safeFolder = folder.replace(/[^a-z0-9-]/gi, '');
  const dir = path.join(/*turbopackIgnore: true*/ uploadRoot(), safeFolder);
  await fs.mkdir(dir, { recursive: true });
  const name = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${image.ext}`;
  // Videos are stored as uploaded; images are resized/compressed first.
  const bytes = image.maxSide ? await compressImage(image) : image.buffer;
  await fs.writeFile(path.join(dir, name), bytes);
  return `${UPLOAD_URL_PREFIX}${safeFolder}/${name}`;
}

/** Deletes a previously uploaded file. Bundled theme images (/assets/...) are never touched. */
export async function deleteImage(publicUrl) {
  if (!publicUrl || !publicUrl.startsWith(UPLOAD_URL_PREFIX)) return;
  const relative = publicUrl.slice(UPLOAD_URL_PREFIX.length);
  const target = path.resolve(/*turbopackIgnore: true*/ uploadRoot(), relative);
  if (!target.startsWith(uploadRoot() + path.sep)) return;
  await fs.unlink(target).catch(() => {});
}

/** Detects MP4 / WEBM from the file bytes (not the client-supplied name or type). */
function detectVideo(buffer) {
  if (buffer.length > 12 && buffer.toString('ascii', 4, 8) === 'ftyp') return { mime: 'video/mp4', ext: 'mp4' };
  if (buffer.length > 4 && buffer.readUInt32BE(0) === 0x1a45dfa3) return { mime: 'video/webm', ext: 'webm' };
  return null;
}

/** Same idea as inspectImage, for the banner video. Returns { error } or { image: { buffer, ext } }. */
export async function inspectVideo(file, rules) {
  if (file.size > rules.maxSizeMB * 1024 * 1024) {
    return { error: `${rules.label} must be ${rules.maxSizeMB} MB or smaller (selected file is ${(file.size / 1024 / 1024).toFixed(1)} MB).` };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const format = detectVideo(buffer);
  if (!format || !rules.types.includes(format.mime)) {
    return { error: `${rules.label} must be an MP4 or WEBM video.` };
  }
  return { image: { buffer, ext: format.ext } };
}

/**
 * Validates several optional/required image fields of a form in one go.
 * @param {FormData} formData
 * @param {Array<{field:string, rules:object, required:boolean, video?:boolean}>} specs
 * @returns {Promise<{errors:object, images:object}>}
 */
export async function inspectImageFields(formData, specs) {
  const errors = {};
  const images = {};
  for (const spec of specs) {
    const file = formData.get(spec.field);
    if (!hasFile(file)) {
      if (spec.required) errors[spec.field] = `${spec.rules.label} is required.`;
      continue;
    }
    const result = spec.video ? await inspectVideo(file, spec.rules) : await inspectImage(file, spec.rules);
    if (result.error) errors[spec.field] = result.error;
    else images[spec.field] = result.image;
  }
  return { errors, images };
}
