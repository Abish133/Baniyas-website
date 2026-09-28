import { homeStatsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import HomeStatForm from '@/components/admin/forms/HomeStatForm';

export const metadata = { title: 'Edit counter' };

export default async function EditStatPage({ params }) {
  const item = await loadRecord(params, homeStatsRepo.findById);
  return (
    <>
      <PageHeader title={`Edit: ${item.label}`} backHref="/bys-panel-d10224a364/stats" />
      <HomeStatForm item={item} />
    </>
  );
}
