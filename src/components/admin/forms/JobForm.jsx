'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextField, TextAreaField, NumberField, CheckboxField } from '@/components/admin/form/fields';
import { saveJob } from '@/actions/admin/jobs';

export default function JobForm({ item, defaults }) {
  return (
    <AdminForm action={saveJob} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/jobs">
      <div className="card admin-card">
        <div className="card-body row">
          <div className="col-md-8">
            <TextField name="title" label="Job title" required minLength={2} maxLength={100} />
          </div>
          <div className="col-md-4">
            <TextField name="jobType" label="Job type" required minLength={2} maxLength={40} help="e.g. Full-time" />
          </div>
          <div className="col-md-6">
            <TextField name="location" label="Location" required minLength={2} maxLength={100} help="e.g. RAK, UAE" />
          </div>
          <div className="col-md-6">
            <TextField name="experience" label="Experience" required minLength={2} maxLength={60} help="e.g. 3+ Years Experience" />
          </div>
          <div className="col-12">
            <TextAreaField name="requirements" label="Requirements" maxLength={1500} rows={5} help="One requirement per line (max 10 lines, 150 characters each)." />
          </div>
          <div className="col-md-6">
            <TextField name="applyLink" label="Apply link" maxLength={255} help="Optional. https://…, mailto:… or a site path. Defaults to the contact page." placeholder="/contact" />
          </div>
          <div className="col-md-3">
            <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} />
          </div>
          <div className="col-md-3 pt-md-4">
            <CheckboxField name="isActive" label="Show on website" />
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
