import { homeStatsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import HomeStatForm from '@/components/admin/forms/HomeStatForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Edit counter' };

export default async function EditStatPage({ params }) {
  const item = await loadRecord(params, homeStatsRepo.findById);
  return (
    <>
      <PageHeader title={`Edit: ${item.label}`} backHref={`${ADMIN_BASE}/stats`} />
      <HomeStatForm item={item} />
    </>
  );
}
