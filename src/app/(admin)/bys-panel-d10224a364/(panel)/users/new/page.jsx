import PageHeader from '@/components/admin/PageHeader';
import AdminUserForm from '@/components/admin/forms/AdminUserForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Add admin' };

export default function NewAdminUserPage() {
  return (
    <>
      <PageHeader title="Add admin" backHref={`${ADMIN_BASE}/users`} />
      <AdminUserForm />
    </>
  );
}
