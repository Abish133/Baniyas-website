import { clientsRepo } from '@/lib/repositories';
import { loadRecord } from '@/lib/admin/params';
import PageHeader from '@/components/admin/PageHeader';
import ClientForm from '@/components/admin/forms/ClientForm';

export const metadata = { title: 'Edit client' };

export default async function EditClientPage({ params }) {
  const item = await loadRecord(params, clientsRepo.findById);
  return (
    <>
      <PageHeader title={`Edit: ${item.name}`} backHref="/bys-panel-d10224a364/clients" />
      <ClientForm item={item} />
    </>
  );
}
