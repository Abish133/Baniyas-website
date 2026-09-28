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
    label: 'Trusted Clients',
    nameField: 'name',
    repo: trustedClientsRepo,
    schema: trustedClientSchema,
    fields: ['name', 'isActive', 'sortOrder'],
    images: [{ field: 'logo', rules: IMAGE_RULES.trustedClientLogo, folder: 'trusted-clients', required: true }],
    activeLimit: { max: LIMITS.trustedClientsActive, label: 'trusted client logos' },
    listPath: '/bys-panel-d10224a364/trusted-clients',
  },
  homeStats: {
    label: 'Counters',
    nameField: 'label',
    repo: homeStatsRepo,
    schema: homeStatSchema,
    fields: ['label', 'value', 'suffix', 'isActive', 'sortOrder'],
    activeLimit: { max: LIMITS.homeStatsActive, label: 'counters' },
    listPath: '/bys-panel-d10224a364/stats',
  },
  homeProjects: {
    label: 'Project Showcase',
    nameField: 'title',
    repo: homeProjectsRepo,
    schema: homeProjectSchema,
    fields: ['title', 'location', 'isActive', 'sortOrder'],
    images: [{ field: 'image', rules: IMAGE_RULES.homeProject, folder: 'home-projects', required: true }],
    activeLimit: { max: LIMITS.homeProjectsActive, label: 'showcase projects' },
    listPath: '/bys-panel-d10224a364/home-projects',
  },
  portfolioProjects: {
    label: 'Portfolio',
    nameField: 'caption',
    repo: portfolioProjectsRepo,
    schema: portfolioProjectSchema,
    fields: ['caption', 'isActive', 'sortOrder'],
    images: [{ field: 'image', rules: IMAGE_RULES.portfolioProject, folder: 'portfolio', required: true }],
    listPath: '/bys-panel-d10224a364/portfolio',
  },
  clients: {
    label: 'Our Clients',
    nameField: 'name',
    repo: clientsRepo,
    schema: clientSchema,
    fields: ['name', 'isActive', 'sortOrder'],
    listPath: '/bys-panel-d10224a364/clients',
  },
  jobs: {
    label: 'Job Openings',
    nameField: 'title',
    repo: jobsRepo,
    schema: jobSchema,
    fields: ['title', 'jobType', 'location', 'experience', 'requirements', 'applyLink', 'isActive', 'sortOrder'],
    listPath: '/bys-panel-d10224a364/jobs',
  },
};
