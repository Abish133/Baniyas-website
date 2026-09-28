import PageHeader from '@/components/admin/PageHeader';
import AdminUserForm from '@/components/admin/forms/AdminUserForm';

export const metadata = { title: 'Add admin' };

export default function NewAdminUserPage() {
  return (
    <>
      <PageHeader title="Add admin" backHref="/bys-panel-d10224a364/users" />
      <AdminUserForm />
    </>
  );
}
