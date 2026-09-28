import { jobsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import JobForm from '@/components/admin/forms/JobForm';

export const metadata = { title: 'Edit job' };

export default async function EditJobPage({ params }) {
  const item = await loadRecord(params, jobsRepo.findById);
  return (
    <>
      <PageHeader title={`Edit: ${item.title}`} backHref="/bys-panel-d10224a364/jobs" />
      <JobForm item={item} />
    </>
  );
}
