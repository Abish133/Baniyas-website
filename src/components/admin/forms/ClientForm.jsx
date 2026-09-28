'use client';

import AdminForm, { FormLayout, FormSection } from '@/components/admin/form/AdminForm';
import { TextField } from '@/components/admin/form/fields';
import PublishingSection from './PublishingSection';
import { saveClient } from '@/actions/admin/clients';

export default function ClientForm({ item, defaults }) {
  return (
    <AdminForm action={saveClient} recordId={item?.id} initialValues={item || defaults} cancelHref="/bys-panel-d10224a364/clients">
      <FormLayout aside={<PublishingSection />}>
        <FormSection title="Client details" description='Listed in the "Our Clients" grid on the About page.' icon="fa-regular fa-users">
          <TextField name="name" label="Client name" required minLength={2} maxLength={120} help="e.g. M/S Vertiv Gulf LLC" className="mb-0" />
        </FormSection>
      </FormLayout>
    </AdminForm>
  );
}
