import { portfolioProjectsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import PortfolioProjectForm from '@/components/admin/forms/PortfolioProjectForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Edit portfolio project' };

export default async function EditPortfolioProjectPage({ params }) {
  const item = await loadRecord(params, portfolioProjectsRepo.findById);
  return (
    <>
      <PageHeader title="Edit portfolio project" backHref={`${ADMIN_BASE}/portfolio`} />
      <PortfolioProjectForm item={item} />
    </>
  );
}
