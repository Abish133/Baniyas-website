import { homeStatsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import HomeStatForm from '@/components/admin/forms/HomeStatForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Add counter' };

export default async function NewStatPage() {
  const sortOrder = await homeStatsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add counter" backHref={`${ADMIN_BASE}/stats`} />
      <HomeStatForm defaults={{ isActive: true, suffix: '+', sortOrder }} />
    </>
  );
}
