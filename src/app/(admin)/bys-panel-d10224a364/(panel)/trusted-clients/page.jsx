import { trustedClientsRepo } from '@/lib/repositories';
import { LIMITS } from '@/lib/validation/schemas';
import { toggleTrustedClient, deleteTrustedClient } from '@/actions/admin/trusted-clients';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable, { ActiveBadge, Thumb } from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';

export const metadata = { title: 'Trusted Clients' };

export default async function TrustedClientsPage() {
  const items = await trustedClientsRepo.listAll();
  return (
    <>
      <PageHeader
        siteHref="/"
        title="Trusted Clients"
        description={`Logos in the "Our Trusted Clients" strip on the home page banner (max ${LIMITS.trustedClientsActive} visible).`}
        actionHref="/bys-panel-d10224a364/trusted-clients/new"
        actionLabel="Add client logo"
      />
      <StatusAlert />
      <AdminTable
        rows={items}
        emptyAction={{ href: '/bys-panel-d10224a364/trusted-clients/new', label: 'Add client logo' }}
        columns={[
          { key: 'logo', label: 'Logo', render: (row) => <Thumb src={row.logo} alt={row.name} wide /> },
          { key: 'name', label: 'Name' },
          { key: 'sortOrder', label: 'Order', className: 'text-center' },
          { key: 'isActive', label: 'Status', render: (row) => <ActiveBadge active={row.isActive} /> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => (
              <RowActions id={row.id} isActive={row.isActive} editHref={`/bys-panel-d10224a364/trusted-clients/${row.id}/edit`} toggleAction={toggleTrustedClient} deleteAction={deleteTrustedClient} itemLabel={`"${row.name}"`} />
            ),
          },
        ]}
      />
    </>
  );
}
