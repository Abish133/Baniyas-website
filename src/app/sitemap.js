import { SITE_URL } from '@/lib/seo';
import { getSiteSettings } from '@/lib/content';

// Rebuilt at most once an hour (the legal pages appear once they have text).
export const revalidate = 3600;

/** /sitemap.xml — public pages only (the legal pages when they have text). */
export default async function sitemap() {
  const s = await getSiteSettings();
  const pages = [
    ['/', 1],
    ['/about', 0.8],
    ['/services', 0.9],
    ['/portfolio', 0.8],
    ['/careers', 0.6],
    ['/contact', 0.7],
    ...(s['legal.terms'] ? [['/terms', 0.2]] : []),
    ...(s['legal.privacy'] ? [['/privacy', 0.2]] : []),
  ];
  return pages.map(([path, priority]) => ({ url: `${SITE_URL}${path}`, changeFrequency: 'weekly', priority }));
}
