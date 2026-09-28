// Admin sidebar navigation.
export const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: 'fa-solid fa-gauge-high', exact: true },
  { heading: 'Home page' },
  { href: '/admin/trusted-clients', label: 'Trusted Clients', icon: 'fa-solid fa-handshake' },
  { href: '/admin/stats', label: 'Counters', icon: 'fa-solid fa-chart-simple' },
  { href: '/admin/home-projects', label: 'Project Showcase', icon: 'fa-solid fa-images' },
  { heading: 'Pages' },
  { href: '/admin/services', label: 'Services', icon: 'fa-solid fa-helmet-safety' },
  { href: '/admin/portfolio', label: 'Portfolio', icon: 'fa-solid fa-building' },
  { href: '/admin/clients', label: 'Our Clients', icon: 'fa-solid fa-users' },
  { href: '/admin/jobs', label: 'Job Openings', icon: 'fa-solid fa-briefcase' },
  { href: '/admin/messages', label: 'Messages', icon: 'fa-solid fa-envelope', badge: 'unread' },
  { heading: 'Settings' },
  { href: '/admin/settings', label: 'Section Headings', icon: 'fa-solid fa-heading' },
  { href: '/admin/account', label: 'My Account', icon: 'fa-solid fa-user-gear' },
];
