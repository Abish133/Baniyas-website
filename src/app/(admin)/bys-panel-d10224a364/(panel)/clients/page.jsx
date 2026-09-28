import { clientsRepo } from '@/lib/repositories';
import { toggleClient, deleteClient } from '@/actions/admin/clients';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable, { ActiveBadge } from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';

export const metadata = { title: 'Our Clients' };

export default async function ClientsAdminPage() {
  const items = await clientsRepo.listAll();
  return (
    <>
      <PageHeader title="Our Clients" description='Client names in the "Our Clients" grid on the About page.' actionHref="/bys-panel-d10224a364/clients/new" actionLabel="Add client" />
      <StatusAlert />
      <AdminTable
        rows={items}
        emptyAction={{ href: '/bys-panel-d10224a364/clients/new', label: 'Add client' }}
        columns={[
          { key: 'name', label: 'Client name' },
          { key: 'sortOrder', label: 'Order', className: 'text-center' },
          { key: 'isActive', label: 'Status', render: (row) => <ActiveBadge active={row.isActive} /> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => (
              <RowActions id={row.id} isActive={row.isActive} editHref={`/bys-panel-d10224a364/clients/${row.id}/edit`} toggleAction={toggleClient} deleteAction={deleteClient} itemLabel={`"${row.name}"`} />
            ),
          },
        ]}
      />
    </>
  );
}
