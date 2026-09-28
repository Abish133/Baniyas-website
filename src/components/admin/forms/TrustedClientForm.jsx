'use client';

import AdminForm, { FormLayout, FormSection } from '@/components/admin/form/AdminForm';
import { TextField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import PublishingSection from './PublishingSection';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { saveTrustedClient } from '@/actions/admin/trusted-clients';

export default function TrustedClientForm({ item, defaults }) {
  return (
    <AdminForm action={saveTrustedClient} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/trusted-clients">
      <FormLayout aside={<PublishingSection />}>
        <FormSection title="Logo" description="Shown in the dark banner strip on the home page." icon="fa-regular fa-image">
          <ImageField name="logo" label="Logo image" rules={IMAGE_RULES.trustedClientLogo} currentUrl={item?.logo} required previewClass="image-field__preview--dark" />
        </FormSection>
        <FormSection title="Details" icon="fa-regular fa-handshake">
          <TextField name="name" label="Client name" required minLength={2} maxLength={120} help="Used as the logo's alt text (not shown visually)." className="mb-0" />
        </FormSection>
      </FormLayout>
    </AdminForm>
  );
}
