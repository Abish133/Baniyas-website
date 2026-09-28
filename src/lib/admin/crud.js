import 'server-only';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/session';
import { fieldErrors } from '@/lib/validation/fields';
import { inspectImageFields, saveImage, deleteImage } from '@/lib/uploads';

/** Reads plain (non-file) form fields into an object. */
export function formValues(formData, names) {
  const values = {};
  for (const name of names) {
    const value = formData.get(name);
    values[name] = typeof value === 'string' ? value : undefined;
  }
  return values;
}

export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function failure(errors, values, message = 'Please fix the highlighted fields and try again.') {
  return { ok: false, message, errors, values };
}

/** Clears cached pages so the public site shows the change immediately. */
export function refreshSite() {
  revalidatePath('/', 'layout');
}

/**
 * Generic create/update for the simple list sections.
 *
 * config = {
 *   repo, schema, fields: ['name', ...],
 *   images: [{ field, rules, folder, required }],   // `required` applies when creating
 *   activeLimit: { max, label },                     // optional cap on active rows
 *   listPath: '/bys-panel-d10224a364/...',
 * }
 */
export async function saveEntity(config, formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const existing = id ? await config.repo.findById(id) : null;
  if (id && !existing) return failure({}, {}, 'This record no longer exists.');

  const values = formValues(formData, config.fields);
  const parsed = config.schema.safeParse(values);
  const errors = parsed.success ? {} : fieldErrors(parsed.error);

  const imageSpecs = (config.images || []).map((spec) => ({ ...spec, required: spec.required && !existing }));
  const { errors: imageErrors, images } = await inspectImageFields(formData, imageSpecs);
  Object.assign(errors, imageErrors);

  if (parsed.success && parsed.data.isActive && config.activeLimit) {
    const activeCount = await config.repo.countActive({ excludeId: id || undefined });
    if (activeCount >= config.activeLimit.max) {
      errors.isActive = `Only ${config.activeLimit.max} ${config.activeLimit.label} can be active at the same time (the layout is built for that). Deactivate another one first.`;
    }
  }

  if (Object.keys(errors).length) return failure(errors, values);

  const data = { ...parsed.data };
  for (const spec of imageSpecs) {
    if (images[spec.field]) data[spec.field] = await saveImage(images[spec.field], spec.folder);
  }

  if (existing) {
    await config.repo.update(id, data);
    // Remove replaced uploads only after the database was updated successfully.
    for (const spec of imageSpecs) {
      if (images[spec.field] && existing[spec.field] !== data[spec.field]) await deleteImage(existing[spec.field]);
    }
  } else {
    await config.repo.create(data);
  }

  refreshSite();
  redirect(`${config.listPath}?status=${existing ? 'updated' : 'created'}`);
}

export async function deleteEntity(config, formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const existing = id ? await config.repo.findById(id) : null;
  if (existing) {
    await config.repo.remove(id);
    for (const spec of config.images || []) await deleteImage(existing[spec.field]);
    refreshSite();
  }
  redirect(`${config.listPath}?status=deleted`);
}

export async function toggleEntity(config, formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const existing = id ? await config.repo.findById(id) : null;
  if (!existing) redirect(config.listPath);

  const activate = !existing.isActive;
  if (activate && config.activeLimit) {
    const activeCount = await config.repo.countActive({ excludeId: id });
    if (activeCount >= config.activeLimit.max) redirect(`${config.listPath}?status=limit`);
  }
  await config.repo.update(id, { isActive: activate });
  refreshSite();
  redirect(`${config.listPath}?status=${activate ? 'activated' : 'deactivated'}`);
}
