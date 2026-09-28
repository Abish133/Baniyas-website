'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextField, NumberField, CheckboxField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { saveTrustedClient } from '@/actions/admin/trusted-clients';

export default function TrustedClientForm({ item, defaults }) {
  return (
    <AdminForm action={saveTrustedClient} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/trusted-clients">
      <div className="card admin-card">
        <div className="card-body row">
          <div className="col-lg-7">
            <TextField name="name" label="Client name" required minLength={2} maxLength={120} help="Used as the logo's alt text (not shown visually)." />
            <div className="row">
              <div className="col-sm-6">
                <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} help="Lower numbers appear first." />
              </div>
              <div className="col-sm-6 pt-sm-4">
                <CheckboxField name="isActive" label="Show on website" />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <ImageField name="logo" label="Logo" rules={IMAGE_RULES.trustedClientLogo} currentUrl={item?.logo} required previewClass="image-field__preview--dark" />
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
