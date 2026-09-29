'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ADMIN_NAV, breadcrumbFor, initials, isNavItemActive } from './nav';
import { logout } from '@/actions/admin/auth';
import { SIDEBAR_COOKIE } from './constants';

const DESKTOP_QUERY = '(min-width: 992px)';

/**
 * Admin frame: collapsible sidebar (icon rail on desktop, drawer on mobile) + top bar.
 * The collapsed state is kept in a cookie so the server renders the right width.
 */
export default function AdminShell({ admin, unreadMessages = 0, initialCollapsed = false, children }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMobileOpen(false);
  }

  const toggleSidebar = () => {
    if (!window.matchMedia(DESKTOP_QUERY).matches) {
      setMobileOpen((open) => !open);
      return;
    }
    const next = !collapsed;
    setCollapsed(next);
    document.cookie = `${SIDEBAR_COOKIE}=${next ? 'collapsed' : 'expanded'}; path=/admin; max-age=31536000; samesite=lax`;
  };

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setMobileOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <div className={`admin-shell${collapsed ? ' is-collapsed' : ''}${mobileOpen ? ' is-mobile-open' : ''}`}>
      <Sidebar pathname={pathname} collapsed={collapsed} unreadMessages={unreadMessages} />
      <div className="admin-backdrop" onClick={() => setMobileOpen(false)} aria-hidden="true"></div>
      <div className="admin-main">
        <Topbar pathname={pathname} admin={admin} unreadMessages={unreadMessages} collapsed={collapsed} onToggle={toggleSidebar} />
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({ pathname, collapsed, unreadMessages }) {
  // Collapsed rail: show the label as a floating tooltip (the nav scrolls, so CSS-only tooltips would be clipped).
  const [tip, setTip] = useState(null);
  const showTip = (event, label) => {
    if (!collapsed || !window.matchMedia(DESKTOP_QUERY).matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setTip({ label, top: rect.top + rect.height / 2 });
  };
  const hideTip = () => setTip(null);

  return (
    <aside className="admin-sidebar" aria-label="Admin navigation">
      <Link href="/bys-panel-d10224a364" className="admin-sidebar__brand" onMouseEnter={(e) => showTip(e, 'Dashboard')} onMouseLeave={hideTip}>
        <img src="/assets/img/logo.webp" alt="" />
        <span className="admin-sidebar__brand-text">
          Bani Yas
          <small>Content Manager</small>
        </span>
      </Link>

      <nav className="admin-sidebar__nav" onScroll={hideTip}>
        {ADMIN_NAV.map((group, index) => (
          <div className="admin-sidebar__group" key={group.heading || index}>
            {group.heading && <div className="admin-sidebar__heading">{group.heading}</div>}
            {group.items.map((item) => {
              const active = isNavItemActive(item, pathname);
              const badge = item.badge === 'unread' && unreadMessages > 0 ? unreadMessages : null;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-sidebar__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onMouseEnter={(e) => showTip(e, badge ? `${item.label} (${badge} new)` : item.label)}
                  onMouseLeave={hideTip}
                >
                  <span className="admin-sidebar__icon">
                    <i className={active ? item.icon.replace('fa-regular', 'fa-solid') : item.icon}></i>
                    {badge && <span className="admin-sidebar__dot" aria-hidden="true"></span>}
                  </span>
                  <span className="admin-sidebar__label">{item.label}</span>
                  {badge && <span className="admin-sidebar__badge">{badge}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="admin-sidebar__link"
          onMouseEnter={(e) => showTip(e, 'View website')}
          onMouseLeave={hideTip}
        >
          <span className="admin-sidebar__icon"><i className="fa-regular fa-globe"></i></span>
          <span className="admin-sidebar__label">View website</span>
          <i className="fa-regular fa-arrow-up-right-from-square admin-sidebar__external"></i>
        </a>
      </div>

      {tip && (
        <div className="admin-tooltip" style={{ top: tip.top }} role="tooltip">
          {tip.label}
        </div>
      )}
    </aside>
  );
}

function Topbar({ pathname, admin, unreadMessages, collapsed, onToggle }) {
  const trail = breadcrumbFor(pathname);
  return (
    <header className="admin-topbar">
      <button
        type="button"
        className="admin-icon-btn"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <i className="fa-regular fa-bars-staggered"></i>
      </button>

      <nav className="admin-breadcrumb" aria-label="Breadcrumb">
        <Link href="/bys-panel-d10224a364" className="admin-breadcrumb__home" aria-label="Dashboard">
          <i className="fa-regular fa-house"></i>
        </Link>
        {trail.map((crumb, index) => (
          <span key={`${crumb.label}-${index}`} className="admin-breadcrumb__item">
            <i className="fa-solid fa-chevron-right admin-breadcrumb__sep"></i>
            {crumb.href && index < trail.length - 1 ? <Link href={crumb.href}>{crumb.label}</Link> : <span>{crumb.label}</span>}
          </span>
        ))}
      </nav>

      <div className="admin-topbar__actions">
        <a href="/" target="_blank" rel="noreferrer" className="btn btn-light admin-topbar__site d-none d-md-inline-flex">
          <i className="fa-regular fa-arrow-up-right-from-square"></i>View website
        </a>
        <Link href="/bys-panel-d10224a364/messages" className="admin-icon-btn position-relative" aria-label="Messages" title="Messages">
          <i className="fa-regular fa-bell"></i>
          {unreadMessages > 0 && <span className="admin-icon-btn__badge">{unreadMessages > 9 ? '9+' : unreadMessages}</span>}
        </Link>
        <UserMenu admin={admin} />
      </div>
    </header>
  );
}

function UserMenu({ admin }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (event) => !ref.current?.contains(event.target) && setOpen(false);
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="admin-user" ref={ref}>
      <button type="button" className="admin-user__toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="menu">
        <span className="admin-avatar">{initials(admin.name)}</span>
        <span className="admin-user__name d-none d-sm-block">{admin.name}</span>
        <i className="fa-solid fa-chevron-down admin-user__caret"></i>
      </button>
      {open && (
        <div className="admin-user__menu" role="menu">
          <div className="admin-user__head">
            <span className="admin-avatar admin-avatar--lg">{initials(admin.name)}</span>
            <div className="min-w-0">
              <div className="fw-semibold text-truncate">{admin.name}</div>
              <div className="small text-muted text-truncate">{admin.email}</div>
            </div>
          </div>
          <Link href="/bys-panel-d10224a364/account" className="admin-user__item" role="menuitem" onClick={() => setOpen(false)}>
            <i className="fa-regular fa-user-gear"></i>My account
          </Link>
          <Link href="/bys-panel-d10224a364/activity" className="admin-user__item" role="menuitem" onClick={() => setOpen(false)}>
            <i className="fa-regular fa-clock-rotate-left"></i>Activity log
          </Link>
          <form action={logout}>
            <button type="submit" className="admin-user__item admin-user__item--danger" role="menuitem">
              <i className="fa-regular fa-right-from-bracket"></i>Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
