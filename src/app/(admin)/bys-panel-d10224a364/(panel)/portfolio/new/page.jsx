import { portfolioProjectsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import PortfolioProjectForm from '@/components/admin/forms/PortfolioProjectForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Add portfolio project' };

export default async function NewPortfolioProjectPage() {
  const sortOrder = await portfolioProjectsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add portfolio project" backHref={`${ADMIN_BASE}/portfolio`} />
      <PortfolioProjectForm defaults={{ isActive: true, sortOrder }} />
    </>
  );
}
