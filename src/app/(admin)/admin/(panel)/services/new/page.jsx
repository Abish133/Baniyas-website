import { servicesRepo } from '@/lib/repositories';
import { LIMITS } from '@/lib/validation/schemas';
import PageHeader from '@/components/admin/PageHeader';
import ServiceForm from '@/components/admin/forms/ServiceForm';

export const metadata = { title: 'Add service' };

export default async function NewServicePage() {
  const sortOrder = await servicesRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add service" backHref="/admin/services" />
      <ServiceForm
        defaults={{ isActive: true, showOnHome: true, showOnPage: true, icon: 'flaticon-layers', sortOrder, benefits: [], faqs: [] }}
        limits={{ benefits: LIMITS.serviceBenefits, faqs: LIMITS.serviceFaqs }}
      />
    </>
  );
}
