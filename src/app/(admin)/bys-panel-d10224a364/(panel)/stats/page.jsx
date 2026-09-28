import { homeStatsRepo } from '@/lib/repositories';
import { LIMITS } from '@/lib/validation/schemas';
import { toggleHomeStat, deleteHomeStat } from '@/actions/admin/stats';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable, { ActiveBadge } from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';

export const metadata = { title: 'Counters' };

export default async function StatsPage() {
  const items = await homeStatsRepo.listAll();
  return (
    <>
      <PageHeader
        siteHref="/"
        title="Counters"
        description={`Animated figures in the home page "About" section (max ${LIMITS.homeStatsActive} visible).`}
        actionHref="/bys-panel-d10224a364/stats/new"
        actionLabel="Add counter"
      />
      <StatusAlert />
      <AdminTable
        rows={items}
        emptyAction={{ href: '/bys-panel-d10224a364/stats/new', label: 'Add counter' }}
        columns={[
          { key: 'value', label: 'Figure', render: (row) => <strong className="fs-5">{row.value}{row.suffix}</strong> },
          { key: 'label', label: 'Label' },
          { key: 'sortOrder', label: 'Order', className: 'text-center' },
          { key: 'isActive', label: 'Status', render: (row) => <ActiveBadge active={row.isActive} /> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => (
              <RowActions id={row.id} isActive={row.isActive} editHref={`/bys-panel-d10224a364/stats/${row.id}/edit`} toggleAction={toggleHomeStat} deleteAction={deleteHomeStat} itemLabel={`"${row.label}"`} />
            ),
          },
        ]}
      />
    </>
  );
}
