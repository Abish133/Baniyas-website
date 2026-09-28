import { jobsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import JobForm from '@/components/admin/forms/JobForm';

export const metadata = { title: 'Add job' };

export default async function NewJobPage() {
  const sortOrder = await jobsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add job opening" backHref="/admin/jobs" />
      <JobForm defaults={{ isActive: true, jobType: 'Full-time', sortOrder }} />
    </>
  );
}
