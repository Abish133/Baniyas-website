'use server';

import { SECTION_CONFIG } from '@/lib/admin/sections';
import { saveEntity, deleteEntity, toggleEntity } from '@/lib/admin/crud';

const config = SECTION_CONFIG.clients;

export async function saveClient(_prevState, formData) {
  return saveEntity(config, formData);
}

export async function deleteClient(formData) {
  return deleteEntity(config, formData);
}

export async function toggleClient(formData) {
  return toggleEntity(config, formData);
}
