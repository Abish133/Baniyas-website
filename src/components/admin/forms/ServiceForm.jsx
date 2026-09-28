'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextField, TextAreaField, NumberField, CheckboxField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import IconPickerField from '@/components/admin/form/IconPickerField';
import { ListField, FaqField } from '@/components/admin/form/RepeaterFields';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { saveService } from '@/actions/admin/services';

export default function ServiceForm({ item, defaults, limits }) {
  return (
    <AdminForm action={saveService} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/services">
      <div className="card admin-card mb-4">
        <div className="card-header">Visibility &amp; home slider card</div>
        <div className="card-body row">
          <div className="col-md-4">
            <CheckboxField name="showOnHome" label="Show in home page slider" />
          </div>
          <div className="col-md-4">
            <CheckboxField name="showOnPage" label="Show on services page" help="Requires the details below." />
          </div>
          <div className="col-md-4">
            <CheckboxField name="isActive" label="Active" help="Hides the service everywhere when off." />
          </div>
          <div className="col-md-6">
            <TextField name="cardTitle" label="Slider card title" required minLength={2} maxLength={40} />
          </div>
          <div className="col-md-3">
            <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} />
          </div>
          <div className="col-12">
            <IconPickerField name="icon" label="Slider card icon" required />
          </div>
        </div>
      </div>

      <div className="card admin-card mb-4">
        <div className="card-header">Services page details</div>
        <div className="card-body row">
          <div className="col-md-8">
            <TextField name="title" label="Page title" required minLength={2} maxLength={80} help="Sidebar link and heading." />
          </div>
          <div className="col-md-4">
            <TextField name="slug" label="URL slug" maxLength={120} pattern="[a-z0-9]+(-[a-z0-9]+)*" help="Auto-generated from the title when empty." />
          </div>
          <div className="col-12">
            <ImageField name="image" label="Main image" rules={IMAGE_RULES.serviceMain} currentUrl={item?.image} />
          </div>
          <div className="col-12">
            <TextAreaField name="description1" label="Intro paragraph" maxLength={2000} rows={4} />
            <TextAreaField name="description2" label="Second paragraph" maxLength={2000} rows={3} />
            <TextField name="subtitle" label="Sub heading" maxLength={150} />
            <TextAreaField name="mainContent" label="Main content" maxLength={3000} rows={5} />
          </div>
          <div className="col-md-6">
            <ImageField name="detailImage1" label="Detail image (left)" rules={IMAGE_RULES.serviceDetail} currentUrl={item?.detailImage1} removable />
          </div>
          <div className="col-md-6">
            <ImageField name="detailImage2" label="Detail image (right)" rules={IMAGE_RULES.serviceDetail} currentUrl={item?.detailImage2} removable />
          </div>
          <div className="col-12">
            <TextAreaField name="finalDescription" label="Closing paragraph" maxLength={2000} rows={3} />
            <ListField name="benefits" label="Benefits (check-mark list)" max={limits.benefits} itemMaxLength={200} />
            <FaqField name="faqs" label="Commonly asked questions" max={limits.faqs} />
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
