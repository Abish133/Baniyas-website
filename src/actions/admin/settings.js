'use server';

import { requireAdmin } from '@/lib/auth/session';
import { settingsRepo } from '@/lib/repositories';
import { settingsSchema } from '@/lib/validation/schemas';
import { fieldErrors } from '@/lib/validation/fields';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { inspectImageFields, saveImage, deleteImage } from '@/lib/uploads';
import { formValues, failure, refreshSite } from '@/lib/admin/crud';

const KEYS = Object.keys(settingsSchema.shape);
const IMAGE_KEY = 'home.services_image';

export async function saveSettings(_prevState, formData) {
  await requireAdmin();
  const values = formValues(formData, KEYS);
  const parsed = settingsSchema.safeParse(values);
  const errors = parsed.success ? {} : fieldErrors(parsed.error);
  const { errors: imageErrors, images } = await inspectImageFields(formData, [
    { field: IMAGE_KEY, rules: IMAGE_RULES.servicesSection, required: false },
  ]);
  Object.assign(errors, imageErrors);
  if (Object.keys(errors).length) return failure(errors, values);

  const current = await settingsRepo.getSettings();
  const data = { ...parsed.data };
  if (images[IMAGE_KEY]) data[IMAGE_KEY] = await saveImage(images[IMAGE_KEY], 'settings');
  await settingsRepo.saveSettings(data);
  if (data[IMAGE_KEY] && current[IMAGE_KEY] !== data[IMAGE_KEY]) await deleteImage(current[IMAGE_KEY]);

  refreshSite();
  return { ok: true, message: 'Section content saved.', values: data };
}
