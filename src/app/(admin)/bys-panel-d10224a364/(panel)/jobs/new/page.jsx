import { jobsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import JobForm from '@/components/admin/forms/JobForm';
import { ADMIN_BASE } from '@/lib/admin-path';

export const metadata = { title: 'Add job' };

export default async function NewJobPage() {
  const sortOrder = await jobsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add job opening" backHref={`${ADMIN_BASE}/jobs`} />
      <JobForm defaults={{ isActive: true, jobType: 'Full-time', sortOrder }} />
    </>
  );
}
