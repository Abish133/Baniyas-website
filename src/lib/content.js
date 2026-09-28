import 'server-only';
import { cache } from 'react';
import { SOCIAL_NETWORKS } from '@/lib/constants/site';
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

const phoneHref = (number) => `tel:${number.replace(/[^+\d]/g, '')}`;

/** Company contact details shown in the footer, sidebar drawer and contact page. */
/** All site settings (page text, images, contact details), with defaults. */
export const getSiteSettings = cache(() => settingsRepo.getSettings());

export const getSiteContact = cache(async () => {
  const settings = await getSiteSettings();
  const mobile = settings['contact.mobile'];
  const email = settings['contact.email'];
  const whatsapp = settings['contact.whatsapp'];
  return {
    whatsapp: whatsapp ? { label: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` } : null,
    telephone: { label: settings['contact.telephone'], href: phoneHref(settings['contact.telephone']) },
    mobile: mobile ? { label: mobile, href: phoneHref(mobile) } : null,
    email: { label: email, href: `mailto:${email}` },
    addressLines: settings['contact.address'].split('\n').map((line) => line.trim()).filter(Boolean),
    mapUrl: settings['contact.map_url'],
    mapEmbedUrl: settings['contact.map_embed_url'],
    socialLinks: SOCIAL_NETWORKS.filter((network) => settings[network.key]).map((network) => ({
      href: settings[network.key],
      icon: network.icon,
      label: network.label,
    })),
  };
});
