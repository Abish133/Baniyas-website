'use server';

import { requireAdmin } from '@/lib/auth/session';
import { settingsRepo } from '@/lib/repositories';
import { CONTENT_PAGES } from '@/lib/content-config';
import { contentPageSchema, contentFileFields } from '@/lib/admin/content-schema';
import { fieldErrors } from '@/lib/validation/fields';
import { IMAGE_RULES, VIDEO_RULES } from '@/lib/validation/image-rules';
import { inspectImageFields, saveImage, deleteImage } from '@/lib/uploads';
import { formValues, failure, refreshSite } from '@/lib/admin/crud';
import { logActivity } from '@/lib/admin/activity';

/** Saves one "Page content" screen. Bound to the page key in the admin page. */
export async function saveContentPage(pageKey, _prevState, formData) {
  await requireAdmin();
  const page = CONTENT_PAGES[pageKey];
  if (!page) return failure({}, {}, 'Unknown page.');

  const schema = contentPageSchema(pageKey);
  const values = formValues(formData, Object.keys(schema.shape));
  const parsed = schema.safeParse(values);
  const errors = parsed.success ? {} : fieldErrors(parsed.error);

  const fileSpecs = contentFileFields(pageKey).map((field) => ({
    field: field.key,
    rules: field.type === 'video' ? VIDEO_RULES[field.rules] : IMAGE_RULES[field.rules],
    video: field.type === 'video',
    required: false,
  }));
  const { errors: fileErrors, images } = await inspectImageFields(formData, fileSpecs);
  Object.assign(errors, fileErrors);
  if (Object.keys(errors).length) return failure(errors, values);

  const current = await settingsRepo.getSettings();
  const data = { ...parsed.data };
  for (const spec of fileSpecs) {
    if (images[spec.field]) data[spec.field] = await saveImage(images[spec.field], 'content');
  }
  await settingsRepo.saveSettings(data);
  // Remove replaced uploads only after the new values were stored.
  for (const spec of fileSpecs) {
    if (data[spec.field] && current[spec.field] !== data[spec.field]) await deleteImage(current[spec.field]);
  }

  await logActivity('updated', page.title);
  refreshSite();
  return { ok: true, message: `${page.title} saved. The website is updated.`, values: data };
}
