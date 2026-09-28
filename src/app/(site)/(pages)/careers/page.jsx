import { getJobOpenings } from '@/lib/content';
import Breadcrumb from '@/components/site/common/Breadcrumb';
import JobOpenings from '@/components/site/careers/JobOpenings';
import { CareersIntro, EmployeeBenefits } from '@/components/site/careers/CareersStatic';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Careers' };

export default async function CareersPage() {
  const jobs = await getJobOpenings();
  return (
    <>
      <Breadcrumb title="Careers" />
      <CareersIntro />
      <JobOpenings jobs={jobs} />
      <EmployeeBenefits />
    </>
  );
}
