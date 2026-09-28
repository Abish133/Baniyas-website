import Link from 'next/link';
import { requireAdmin } from '@/lib/auth/session';
import { messagesRepo } from '@/lib/repositories';
import { logout } from '@/actions/admin/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminPanelLayout({ children }) {
  const admin = await requireAdmin();
  const unread = await messagesRepo.countUnread();

  return (
    <div className="admin-shell">
      <AdminSidebar unreadMessages={unread} />
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="ms-auto d-flex align-items-center gap-2">
            <Link href="/" target="_blank" className="btn btn-sm btn-outline-secondary">
              <i className="fa-solid fa-arrow-up-right-from-square me-1"></i>View website
            </Link>
            <span className="admin-topbar__user d-none d-sm-inline">
              <i className="fa-solid fa-circle-user me-1"></i>
              {admin.name}
            </span>
            <form action={logout}>
              <button type="submit" className="btn btn-sm btn-dark">
                <i className="fa-solid fa-right-from-bracket me-1"></i>Logout
              </button>
            </form>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
