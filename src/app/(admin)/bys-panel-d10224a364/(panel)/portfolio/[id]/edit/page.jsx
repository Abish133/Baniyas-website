import { portfolioProjectsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import PortfolioProjectForm from '@/components/admin/forms/PortfolioProjectForm';

export const metadata = { title: 'Edit portfolio project' };

export default async function EditPortfolioProjectPage({ params }) {
  const item = await loadRecord(params, portfolioProjectsRepo.findById);
  return (
    <>
      <PageHeader title="Edit portfolio project" backHref="/bys-panel-d10224a364/portfolio" />
      <PortfolioProjectForm item={item} />
    </>
  );
}
