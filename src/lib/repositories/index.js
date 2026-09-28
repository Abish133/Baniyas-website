import 'server-only';
import { createCrudRepository } from './crud';

export const trustedClientsRepo = createCrudRepository({
  table: 'trusted_clients',
  fields: { name: 'name', logo: 'logo' },
});

export const homeStatsRepo = createCrudRepository({
  table: 'home_stats',
  fields: { label: 'label', value: 'value', suffix: 'suffix' },
});

export const homeProjectsRepo = createCrudRepository({
  table: 'home_projects',
  fields: { title: 'title', location: 'location', image: 'image' },
});

export const portfolioProjectsRepo = createCrudRepository({
  table: 'portfolio_projects',
  fields: { caption: 'caption', image: 'image' },
});

export const clientsRepo = createCrudRepository({
  table: 'clients',
  fields: { name: 'name' },
});

export const jobsRepo = createCrudRepository({
  table: 'job_openings',
  fields: {
    title: 'title',
    jobType: 'job_type',
    location: 'location',
    experience: 'experience',
    requirements: 'requirements',
    applyLink: 'apply_link',
  },
});

export * as servicesRepo from './services';
export * as settingsRepo from './settings';
export * as messagesRepo from './messages';
export * as adminUsersRepo from './adminUsers';
export * as activityRepo from './activity';
