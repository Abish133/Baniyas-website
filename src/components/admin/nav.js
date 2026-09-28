// Admin sidebar navigation, grouped by section.
export const ADMIN_NAV = [
  {
    heading: null,
    items: [{ href: '/admin', label: 'Dashboard', icon: 'fa-regular fa-grid-2', exact: true }],
  },
  {
    heading: 'Home page',
    items: [
      { href: '/admin/trusted-clients', label: 'Trusted Clients', icon: 'fa-regular fa-handshake' },
      { href: '/admin/stats', label: 'Counters', icon: 'fa-regular fa-chart-simple' },
      { href: '/admin/home-projects', label: 'Project Showcase', icon: 'fa-regular fa-images' },
    ],
  },
  {
    heading: 'Pages',
    items: [
      { href: '/admin/services', label: 'Services', icon: 'fa-regular fa-helmet-safety' },
      { href: '/admin/portfolio', label: 'Portfolio', icon: 'fa-regular fa-building' },
      { href: '/admin/clients', label: 'Our Clients', icon: 'fa-regular fa-users' },
      { href: '/admin/jobs', label: 'Job Openings', icon: 'fa-regular fa-briefcase' },
      { href: '/admin/messages', label: 'Messages', icon: 'fa-regular fa-envelope', badge: 'unread' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { href: '/admin/settings', label: 'Section Headings', icon: 'fa-regular fa-heading' },
      { href: '/admin/account', label: 'My Account', icon: 'fa-regular fa-user-gear' },
    ],
  },
];

export function isNavItemActive(item, pathname) {
  return item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
}

/** Breadcrumb trail for the top bar, e.g. ["Home page", "Counters", "Edit"]. */
export function breadcrumbFor(pathname) {
  for (const group of ADMIN_NAV) {
    const item = group.items.find((entry) => isNavItemActive(entry, pathname));
    if (!item) continue;
    const trail = [];
    if (group.heading) trail.push({ label: group.heading });
    trail.push({ label: item.label, href: item.href });
    const rest = pathname.slice(item.href.length);
    if (rest === '/new') trail.push({ label: 'New' });
    else if (rest.endsWith('/edit')) trail.push({ label: 'Edit' });
    else if (rest.length > 1) trail.push({ label: 'View' });
    return trail;
  }
  return [];
}

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'A';
