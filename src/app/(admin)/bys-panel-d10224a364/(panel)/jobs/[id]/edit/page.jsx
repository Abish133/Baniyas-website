import { jobsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import JobForm from '@/components/admin/forms/JobForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Edit job' };

export default async function EditJobPage({ params }) {
  const item = await loadRecord(params, jobsRepo.findById);
  return (
    <>
      <PageHeader title={`Edit: ${item.title}`} backHref={`${ADMIN_BASE}/jobs`} />
      <JobForm item={item} />
    </>
  );
}
