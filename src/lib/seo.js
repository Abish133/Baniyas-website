import 'server-only';
import { SITE_NAME } from '@/lib/constants/site';
import { getSiteSettings, getSiteContact } from '@/lib/content';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:7111').replace(/\/+$/, '');

const PATHS = { home: '/', about: '/about', services: '/services', portfolio: '/portfolio', careers: '/careers', contact: '/contact' };

/** Metadata for a public page from the "SEO & sharing" settings. */
export async function pageMetadata(page) {
  const s = await getSiteSettings();
  const title = s[`seo.${page}_title`];
  const description = s[`seo.${page}_description`];
  const path = PATHS[page];
  return {
    // The home page title is used as-is; other pages get " - SITE NAME" from the layout template.
    title: page === 'home' ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: page === 'home' ? title : `${title} - ${SITE_NAME}`,
      description,
      url: path,
      images: [{ url: s['seo.share_image'] }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [s['seo.share_image']] },
  };
}

/** schema.org data so Google can show the business name, address and phone. */
export async function businessJsonLd() {
  const [s, contact] = await Promise.all([getSiteSettings(), getSiteContact()]);
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: 'Bani Yas Building Contracting LLC',
    alternateName: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/img/browser_icon_baniyas.png`,
    image: new URL(s['seo.share_image'], SITE_URL).href,
    description: s['seo.home_description'],
    telephone: contact.telephone.label,
    email: contact.email.label,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.addressLines.map((line) => line.replace(/,\s*$/, '')).join(', '),
      // The city is part of the admin-edited address (Contact Details), so it is not repeated here.
      addressCountry: 'AE',
    },
    hasMap: contact.mapUrl,
    sameAs: contact.socialLinks.map((link) => link.href),
  };
}
