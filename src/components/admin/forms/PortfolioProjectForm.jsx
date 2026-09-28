'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextAreaField, NumberField, CheckboxField } from '@/components/admin/form/fields';
import ImageField from '@/components/admin/form/ImageField';
import { IMAGE_RULES } from '@/lib/validation/image-rules';
import { savePortfolioProject } from '@/actions/admin/portfolio';

export default function PortfolioProjectForm({ item, defaults }) {
  return (
    <AdminForm action={savePortfolioProject} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/portfolio">
      <div className="card admin-card">
        <div className="card-body row">
          <div className="col-lg-6">
            <TextAreaField name="caption" label="Caption" required minLength={3} maxLength={200} rows={3} help="Shown over the image on hover, e.g. EMBOSAL STEEL MILL - ALGAIL" />
            <div className="row">
              <div className="col-sm-6">
                <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} />
              </div>
              <div className="col-sm-6 pt-sm-4">
                <CheckboxField name="isActive" label="Show on website" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <ImageField name="image" label="Project image" rules={IMAGE_RULES.portfolioProject} currentUrl={item?.image} required />
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
