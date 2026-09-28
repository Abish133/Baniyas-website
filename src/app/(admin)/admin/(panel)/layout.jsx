import { cookies } from 'next/headers';
import { requireAdmin } from '@/lib/auth/session';
import { messagesRepo } from '@/lib/repositories';
import AdminShell from '@/components/admin/AdminShell';
import { SIDEBAR_COOKIE } from '@/components/admin/constants';

export default async function AdminPanelLayout({ children }) {
  const [admin, unread, cookieStore] = await Promise.all([requireAdmin(), messagesRepo.countUnread(), cookies()]);
  const collapsed = cookieStore.get(SIDEBAR_COOKIE)?.value === 'collapsed';

  return (
    <AdminShell admin={{ name: admin.name, email: admin.email }} unreadMessages={unread} initialCollapsed={collapsed}>
      {children}
    </AdminShell>
  );
}
