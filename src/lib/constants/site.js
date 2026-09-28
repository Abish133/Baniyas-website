// Static company information used across the public layout.

export const SITE_NAME = 'BANI YAS BUILDING CONTG.LLC';

// `highlight`: show the "active" style when on that page. The original site only
// highlighted "About Us"; set it to true on other links to highlight them too.
export const NAV_LINKS = [
  { href: '/', label: 'Home', highlight: false },
  { href: '/about', label: 'About Us', highlight: true },
  { href: '/services', label: 'Services', highlight: false },
  { href: '/portfolio', label: 'Portfolio', highlight: false },
  { href: '/careers', label: 'Careers', highlight: false },
  { href: '/contact', label: 'Contact Us', highlight: false },
];

// Pages whose original markup left the "Portfolio" <li> unclosed, which removed the
// inline-block whitespace gap before "Careers". Kept so the menu spacing is identical.
export const COMPACT_CAREERS_GAP_PATHS = ['/', '/portfolio', '/contact'];


// Contact details, map links and social links are edited in the admin panel
// ("Contact Details") and read through getSiteContact() in lib/content.js.
export const SOCIAL_NETWORKS = [
  { key: 'social.facebook', label: 'Facebook', icon: 'fab fa-facebook-f' },
  { key: 'social.x', label: 'X (Twitter)', icon: 'fa-brands fa-x-twitter' },
  { key: 'social.behance', label: 'Behance', icon: 'fab fa-behance' },
  { key: 'social.linkedin', label: 'LinkedIn', icon: 'fab fa-linkedin-in' },
];
