import Link from 'next/link';
import { messagesRepo } from '@/lib/repositories';
import { deleteMessage, markAllMessagesRead } from '@/actions/admin/messages';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { initials } from '@/components/admin/nav';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Messages' };

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Dubai' }).format(new Date(date));

export default async function MessagesPage({ searchParams }) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.trim().slice(0, 100) : '';
  const filter = params.filter === 'unread' ? 'unread' : 'all';
  const [items, unread] = await Promise.all([
    messagesRepo.listMessages({ search: q || undefined, unreadOnly: filter === 'unread' }),
    messagesRepo.countUnread(),
  ]);
  const exportQuery = new URLSearchParams({ ...(q && { q }), ...(filter === 'unread' && { filter }) }).toString();
  const filtered = Boolean(q) || filter === 'unread';

  return (
    <>
      <PageHeader title="Messages" description="Submissions from the Contact page form.">
        {unread > 0 && (
          <form action={markAllMessagesRead}>
            <button className="btn btn-light" type="submit">
              <i className="fa-regular fa-envelope-open me-2"></i>Mark all as read
            </button>
          </form>
        )}
        <a className="btn btn-light" href={`${ADMIN_BASE}/messages/export${exportQuery ? `?${exportQuery}` : ''}`}>
          <i className="fa-regular fa-file-arrow-down me-2"></i>Download CSV
        </a>
      </PageHeader>
      <StatusAlert />
      <form className="admin-filter" role="search">
        <div className="admin-filter__search">
          <i className="fa-regular fa-magnifying-glass"></i>
          <input type="search" name="q" defaultValue={q} className="form-control" placeholder="Search name, email, phone or message…" aria-label="Search messages" />
        </div>
        <select name="filter" defaultValue={filter} className="form-select" aria-label="Show">
          <option value="all">All messages</option>
          <option value="unread">Unread only ({unread})</option>
        </select>
        <button type="submit" className="btn btn-primary">Apply</button>
        {filtered && (
          <Link href={`${ADMIN_BASE}/messages`} className="btn btn-light">
            Clear
          </Link>
        )}
      </form>
      <AdminTable
        rows={items}
        emptyText={filtered ? 'No messages match your search.' : 'No messages yet. Submissions from the Contact page will appear here.'}
        itemLabel="messages"
        columns={[
          {
            key: 'name', label: 'From',
            render: (row) => (
              <Link href={`${ADMIN_BASE}/messages/${row.id}`} className={`admin-sender${row.isRead ? '' : ' is-unread'}`}>
                <span className="admin-avatar">{initials(row.name)}</span>
                <span className="min-w-0">
                  <span className="admin-sender__name">
                    {row.name}
                    {!row.isRead && <span className="admin-pill-new">New</span>}
                  </span>
                  <span className="admin-sender__email">{row.email}</span>
                </span>
              </Link>
            ),
          },
          { key: 'message', label: 'Message', className: 'admin-table__wrap', render: (row) => <span className="text-muted">{(row.message || '—').slice(0, 90)}{row.message?.length > 90 ? '…' : ''}</span> },
          { key: 'createdAt', label: 'Received', render: (row) => <span className="small text-nowrap">{formatDate(row.createdAt)}</span> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => <RowActions id={row.id} editHref={`${ADMIN_BASE}/messages/${row.id}`} editIcon="fa-regular fa-envelope-open-text" editLabel="Open" deleteAction={deleteMessage} itemLabel={`the message from ${row.name}`} />,
          },
        ]}
      />
    </>
  );
}
