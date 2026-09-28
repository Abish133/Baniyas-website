import { homeProjectsRepo } from '@/lib/repositories';
import { LIMITS } from '@/lib/validation/schemas';
import { toggleHomeProject, deleteHomeProject } from '@/actions/admin/home-projects';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable, { ActiveBadge, Thumb } from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';

export const metadata = { title: 'Project Showcase' };

export default async function HomeProjectsPage() {
  const items = await homeProjectsRepo.listAll();
  return (
    <>
      <PageHeader
        title="Project Showcase"
        description={`Hover-to-expand project images on the home page (max ${LIMITS.homeProjectsActive} visible).`}
        actionHref="/bys-panel-d10224a364/home-projects/new"
        actionLabel="Add project"
      />
      <StatusAlert />
      <AdminTable
        rows={items}
        emptyAction={{ href: '/bys-panel-d10224a364/home-projects/new', label: 'Add project' }}
        columns={[
          { key: 'image', label: 'Image', render: (row) => <Thumb src={row.image} alt={row.title} /> },
          { key: 'title', label: 'Title', render: (row) => (<><div className="fw-semibold">{row.title}</div><div className="small text-muted">{row.location}</div></>) },
          { key: 'sortOrder', label: 'Order', className: 'text-center' },
          { key: 'isActive', label: 'Status', render: (row) => <ActiveBadge active={row.isActive} /> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => (
              <RowActions id={row.id} isActive={row.isActive} editHref={`/bys-panel-d10224a364/home-projects/${row.id}/edit`} toggleAction={toggleHomeProject} deleteAction={deleteHomeProject} itemLabel={`"${row.title}"`} />
            ),
          },
        ]}
      />
    </>
  );
}
