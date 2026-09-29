import { trustedClientsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import TrustedClientForm from '@/components/admin/forms/TrustedClientForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Edit client logo' };

export default async function EditTrustedClientPage({ params }) {
  const item = await loadRecord(params, trustedClientsRepo.findById);
  return (
    <>
      <PageHeader title={`Edit: ${item.name}`} backHref={`${ADMIN_BASE}/trusted-clients`} />
      <TrustedClientForm item={item} />
    </>
  );
}
