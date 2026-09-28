import { adminUsersRepo } from '@/lib/repositories';
import { requireAdmin } from '@/lib/auth/session';
import { deleteAdminUser } from '@/actions/admin/users';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { initials } from '@/components/admin/nav';

export const metadata = { title: 'Admin Users' };

const formatDate = (date) =>
  date ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Dubai' }).format(new Date(date)) : 'Never';

export default async function AdminUsersPage() {
  const [me, admins] = await Promise.all([requireAdmin(), adminUsersRepo.listAdmins()]);
  return (
    <>
      <PageHeader title="Admin Users" description="People who can sign in to this admin panel." actionHref="/bys-panel-d10224a364/users/new" actionLabel="Add admin" />
      <StatusAlert />
      <AdminTable
        rows={admins}
        itemLabel="admins"
        columns={[
          {
            key: 'name', label: 'Admin',
            render: (row) => (
              <span className="admin-sender">
                <span className="admin-avatar">{initials(row.name)}</span>
                <span className="min-w-0">
                  <span className="admin-sender__name">
                    {row.name}
                    {row.id === me.id && <span className="admin-pill-new">You</span>}
                  </span>
                  <span className="admin-sender__email">{row.email}</span>
                </span>
              </span>
            ),
          },
          { key: 'lastLoginAt', label: 'Last sign in', render: (row) => <span className="small text-nowrap">{formatDate(row.lastLoginAt)}</span> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => (
              <RowActions
                id={row.id}
                editHref={row.id === me.id ? '/bys-panel-d10224a364/account' : `/bys-panel-d10224a364/users/${row.id}/edit`}
                deleteAction={row.id === me.id || admins.length <= 1 ? undefined : deleteAdminUser}
                itemLabel={`the admin account of ${row.name}`}
              />
            ),
          },
        ]}
      />
    </>
  );
}
