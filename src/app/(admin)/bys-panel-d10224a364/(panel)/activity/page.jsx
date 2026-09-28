import { activityRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import AdminTable from '@/components/admin/AdminTable';
import { initials } from '@/components/admin/nav';

export const metadata = { title: 'Activity Log' };

const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Dubai' }).format(new Date(date));

const ACTION_TONES = { created: 'on', shown: 'on', 'signed in': 'muted', deleted: 'danger', hidden: 'muted' };

export default async function ActivityPage() {
  // Entries older than a year are removed to keep the table small.
  await activityRepo.pruneActivity(365);
  const entries = await activityRepo.listActivity(300);
  return (
    <>
      <PageHeader title="Activity Log" description="Who changed what in the admin panel (latest 300 changes, kept for one year)." />
      {entries === null && (
        <div className="admin-alert admin-alert--danger" role="alert">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <div>The activity table does not exist yet. Run <code>npm run db:migrate</code> on the server.</div>
        </div>
      )}
      <AdminTable
        rows={entries || []}
        itemLabel="entries"
        emptyText="No activity recorded yet."
        emptyIcon="fa-regular fa-clock-rotate-left"
        columns={[
          { key: 'createdAt', label: 'When', render: (row) => <span className="small text-nowrap">{formatDate(row.createdAt)}</span> },
          {
            key: 'adminName', label: 'Who',
            render: (row) => (
              <span className="admin-sender">
                <span className="admin-avatar">{initials(row.adminName)}</span>
                <span className="admin-sender__name">{row.adminName}</span>
              </span>
            ),
          },
          {
            key: 'action', label: 'What', className: 'admin-table__wrap',
            render: (row) => (
              <span>
                <span className={`admin-activity-action admin-activity-action--${ACTION_TONES[row.action] || 'info'}`}>{row.action}</span>{' '}
                <strong>{row.section}</strong>
                {row.item && <span className="text-muted"> · {row.item}</span>}
              </span>
            ),
          },
        ]}
      />
    </>
  );
}
