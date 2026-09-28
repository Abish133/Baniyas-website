'use server';

import { SECTION_CONFIG } from '@/lib/admin/sections';
import { saveEntity, deleteEntity, toggleEntity } from '@/lib/admin/crud';

const config = SECTION_CONFIG.homeStats;

export async function saveHomeStat(_prevState, formData) {
  return saveEntity(config, formData);
}

export async function deleteHomeStat(formData) {
  return deleteEntity(config, formData);
}

export async function toggleHomeStat(formData) {
  return toggleEntity(config, formData);
}
