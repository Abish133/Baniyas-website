'use server';

import { SECTION_CONFIG } from '@/lib/admin/sections';
import { saveEntity, deleteEntity, toggleEntity } from '@/lib/admin/crud';

const config = SECTION_CONFIG.trustedClients;

export async function saveTrustedClient(_prevState, formData) {
  return saveEntity(config, formData);
}

export async function deleteTrustedClient(formData) {
  return deleteEntity(config, formData);
}

export async function toggleTrustedClient(formData) {
  return toggleEntity(config, formData);
}
