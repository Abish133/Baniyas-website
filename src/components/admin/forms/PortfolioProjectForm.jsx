'use client';

import AdminForm, { FormLayout, FormSection } from '@/components/admin/form/AdminForm';
import { TextAreaField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import PublishingSection from './PublishingSection';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { savePortfolioProject } from '@/actions/admin/portfolio';

export default function PortfolioProjectForm({ item, defaults }) {
  return (
    <AdminForm action={savePortfolioProject} recordId={item?.id} initialValues={item || defaults} cancelHref="/bys-panel-d10224a364/portfolio">
      <FormLayout aside={<PublishingSection />}>
        <FormSection title="Image" description="Project photo in the Portfolio page grid." icon="fa-regular fa-image">
          <ImageField name="image" label="Project image" rules={IMAGE_RULES.portfolioProject} currentUrl={item?.image} required />
        </FormSection>
        <FormSection title="Caption" icon="fa-regular fa-text">
          <TextAreaField name="caption" label="Caption" required minLength={3} maxLength={200} rows={3} help="Shown over the image on hover, e.g. EMBOSAL STEEL MILL - ALGAIL" className="mb-0" />
        </FormSection>
      </FormLayout>
    </AdminForm>
  );
}
