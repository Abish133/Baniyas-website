'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, COMPACT_CAREERS_GAP_PATHS } from '@/lib/constants/site';

function isActive(pathname, href) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavMenu({ id }) {
  const pathname = usePathname();
  const compactCareersGap = COMPACT_CAREERS_GAP_PATHS.includes(pathname);
  return (
    <ul id={id}>
      {NAV_LINKS.map((link, index) => (
        // The menu items are inline-blocks: keep the whitespace gap the static markup had.
        <Fragment key={link.href}>
          {index > 0 && !(compactCareersGap && link.href === '/careers') && ' '}
          <li>
            <Link
              href={link.href}
              className={link.highlight && isActive(pathname, link.href) ? 'active' : undefined}
            >
              {link.label}
            </Link>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
