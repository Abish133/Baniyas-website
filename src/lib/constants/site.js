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

export const MAP_URL =
  'https://www.google.com/maps/place/BANI+YAS+BUILDING+CONTRACTING+LLC/@25.7927303,55.9702808,17z/data=!3m1!4b1!4m6!3m5!1s0x3ef677ca5a3df437:0xcd1b24b01aa0fca1!8m2!3d25.7927303!4d55.9702808!16s%2Fg%2F11v5xyzmj3?entry=ttu&g_ep=EgoyMDI1MDcwNi4wIKXMDSoASAFQAw%3D%3D';

export const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.32862595678!2d55.9702808!3d25.792730300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef677ca5a3df437%3A0xcd1b24b01aa0fca1!2sBANI%20YAS%20BUILDING%20CONTRACTING%20LLC!5e0!3m2!1sen!2sin!4v1752064482698!5m2!1sen!2sin';

export const CONTACT = {
  telephone: { label: '+971 7 226 3131', href: 'tel:+97172263131' },
  mobile: { label: '+971 55 2070846', href: 'tel:+971552070846' },
  email: { label: 'baniyasbuilders@gmail.com', href: 'mailto:baniyasbuilders@gmail.com' },
};

export const SOCIAL_LINKS = [
  { href: 'https://facebook.com/', icon: 'fab fa-facebook-f' },
  { href: 'https://x.com/', icon: 'fa-brands fa-x-twitter' },
  { href: 'https://behance.net/', icon: 'fab fa-behance' },
  { href: 'https://linkedin.com/', icon: 'fab fa-linkedin-in' },
];
