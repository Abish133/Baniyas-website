import { getServicesPageContent } from '@/lib/content';
import Breadcrumb from '@/components/site/common/Breadcrumb';
import ServicesExplorer from '@/components/site/services/ServicesExplorer';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Services' };

export default async function ServicesPage({ searchParams }) {
  const [{ service }, services] = await Promise.all([searchParams, getServicesPageContent()]);
  return (
    <>
      <Breadcrumb title="Services" />
      <ServicesExplorer services={services} initialSlug={typeof service === 'string' ? service : undefined} />
    </>
  );
}
