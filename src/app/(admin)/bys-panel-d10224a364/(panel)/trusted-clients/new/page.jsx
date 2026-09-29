import { trustedClientsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import TrustedClientForm from '@/components/admin/forms/TrustedClientForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Add client logo' };

export default async function NewTrustedClientPage() {
  const sortOrder = await trustedClientsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add client logo" backHref={`${ADMIN_BASE}/trusted-clients`} />
      <TrustedClientForm defaults={{ isActive: true, sortOrder }} />
    </>
  );
}
