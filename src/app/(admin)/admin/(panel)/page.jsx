import Link from 'next/link';
import {
  trustedClientsRepo,
  homeStatsRepo,
  homeProjectsRepo,
  portfolioProjectsRepo,
  clientsRepo,
  jobsRepo,
  servicesRepo,
  messagesRepo,
} from '@/lib/repositories';
import { requireAdmin } from '@/lib/auth/session';
import { initials } from '@/components/admin/nav';

export const metadata = { title: 'Dashboard' };

const TIME_ZONE = 'Asia/Dubai';

function greeting() {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hourCycle: 'h23', timeZone: TIME_ZONE }).format(new Date()));
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function timeAgo(date) {
  const seconds = Math.max(0, Math.round((Date.now() - new Date(date).getTime()) / 1000));
  const units = [
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [unit, size] of units) {
    if (seconds >= size) {
      const value = Math.floor(seconds / size);
      return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
}

async function sectionCounts(repo) {
  const [total, visible] = await Promise.all([repo.count(), repo.countActive()]);
  return { total, visible };
}

export default async function DashboardPage() {
  const [admin, trusted, stats, projects, portfolio, clients, jobs, services, messages, unread] = await Promise.all([
    requireAdmin(),
    sectionCounts(trustedClientsRepo),
    sectionCounts(homeStatsRepo),
    sectionCounts(homeProjectsRepo),
    sectionCounts(portfolioProjectsRepo),
    sectionCounts(clientsRepo),
    sectionCounts(jobsRepo),
    servicesRepo.listAll(),
    messagesRepo.listMessages(),
    messagesRepo.countUnread(),
  ]);

  const cards = [
    { href: '/admin/services', label: 'Services', icon: 'fa-helmet-safety', tone: 'amber', total: services.length, visible: services.filter((s) => s.isActive).length, note: 'Home slider & services page' },
    { href: '/admin/portfolio', label: 'Portfolio', icon: 'fa-building', tone: 'blue', ...portfolio, note: 'Portfolio page grid' },
    { href: '/admin/home-projects', label: 'Project Showcase', icon: 'fa-images', tone: 'violet', ...projects, note: 'Home hover gallery' },
    { href: '/admin/jobs', label: 'Job Openings', icon: 'fa-briefcase', tone: 'green', ...jobs, note: 'Careers page' },
    { href: '/admin/trusted-clients', label: 'Trusted Clients', icon: 'fa-handshake', tone: 'teal', ...trusted, note: 'Home logo strip' },
    { href: '/admin/stats', label: 'Counters', icon: 'fa-chart-simple', tone: 'rose', ...stats, note: 'Home figures' },
    { href: '/admin/clients', label: 'Our Clients', icon: 'fa-users', tone: 'slate', ...clients, note: 'About page list' },
  ];

  const quickActions = [
    { href: '/admin/services/new', label: 'Add a service', icon: 'fa-helmet-safety' },
    { href: '/admin/portfolio/new', label: 'Add a portfolio project', icon: 'fa-building' },
    { href: '/admin/jobs/new', label: 'Post a job opening', icon: 'fa-briefcase' },
    { href: '/admin/settings', label: 'Edit section headings', icon: 'fa-heading' },
  ];

  const sitePages = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
  ];

  const recent = messages.slice(0, 5);

  return (
    <div className="admin-dashboard">
      <section className="admin-hero">
        <div className="admin-hero__text">
          <span className="admin-hero__eyebrow">
            {new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', timeZone: TIME_ZONE }).format(new Date())}
          </span>
          <h1>
            {greeting()}, {admin.name.split(' ')[0]}
          </h1>
          <p>
            Manage every dynamic section of the Bani Yas website. Changes are published as soon as you save.
            {unread > 0 && (
              <>
                {' '}You have <Link href="/admin/messages">{unread} unread message{unread > 1 ? 's' : ''}</Link>.
              </>
            )}
          </p>
        </div>
        <div className="admin-hero__actions">
          <Link href="/admin/services/new" className="btn btn-primary">
            <i className="fa-solid fa-plus me-2"></i>Add service
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-hero-ghost">
            <i className="fa-regular fa-arrow-up-right-from-square me-2"></i>View website
          </a>
        </div>
      </section>

      <div className="admin-stat-grid">
        <Link href="/admin/messages" className="admin-stat admin-stat--highlight">
          <span className="admin-stat__icon admin-tone--amber">
            <i className="fa-regular fa-envelope"></i>
          </span>
          <span className="admin-stat__label">Unread messages</span>
          <span className="admin-stat__value">{unread}</span>
          <span className="admin-stat__meta">{messages.length} total from the contact form</span>
        </Link>
        {cards.map((card) => (
          <Link href={card.href} className="admin-stat" key={card.href}>
            <span className={`admin-stat__icon admin-tone--${card.tone}`}>
              <i className={`fa-regular ${card.icon}`}></i>
            </span>
            <span className="admin-stat__label">{card.label}</span>
            <span className="admin-stat__value">
              {card.visible}
              <small>/ {card.total}</small>
            </span>
            <span className="admin-stat__meta">
              <span className="admin-stat__bar">
                <span style={{ width: `${card.total ? Math.round((card.visible / card.total) * 100) : 0}%` }}></span>
              </span>
              {card.note}
            </span>
          </Link>
        ))}
      </div>

      <div className="admin-dashboard__panels">
        <section className="admin-card admin-panel">
          <header className="admin-panel__head">
            <div>
              <h2>Recent messages</h2>
              <p>Latest submissions from the Contact page.</p>
            </div>
            <Link href="/admin/messages" className="btn btn-light btn-sm">
              View all<i className="fa-regular fa-arrow-right ms-2"></i>
            </Link>
          </header>
          {recent.length === 0 ? (
            <div className="admin-empty admin-empty--compact">
              <span className="admin-empty__icon">
                <i className="fa-regular fa-inbox"></i>
              </span>
              <p>No messages yet.</p>
            </div>
          ) : (
            <ul className="admin-inbox">
              {recent.map((message) => (
                <li key={message.id}>
                  <Link href={`/admin/messages/${message.id}`} className={`admin-inbox__item${message.isRead ? '' : ' is-unread'}`}>
                    <span className="admin-avatar">{initials(message.name)}</span>
                    <span className="admin-inbox__body">
                      <span className="admin-inbox__top">
                        <strong>{message.name}</strong>
                        <time>{timeAgo(message.createdAt)}</time>
                      </span>
                      <span className="admin-inbox__text">{message.message || message.email}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="admin-dashboard__side">
          <section className="admin-card admin-panel">
            <header className="admin-panel__head">
              <div>
                <h2>Quick actions</h2>
              </div>
            </header>
            <div className="admin-quick">
              {quickActions.map((action) => (
                <Link href={action.href} className="admin-quick__item" key={action.href}>
                  <span className="admin-quick__icon">
                    <i className={`fa-regular ${action.icon}`}></i>
                  </span>
                  {action.label}
                  <i className="fa-regular fa-chevron-right ms-auto admin-quick__arrow"></i>
                </Link>
              ))}
            </div>
          </section>

          <section className="admin-card admin-panel">
            <header className="admin-panel__head">
              <div>
                <h2>Website pages</h2>
                <p>Open a page to check your changes.</p>
              </div>
            </header>
            <div className="admin-page-links">
              {sitePages.map((page) => (
                <a href={page.href} target="_blank" rel="noreferrer" key={page.href}>
                  {page.label}
                  <i className="fa-regular fa-arrow-up-right-from-square"></i>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
