import Link from 'next/link';
import { messagesRepo } from '@/lib/repositories';
import { deleteMessage } from '@/actions/admin/messages';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';

export const metadata = { title: 'Messages' };

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Dubai' }).format(new Date(date));

export default async function MessagesPage({ searchParams }) {
  const [{ status }, items] = await Promise.all([searchParams, messagesRepo.listMessages()]);
  return (
    <>
      <PageHeader title="Messages" description="Submissions from the Contact page form." />
      <StatusAlert status={status} />
      <AdminTable
        rows={items}
        emptyText="No messages yet."
        columns={[
          {
            key: 'name', label: 'From',
            render: (row) => (
              <Link href={`/admin/messages/${row.id}`} className={`text-decoration-none ${row.isRead ? 'text-body' : 'fw-bold'}`}>
                {!row.isRead && <span className="badge text-bg-warning me-2">New</span>}
                {row.name}
                <div className="small text-muted fw-normal">{row.email}</div>
              </Link>
            ),
          },
          { key: 'message', label: 'Message', className: 'admin-table__wrap', render: (row) => <span className="text-muted">{(row.message || '—').slice(0, 90)}{row.message?.length > 90 ? '…' : ''}</span> },
          { key: 'createdAt', label: 'Received', render: (row) => <span className="small text-nowrap">{formatDate(row.createdAt)}</span> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => <RowActions id={row.id} editHref={`/admin/messages/${row.id}`} deleteAction={deleteMessage} itemLabel={`the message from ${row.name}`} />,
          },
        ]}
      />
    </>
  );
}
