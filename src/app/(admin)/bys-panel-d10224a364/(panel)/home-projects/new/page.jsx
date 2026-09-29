import { homeProjectsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import HomeProjectForm from '@/components/admin/forms/HomeProjectForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Add showcase project' };

export default async function NewHomeProjectPage() {
  const sortOrder = await homeProjectsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add showcase project" backHref={`${ADMIN_BASE}/home-projects`} />
      <HomeProjectForm defaults={{ isActive: true, sortOrder }} />
    </>
  );
}
