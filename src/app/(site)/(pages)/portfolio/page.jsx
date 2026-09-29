import { pageMetadata } from '@/lib/seo';
import { getPortfolioProjects } from '@/lib/content';
import Breadcrumb from '@/components/site/common/Breadcrumb';
import PortfolioGrid from '@/components/site/portfolio/PortfolioGrid';

export const generateMetadata = () => pageMetadata('portfolio');

export default async function PortfolioPage() {
  const projects = await getPortfolioProjects();
  return (
    <>
      <Breadcrumb title="Portfolio" />
      <PortfolioGrid projects={projects} />
    </>
  );
}
