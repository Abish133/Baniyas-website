import 'server-only';
import {
  trustedClientsRepo,
  homeStatsRepo,
  homeProjectsRepo,
  portfolioProjectsRepo,
  clientsRepo,
  jobsRepo,
} from '@/lib/repositories';
import {
  trustedClientSchema,
  homeStatSchema,
  homeProjectSchema,
  portfolioProjectSchema,
  clientSchema,
  jobSchema,
  LIMITS,
} from '@/lib/validation/schemas';
import { IMAGE_RULES } from '@/lib/validation/image-rules';

// Server-side configuration of each simple CRUD section.
export const SECTION_CONFIG = {
  trustedClients: {
    repo: trustedClientsRepo,
    schema: trustedClientSchema,
    fields: ['name', 'isActive', 'sortOrder'],
    images: [{ field: 'logo', rules: IMAGE_RULES.trustedClientLogo, folder: 'trusted-clients', required: true }],
    activeLimit: { max: LIMITS.trustedClientsActive, label: 'trusted client logos' },
    listPath: '/admin/trusted-clients',
  },
  homeStats: {
    repo: homeStatsRepo,
    schema: homeStatSchema,
    fields: ['label', 'value', 'suffix', 'isActive', 'sortOrder'],
    activeLimit: { max: LIMITS.homeStatsActive, label: 'counters' },
    listPath: '/admin/stats',
  },
  homeProjects: {
    repo: homeProjectsRepo,
    schema: homeProjectSchema,
    fields: ['title', 'location', 'isActive', 'sortOrder'],
    images: [{ field: 'image', rules: IMAGE_RULES.homeProject, folder: 'home-projects', required: true }],
    activeLimit: { max: LIMITS.homeProjectsActive, label: 'showcase projects' },
    listPath: '/admin/home-projects',
  },
  portfolioProjects: {
    repo: portfolioProjectsRepo,
    schema: portfolioProjectSchema,
    fields: ['caption', 'isActive', 'sortOrder'],
    images: [{ field: 'image', rules: IMAGE_RULES.portfolioProject, folder: 'portfolio', required: true }],
    listPath: '/admin/portfolio',
  },
  clients: {
    repo: clientsRepo,
    schema: clientSchema,
    fields: ['name', 'isActive', 'sortOrder'],
    listPath: '/admin/clients',
  },
  jobs: {
    repo: jobsRepo,
    schema: jobSchema,
    fields: ['title', 'jobType', 'location', 'experience', 'requirements', 'applyLink', 'isActive', 'sortOrder'],
    listPath: '/admin/jobs',
  },
};
