import { Suspense } from 'react';
import { pageMetadata } from '@/lib/seo';
import { getServicesPageContent } from '@/lib/content';
import Breadcrumb from '@/components/site/common/Breadcrumb';
import ServicesExplorer, { ServicesExplorerFromUrl } from '@/components/site/services/ServicesExplorer';

export const generateMetadata = () => pageMetadata('services');

// Pre-rendered (ISR). The ?service=<slug> selection is read in the browser, so the page
// does not have to be rendered per request; the pre-rendered HTML shows the first service.
export default async function ServicesPage() {
  const services = await getServicesPageContent();
  return (
    <>
      <Breadcrumb title="Services" />
      <Suspense fallback={<ServicesExplorer services={services} />}>
        <ServicesExplorerFromUrl services={services} />
      </Suspense>
    </>
  );
}
