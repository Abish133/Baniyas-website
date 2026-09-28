'use client';

import AdminForm, { FormLayout, FormSection } from '@/components/admin/form/AdminForm';
import { TextField, TextAreaField, NumberField, CheckboxField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import IconPickerField from '@/components/admin/form/IconPickerField';
import { ListField, FaqField } from '@/components/admin/form/RepeaterFields';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { saveService } from '@/actions/admin/services';

function ServiceAside() {
  return (
    <>
      <FormSection title="Visibility" description="Where this service appears." icon="fa-regular fa-eye">
        <CheckboxField name="isActive" label="Active" help="Hides the service everywhere when off." />
        <CheckboxField name="showOnHome" label="Home page slider" />
        <CheckboxField name="showOnPage" label="Services page" help="Requires the page details." />
        <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} help="Lower numbers appear first." className="mb-0" />
      </FormSection>
      <FormSection title="Slider card" description="Card in the home page services slider." icon="fa-regular fa-rectangle-history">
        <TextField name="cardTitle" label="Card title" required minLength={2} maxLength={40} />
        <IconPickerField name="icon" label="Card icon" required />
      </FormSection>
    </>
  );
}

export default function ServiceForm({ item, defaults, limits }) {
  return (
    <AdminForm action={saveService} recordId={item?.id} initialValues={item || defaults} cancelHref="/bys-panel-d10224a364/services">
      <FormLayout aside={<ServiceAside />}>
        <FormSection title="Page details" description="Heading and address of the service on the Services page." icon="fa-regular fa-file-lines">
          <div className="row">
            <div className="col-md-7">
              <TextField name="title" label="Page title" required minLength={2} maxLength={80} help="Sidebar link and heading." />
            </div>
            <div className="col-md-5">
              <TextField name="slug" label="URL slug" maxLength={120} pattern="[a-z0-9]+(-[a-z0-9]+)*" help="Auto-generated from the title when empty." />
            </div>
          </div>
          <ImageField name="image" label="Main image" rules={IMAGE_RULES.serviceMain} currentUrl={item?.image} />
        </FormSection>

        <FormSection title="Content" description="Paragraphs in the order they appear on the page." icon="fa-regular fa-align-left">
          <TextAreaField name="description1" label="Intro paragraph" maxLength={2000} rows={4} />
          <TextAreaField name="description2" label="Second paragraph" maxLength={2000} rows={3} />
          <TextField name="subtitle" label="Sub heading" maxLength={150} />
          <TextAreaField name="mainContent" label="Main content" maxLength={3000} rows={5} />
          <div className="row">
            <div className="col-xxl-6">
              <ImageField name="detailImage1" label="Detail image (left)" rules={IMAGE_RULES.serviceDetail} currentUrl={item?.detailImage1} removable />
            </div>
            <div className="col-xxl-6">
              <ImageField name="detailImage2" label="Detail image (right)" rules={IMAGE_RULES.serviceDetail} currentUrl={item?.detailImage2} removable />
            </div>
          </div>
          <TextAreaField name="finalDescription" label="Closing paragraph" maxLength={2000} rows={3} className="mb-0" />
        </FormSection>

        <FormSection title="Benefits & FAQs" icon="fa-regular fa-list-check">
          <ListField name="benefits" label="Benefits (check-mark list)" max={limits.benefits} itemMaxLength={200} />
          <FaqField name="faqs" label="Commonly asked questions" max={limits.faqs} />
        </FormSection>
      </FormLayout>
    </AdminForm>
  );
}
