import 'server-only';
import { cache } from 'react';
import {
  trustedClientsRepo,
  homeStatsRepo,
  homeProjectsRepo,
  portfolioProjectsRepo,
  clientsRepo,
  jobsRepo,
  servicesRepo,
  settingsRepo,
} from '@/lib/repositories';

// Read models for the public pages (memoised per request).

export const getHomeContent = cache(async () => {
  const [settings, trustedClients, stats, services, projects] = await Promise.all([
    settingsRepo.getSettings(),
    trustedClientsRepo.listActive(),
    homeStatsRepo.listActive(),
    servicesRepo.listForHome(),
    homeProjectsRepo.listActive(),
  ]);
  return { settings, trustedClients, stats, services, projects };
});

export const getAboutContent = cache(async () => {
  const [settings, clients] = await Promise.all([settingsRepo.getSettings(), clientsRepo.listActive()]);
  return { settings, clients };
});

export const getServicesPageContent = cache(() => servicesRepo.listForPage());
export const getPortfolioProjects = cache(() => portfolioProjectsRepo.listActive());
export const getJobOpenings = cache(() => jobsRepo.listActive());
