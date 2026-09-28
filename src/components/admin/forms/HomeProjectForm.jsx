'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextField, NumberField, CheckboxField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { saveHomeProject } from '@/actions/admin/home-projects';

export default function HomeProjectForm({ item, defaults }) {
  return (
    <AdminForm action={saveHomeProject} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/home-projects">
      <div className="card admin-card">
        <div className="card-body row">
          <div className="col-lg-6">
            <TextField name="title" label="Project title" required minLength={2} maxLength={80} help="e.g. Embosal Steel Mill" />
            <TextField name="location" label="Location" required minLength={2} maxLength={60} help="Small text above the title, e.g. Algail" />
            <div className="row">
              <div className="col-sm-6">
                <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} />
              </div>
              <div className="col-sm-6 pt-sm-4">
                <CheckboxField name="isActive" label="Show on website" help="Up to 6 projects can be visible." />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <ImageField name="image" label="Project image" rules={IMAGE_RULES.homeProject} currentUrl={item?.image} required />
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
