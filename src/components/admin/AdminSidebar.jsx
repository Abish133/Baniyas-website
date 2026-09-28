'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ADMIN_NAV } from './nav';

export default function AdminSidebar({ unreadMessages = 0 }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (item) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <>
      <button type="button" className="btn btn-dark admin-sidebar__toggle d-lg-none" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>
      <aside className={`admin-sidebar${open ? ' is-open' : ''}`}>
        <Link href="/admin" className="admin-sidebar__brand">
          <img src="/assets/img/logo.png" alt="" />
          <span>
            BANIYAS <small>Admin</small>
          </span>
        </Link>
        <nav>
          {ADMIN_NAV.map((item, index) =>
            item.heading ? (
              <div className="admin-sidebar__heading" key={`h-${index}`}>
                {item.heading}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={`admin-sidebar__link${isActive(item) ? ' is-active' : ''}`}>
                <i className={item.icon}></i>
                <span>{item.label}</span>
                {item.badge === 'unread' && unreadMessages > 0 && <span className="badge rounded-pill bg-warning text-dark ms-auto">{unreadMessages}</span>}
              </Link>
            )
          )}
        </nav>
      </aside>
      {open && <div className="admin-sidebar__backdrop d-lg-none" onClick={() => setOpen(false)}></div>}
    </>
  );
}
