import { servicesRepo } from '@/lib/repositories';
import { toggleService, deleteService } from '@/actions/admin/services';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable, { ActiveBadge, Thumb } from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Services' };

export default async function ServicesAdminPage() {
  const items = await servicesRepo.listAll();
  return (
    <>
      <PageHeader
        siteHref="/services"
        title="Services"
        description="Cards in the home page slider and the full details on the Services page."
        actionHref={`${ADMIN_BASE}/services/new`}
        actionLabel="Add service"
      />
      <StatusAlert />
      <AdminTable
        rows={items}
        emptyAction={{ href: `${ADMIN_BASE}/services/new`, label: 'Add service' }}
        columns={[
          {
            key: 'icon', label: 'Card',
            render: (row) => <span className="admin-icon-cell"><i className={row.icon}></i></span>,
          },
          {
            key: 'title', label: 'Service',
            render: (row) => (
              <>
                <div className="fw-semibold">{row.title}</div>
                <div className="small text-muted">
                  Card: {row.cardTitle}
                  {row.showOnPage && ` · /services?service=${row.slug}`}
                </div>
              </>
            ),
          },
          { key: 'image', label: 'Image', render: (row) => (row.image ? <Thumb src={row.image} alt="" /> : <span className="text-muted small">—</span>) },
          {
            key: 'placement', label: 'Shown on',
            render: (row) => (
              <div className="d-flex flex-wrap gap-1">
                {row.showOnHome && <span className="badge text-bg-light border">Home slider</span>}
                {row.showOnPage && <span className="badge text-bg-light border">Services page</span>}
              </div>
            ),
          },
          { key: 'sortOrder', label: 'Order', className: 'text-center' },
          { key: 'isActive', label: 'Status', render: (row) => <ActiveBadge active={row.isActive} /> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => (
              <RowActions id={row.id} isActive={row.isActive} editHref={`${ADMIN_BASE}/services/${row.id}/edit`} toggleAction={toggleService} deleteAction={deleteService} itemLabel={`"${row.title}" with its benefits and FAQs`} />
            ),
          },
        ]}
      />
    </>
  );
}
