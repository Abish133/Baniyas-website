'use client';

import AdminForm, { FormSection } from '@/components/admin/form/AdminForm';
import { TextField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { saveSettings } from '@/actions/admin/settings';

export default function SettingsForm({ settings }) {
  return (
    <AdminForm action={saveSettings} initialValues={settings} submitLabel="Save headings">
      <div className="row g-4">
        <div className="col-xl-7">
          <FormSection title="Home page" description="Trusted clients strip and the services section." icon="fa-regular fa-house">
            <div className="row">
              <div className="col-md-6">
                <TextField name="home.trusted_clients_title" label="Trusted clients heading" required minLength={2} maxLength={40} />
              </div>
              <div className="col-md-6">
                <TextField name="home.services_subtitle" label="Services badge text" required minLength={2} maxLength={40} />
              </div>
            </div>
            <TextField name="home.services_title" label="Services heading" required minLength={2} maxLength={80} />
            <ImageField name="home.services_image" label="Services section image" rules={IMAGE_RULES.servicesSection} currentUrl={settings['home.services_image']} />
          </FormSection>
        </div>
        <div className="col-xl-5">
          <FormSection title="About page" description="Clients section at the bottom of the About page." icon="fa-regular fa-building">
            <TextField name="about.clients_subtitle" label="Badge text" required minLength={2} maxLength={30} />
            <TextField name="about.clients_title" label="Heading" required minLength={2} maxLength={60} className="mb-0" />
          </FormSection>
        </div>
      </div>
    </AdminForm>
  );
}
