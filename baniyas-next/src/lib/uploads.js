import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { imageSize } from 'image-size';
import { checkImage } from '@/lib/validation/image-rules';

// Detected format (from file bytes, not the client-supplied name) -> mime / extension
const FORMATS = {
  jpg: { mime: 'image/jpeg', ext: 'jpg' },
  png: { mime: 'image/png', ext: 'png' },
  webp: { mime: 'image/webp', ext: 'webp' },
};

export const UPLOAD_URL_PREFIX = '/uploads/';

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
  return { image: { buffer, ext: format.ext, width, height } };
}

/** Writes a validated image to disk and returns its public URL (/uploads/<folder>/<file>). */
export async function saveImage(image, folder) {
  const safeFolder = folder.replace(/[^a-z0-9-]/gi, '');
  const dir = path.join(/*turbopackIgnore: true*/ uploadRoot(), safeFolder);
  await fs.mkdir(dir, { recursive: true });
  const name = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${image.ext}`;
  await fs.writeFile(path.join(dir, name), image.buffer);
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

/**
 * Validates several optional/required image fields of a form in one go.
 * @param {FormData} formData
 * @param {Array<{field:string, rules:object, required:boolean}>} specs
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
    const result = await inspectImage(file, spec.rules);
    if (result.error) errors[spec.field] = result.error;
    else images[spec.field] = result.image;
  }
  return { errors, images };
}
