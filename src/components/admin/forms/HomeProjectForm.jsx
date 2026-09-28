'use client';

import AdminForm, { FormLayout, FormSection } from '@/components/admin/form/AdminForm';
import { TextField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import PublishingSection from './PublishingSection';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { saveHomeProject } from '@/actions/admin/home-projects';

export default function HomeProjectForm({ item, defaults }) {
  return (
    <AdminForm action={saveHomeProject} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/home-projects">
      <FormLayout aside={<PublishingSection activeHelp="Up to 6 projects can be visible." />}>
        <FormSection title="Project details" description="Hover-to-expand strip on the home page." icon="fa-regular fa-images">
          <div className="row">
            <div className="col-md-7">
              <TextField name="title" label="Project title" required minLength={2} maxLength={80} help="e.g. Embosal Steel Mill" />
            </div>
            <div className="col-md-5">
              <TextField name="location" label="Location" required minLength={2} maxLength={60} help="Small text above the title, e.g. Algail" />
            </div>
          </div>
        </FormSection>
        <FormSection title="Image" icon="fa-regular fa-image">
          <ImageField name="image" label="Project image" rules={IMAGE_RULES.homeProject} currentUrl={item?.image} required />
        </FormSection>
      </FormLayout>
    </AdminForm>
  );
}
