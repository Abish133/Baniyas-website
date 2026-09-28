import { SITE_URL } from '@/lib/seo';

/**
 * /robots.txt. The admin panel is deliberately not listed here: robots.txt is public,
 * so naming it would reveal the hidden URL. Admin pages already send "noindex".
 */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
