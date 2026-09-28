import { pageMetadata } from '@/lib/seo';
import { getJobOpenings } from '@/lib/content';
import Breadcrumb from '@/components/site/common/Breadcrumb';
import JobOpenings from '@/components/site/careers/JobOpenings';
import { CareersIntro, EmployeeBenefits } from '@/components/site/careers/CareersStatic';

export const dynamic = 'force-dynamic';
export const generateMetadata = () => pageMetadata('careers');

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
