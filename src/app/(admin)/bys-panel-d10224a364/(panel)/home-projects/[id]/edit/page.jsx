import { homeProjectsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import HomeProjectForm from '@/components/admin/forms/HomeProjectForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Edit showcase project' };

export default async function EditHomeProjectPage({ params }) {
  const item = await loadRecord(params, homeProjectsRepo.findById);
  return (
    <>
      <PageHeader title={`Edit: ${item.title}`} backHref={`${ADMIN_BASE}/home-projects`} />
      <HomeProjectForm item={item} />
    </>
  );
}
