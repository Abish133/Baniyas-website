import { redirect } from 'next/navigation';
import { adminUsersRepo } from '@/lib/repositories';
import { requireAdmin } from '@/lib/auth/session';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import AdminUserForm from '@/components/admin/forms/AdminUserForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Edit admin' };

export default async function EditAdminUserPage({ params }) {
  const [me, item] = await Promise.all([requireAdmin(), loadRecord(params, adminUsersRepo.findAdminById)]);
  // Your own account (and password check) lives under My Account.
  if (item.id === me.id) redirect(`${ADMIN_BASE}/account`);
  return (
    <>
      <PageHeader title={`Edit: ${item.name}`} backHref={`${ADMIN_BASE}/users`} />
      <AdminUserForm item={{ id: item.id, name: item.name, email: item.email }} />
    </>
  );
}
