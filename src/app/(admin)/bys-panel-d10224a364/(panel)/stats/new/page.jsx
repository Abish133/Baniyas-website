import { homeStatsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import HomeStatForm from '@/components/admin/forms/HomeStatForm';

export const metadata = { title: 'Add counter' };

export default async function NewStatPage() {
  const sortOrder = await homeStatsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add counter" backHref="/bys-panel-d10224a364/stats" />
      <HomeStatForm defaults={{ isActive: true, suffix: '+', sortOrder }} />
    </>
  );
}
