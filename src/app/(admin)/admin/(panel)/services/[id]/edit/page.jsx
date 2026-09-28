import { servicesRepo } from '@/lib/repositories';
import { LIMITS } from '@/lib/validation/schemas';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import ServiceForm from '@/components/admin/forms/ServiceForm';

export const metadata = { title: 'Edit service' };

export default async function EditServicePage({ params }) {
  const item = await loadRecord(params, servicesRepo.findById);
  return (
    <>
      <PageHeader title={`Edit: ${item.title}`} backHref="/admin/services" />
      <ServiceForm item={item} limits={{ benefits: LIMITS.serviceBenefits, faqs: LIMITS.serviceFaqs }} />
    </>
  );
}
