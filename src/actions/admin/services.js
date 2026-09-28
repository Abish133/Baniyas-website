'use server';

import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/session';
import { servicesRepo } from '@/lib/repositories';
import { serviceSchema } from '@/lib/validation/schemas';
import { fieldErrors } from '@/lib/validation/fields';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { inspectImageFields, saveImage, deleteImage } from '@/lib/uploads';
import { formValues, parseId, failure, refreshSite } from '@/lib/admin/crud';
import { logActivity } from '@/lib/admin/activity';

const LIST_PATH = '/bys-panel-d10224a364/services';
const FIELDS = [
  'cardTitle', 'title', 'slug', 'icon', 'showOnHome', 'showOnPage', 'isActive', 'sortOrder',
  'description1', 'description2', 'subtitle', 'mainContent', 'finalDescription', 'benefits', 'faqs',
];
const IMAGE_FIELDS = [
  { field: 'image', rules: IMAGE_RULES.serviceMain },
  { field: 'detailImage1', rules: IMAGE_RULES.serviceDetail },
  { field: 'detailImage2', rules: IMAGE_RULES.serviceDetail },
];

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export async function saveService(_prevState, formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const existing = id ? await servicesRepo.findById(id) : null;
  if (id && !existing) return failure({}, {}, 'This service no longer exists.');

  const values = formValues(formData, FIELDS);
  const parsed = serviceSchema.safeParse(values);
  const errors = parsed.success ? {} : fieldErrors(parsed.error);

  // The main image is required whenever the service is shown on the services page.
  const showOnPage = values.showOnPage === 'on';
  const specs = IMAGE_FIELDS.map((spec) => ({
    ...spec,
    required: spec.field === 'image' && showOnPage && !existing?.image,
  }));
  const { errors: imageErrors, images } = await inspectImageFields(formData, specs);
  Object.assign(errors, imageErrors);

  let slug;
  if (parsed.success) {
    slug = parsed.data.slug || slugify(parsed.data.title);
    if (!slug) errors.slug = 'Could not create a slug from the title — please enter one.';
    else if (await servicesRepo.slugExists(slug, id || 0)) errors.slug = `Another service already uses the slug "${slug}".`;
  }

  if (Object.keys(errors).length) return failure(errors, values);

  const data = { ...parsed.data, slug };
  for (const spec of specs) {
    if (images[spec.field]) data[spec.field] = await saveImage(images[spec.field], 'services');
  }
  // Optional detail images can be removed with the "remove" checkbox.
  for (const field of ['detailImage1', 'detailImage2']) {
    if (!images[field] && formData.get(`remove_${field}`) === 'on') data[field] = null;
  }

  if (existing) {
    await servicesRepo.update(id, data);
    for (const spec of specs) {
      if (data[spec.field] !== undefined && existing[spec.field] !== data[spec.field]) await deleteImage(existing[spec.field]);
    }
  } else {
    await servicesRepo.create(data);
  }
  await logActivity(existing ? 'updated' : 'created', 'Services', data.title);
  refreshSite();
  redirect(`${LIST_PATH}?status=${existing ? 'updated' : 'created'}`);
}

export async function deleteService(formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const existing = id ? await servicesRepo.findById(id) : null;
  if (existing) {
    await servicesRepo.remove(id);
    for (const { field } of IMAGE_FIELDS) await deleteImage(existing[field]);
    await logActivity('deleted', 'Services', existing.title);
    refreshSite();
  }
  redirect(`${LIST_PATH}?status=deleted`);
}

export async function toggleService(formData) {
  await requireAdmin();
  const id = parseId(formData.get('id'));
  const existing = id ? await servicesRepo.findById(id) : null;
  if (!existing) redirect(LIST_PATH);
  if (!existing.isActive && existing.showOnPage && !existing.image) {
    redirect(`${LIST_PATH}?status=incomplete`);
  }
  await servicesRepo.updateFlags(id, { isActive: !existing.isActive });
  await logActivity(existing.isActive ? 'hidden' : 'shown', 'Services', existing.title);
  refreshSite();
  redirect(`${LIST_PATH}?status=${existing.isActive ? 'deactivated' : 'activated'}`);
}
