'use server';

import { SECTION_CONFIG } from '@/lib/admin/sections';
import { saveEntity, deleteEntity, toggleEntity } from '@/lib/admin/crud';

const config = SECTION_CONFIG.portfolioProjects;

export async function savePortfolioProject(_prevState, formData) {
  return saveEntity(config, formData);
}

export async function deletePortfolioProject(formData) {
  return deleteEntity(config, formData);
}

export async function togglePortfolioProject(formData) {
  return toggleEntity(config, formData);
}
