import { portfolioProjectsRepo } from '@/lib/repositories';
import { togglePortfolioProject, deletePortfolioProject } from '@/actions/admin/portfolio';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable, { ActiveBadge, Thumb } from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Portfolio' };

export default async function PortfolioAdminPage() {
  const items = await portfolioProjectsRepo.listAll();
  return (
    <>
      <PageHeader siteHref="/portfolio" title="Portfolio" description="Project grid on the Portfolio page." actionHref={`${ADMIN_BASE}/portfolio/new`} actionLabel="Add project" />
      <StatusAlert />
      <AdminTable
        rows={items}
        emptyAction={{ href: `${ADMIN_BASE}/portfolio/new`, label: 'Add project' }}
        columns={[
          { key: 'image', label: 'Image', render: (row) => <Thumb src={row.image} alt="" /> },
          { key: 'caption', label: 'Caption', className: 'admin-table__wrap' },
          { key: 'sortOrder', label: 'Order', className: 'text-center' },
          { key: 'isActive', label: 'Status', render: (row) => <ActiveBadge active={row.isActive} /> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => (
              <RowActions id={row.id} isActive={row.isActive} editHref={`${ADMIN_BASE}/portfolio/${row.id}/edit`} toggleAction={togglePortfolioProject} deleteAction={deletePortfolioProject} itemLabel="this project" />
            ),
          },
        ]}
      />
    </>
  );
}
