import { clientsRepo } from '@/lib/repositories';
import PageHeader from '@/components/admin/PageHeader';
import ClientForm from '@/components/admin/forms/ClientForm';

export const metadata = { title: 'Add client' };

export default async function NewClientPage() {
  const sortOrder = await clientsRepo.nextSortOrder();
  return (
    <>
      <PageHeader title="Add client" backHref="/bys-panel-d10224a364/clients" />
      <ClientForm defaults={{ isActive: true, sortOrder }} />
    </>
  );
}
