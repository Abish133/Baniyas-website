import { homeProjectsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import HomeProjectForm from '@/components/admin/forms/HomeProjectForm';

export const metadata = { title: 'Add showcase project' };

export default async function NewHomeProjectPage() {
  const sortOrder = await homeProjectsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add showcase project" backHref="/bys-panel-d10224a364/home-projects" />
      <HomeProjectForm defaults={{ isActive: true, sortOrder }} />
    </>
  );
}
