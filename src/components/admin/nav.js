import { ADMIN_BASE } from '@/lib/admin-path';
// Admin sidebar navigation, grouped by section.
export const ADMIN_NAV = [
  {
    heading: null,
    items: [{ href: ADMIN_BASE, label: 'Dashboard', icon: 'fa-regular fa-grid-2', exact: true }],
  },
  {
    heading: 'Page content',
    items: [
      { href: `${ADMIN_BASE}/content/home`, label: 'Home page', icon: 'fa-regular fa-house' },
      { href: `${ADMIN_BASE}/content/about`, label: 'About page', icon: 'fa-regular fa-building' },
      { href: `${ADMIN_BASE}/content/careers`, label: 'Careers page', icon: 'fa-regular fa-user-plus' },
      { href: `${ADMIN_BASE}/content/layout`, label: 'Footer & Sidebar', icon: 'fa-regular fa-table-layout' },
      { href: `${ADMIN_BASE}/content/legal`, label: 'Legal Pages', icon: 'fa-regular fa-file-contract' },
    ],
  },
  {
    heading: 'Home page lists',
    items: [
      { href: `${ADMIN_BASE}/trusted-clients`, label: 'Trusted Clients', icon: 'fa-regular fa-handshake' },
      { href: `${ADMIN_BASE}/stats`, label: 'Counters', icon: 'fa-regular fa-chart-simple' },
      { href: `${ADMIN_BASE}/home-projects`, label: 'Project Showcase', icon: 'fa-regular fa-images' },
    ],
  },
  {
    heading: 'Pages',
    items: [
      { href: `${ADMIN_BASE}/services`, label: 'Services', icon: 'fa-regular fa-helmet-safety' },
      { href: `${ADMIN_BASE}/portfolio`, label: 'Portfolio', icon: 'fa-regular fa-building' },
      { href: `${ADMIN_BASE}/clients`, label: 'Our Clients', icon: 'fa-regular fa-users' },
      { href: `${ADMIN_BASE}/jobs`, label: 'Job Openings', icon: 'fa-regular fa-briefcase' },
      { href: `${ADMIN_BASE}/messages`, label: 'Messages', icon: 'fa-regular fa-envelope', badge: 'unread' },
    ],
  },
  {
    heading: 'Settings',
    items: [
      { href: `${ADMIN_BASE}/contact`, label: 'Contact Details', icon: 'fa-regular fa-address-book' },
      { href: `${ADMIN_BASE}/content/seo`, label: 'SEO & Sharing', icon: 'fa-regular fa-magnifying-glass' },
      { href: `${ADMIN_BASE}/users`, label: 'Admin Users', icon: 'fa-regular fa-user-shield' },
      { href: `${ADMIN_BASE}/activity`, label: 'Activity Log', icon: 'fa-regular fa-clock-rotate-left' },
      { href: `${ADMIN_BASE}/account`, label: 'My Account', icon: 'fa-regular fa-user-gear' },
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
