'use server';

import { requireAdmin } from '@/lib/auth/session';
import { settingsRepo } from '@/lib/repositories';
import { contactSettingsSchema } from '@/lib/validation/schemas';
import { fieldErrors } from '@/lib/validation/fields';
import { formValues, failure, refreshSite } from '@/lib/admin/crud';
import { logActivity } from '@/lib/admin/activity';

const KEYS = Object.keys(contactSettingsSchema.shape);

export async function saveContactSettings(_prevState, formData) {
  await requireAdmin();
  const values = formValues(formData, KEYS);
  const parsed = contactSettingsSchema.safeParse(values);
  if (!parsed.success) return failure(fieldErrors(parsed.error), values);

  await settingsRepo.saveSettings(parsed.data);
  await logActivity('updated', 'Contact Details');
  refreshSite();
  return { ok: true, message: 'Contact details saved.', values: parsed.data };
}
