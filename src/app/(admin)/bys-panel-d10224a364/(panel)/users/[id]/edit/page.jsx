import { redirect } from 'next/navigation';
import { adminUsersRepo } from '@/lib/repositories';
import { requireAdmin } from '@/lib/auth/session';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import AdminUserForm from '@/components/admin/forms/AdminUserForm';

export const metadata = { title: 'Edit admin' };

export default async function EditAdminUserPage({ params }) {
  const [me, item] = await Promise.all([requireAdmin(), loadRecord(params, adminUsersRepo.findAdminById)]);
  // Your own account (and password check) lives under My Account.
  if (item.id === me.id) redirect('/bys-panel-d10224a364/account');
  return (
    <>
      <PageHeader title={`Edit: ${item.name}`} backHref="/bys-panel-d10224a364/users" />
      <AdminUserForm item={{ id: item.id, name: item.name, email: item.email }} />
    </>
  );
}
