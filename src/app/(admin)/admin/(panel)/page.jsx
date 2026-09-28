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
import PageHeader from '@/components/admin/PageHeader';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const [trusted, stats, projects, portfolio, clients, jobs, services, unread] = await Promise.all([
    trustedClientsRepo.count(),
    homeStatsRepo.count(),
    homeProjectsRepo.count(),
    portfolioProjectsRepo.count(),
    clientsRepo.count(),
    jobsRepo.count(),
    servicesRepo.count(),
    messagesRepo.countUnread(),
  ]);

  const cards = [
    { href: '/admin/trusted-clients', label: 'Trusted Clients', count: trusted, icon: 'fa-solid fa-handshake', note: 'Home logo marquee' },
    { href: '/admin/stats', label: 'Counters', count: stats, icon: 'fa-solid fa-chart-simple', note: 'Home 35+ / 70+ figures' },
    { href: '/admin/services', label: 'Services', count: services, icon: 'fa-solid fa-helmet-safety', note: 'Home slider & services page' },
    { href: '/admin/home-projects', label: 'Project Showcase', count: projects, icon: 'fa-solid fa-images', note: 'Home hover gallery' },
    { href: '/admin/portfolio', label: 'Portfolio', count: portfolio, icon: 'fa-solid fa-building', note: 'Portfolio page grid' },
    { href: '/admin/clients', label: 'Our Clients', count: clients, icon: 'fa-solid fa-users', note: 'About page list' },
    { href: '/admin/jobs', label: 'Job Openings', count: jobs, icon: 'fa-solid fa-briefcase', note: 'Careers page' },
    { href: '/admin/messages', label: 'Unread Messages', count: unread, icon: 'fa-solid fa-envelope', note: 'Contact form' },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Manage every dynamic section of the Bani Yas website." />
      <div className="row g-3">
        {cards.map((card) => (
          <div className="col-sm-6 col-xl-3" key={card.href}>
            <Link href={card.href} className="card admin-card admin-stat-card h-100">
              <div className="card-body d-flex align-items-center gap-3">
                <span className="admin-stat-card__icon">
                  <i className={card.icon}></i>
                </span>
                <div>
                  <div className="admin-stat-card__count">{card.count}</div>
                  <div className="fw-semibold">{card.label}</div>
                  <div className="small text-muted">{card.note}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
