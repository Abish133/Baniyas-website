import { jobsRepo } from '@/lib/repositories';
import { toggleJob, deleteJob } from '@/actions/admin/jobs';
import PageHeader from '@/components/admin/PageHeader';
import StatusAlert from '@/components/admin/StatusAlert';
import AdminTable, { ActiveBadge } from '@/components/admin/AdminTable';
import RowActions from '@/components/admin/RowActions';

export const metadata = { title: 'Job Openings' };

export default async function JobsAdminPage({ searchParams }) {
  const [{ status }, items] = await Promise.all([searchParams, jobsRepo.listAll()]);
  return (
    <>
      <PageHeader title="Job Openings" description='"Open Positions" on the Careers page.' actionHref="/admin/jobs/new" actionLabel="Add job" />
      <StatusAlert status={status} />
      <AdminTable
        rows={items}
        columns={[
          { key: 'title', label: 'Title', render: (row) => (<><div className="fw-semibold">{row.title}</div><div className="small text-muted">{row.jobType} · {row.location}</div></>) },
          { key: 'experience', label: 'Experience' },
          { key: 'sortOrder', label: 'Order', className: 'text-center' },
          { key: 'isActive', label: 'Status', render: (row) => <ActiveBadge active={row.isActive} /> },
          {
            key: 'actions', label: '', className: 'text-end',
            render: (row) => (
              <RowActions id={row.id} isActive={row.isActive} editHref={`/admin/jobs/${row.id}/edit`} toggleAction={toggleJob} deleteAction={deleteJob} itemLabel={`"${row.title}"`} />
            ),
          },
        ]}
      />
    </>
  );
}
