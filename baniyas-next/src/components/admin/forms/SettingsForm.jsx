'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { saveSettings } from '@/actions/admin/settings';

export default function SettingsForm({ settings }) {
  return (
    <AdminForm action={saveSettings} initialValues={settings} submitLabel="Save headings">
      <div className="card admin-card mb-4">
        <div className="card-header">Home page</div>
        <div className="card-body row">
          <div className="col-md-6">
            <TextField name="home.trusted_clients_title" label="Trusted clients heading" required minLength={2} maxLength={40} />
          </div>
          <div className="col-md-6">
            <TextField name="home.services_subtitle" label="Services badge text" required minLength={2} maxLength={40} />
          </div>
          <div className="col-12">
            <TextField name="home.services_title" label="Services heading" required minLength={2} maxLength={80} />
            <ImageField name="home.services_image" label="Services section image" rules={IMAGE_RULES.servicesSection} currentUrl={settings['home.services_image']} />
          </div>
        </div>
      </div>
      <div className="card admin-card mb-4">
        <div className="card-header">About page — clients section</div>
        <div className="card-body row">
          <div className="col-md-6">
            <TextField name="about.clients_subtitle" label="Badge text" required minLength={2} maxLength={30} />
          </div>
          <div className="col-md-6">
            <TextField name="about.clients_title" label="Heading" required minLength={2} maxLength={60} />
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
