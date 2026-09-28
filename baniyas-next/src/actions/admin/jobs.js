'use server';

import { SECTION_CONFIG } from '@/lib/admin/sections';
import { saveEntity, deleteEntity, toggleEntity } from '@/lib/admin/crud';

const config = SECTION_CONFIG.jobs;

export async function saveJob(_prevState, formData) {
  return saveEntity(config, formData);
}

export async function deleteJob(formData) {
  return deleteEntity(config, formData);
}

export async function toggleJob(formData) {
  return toggleEntity(config, formData);
}
