'use server';

import { SECTION_CONFIG } from '@/lib/admin/sections';
import { saveEntity, deleteEntity, toggleEntity } from '@/lib/admin/crud';

const config = SECTION_CONFIG.homeProjects;

export async function saveHomeProject(_prevState, formData) {
  return saveEntity(config, formData);
}

export async function deleteHomeProject(formData) {
  return deleteEntity(config, formData);
}

export async function toggleHomeProject(formData) {
  return toggleEntity(config, formData);
}
