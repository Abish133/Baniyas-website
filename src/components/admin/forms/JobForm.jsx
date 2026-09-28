'use client';

import AdminForm, { FormLayout, FormSection } from '@/components/admin/form/AdminForm';
import { TextField, TextAreaField } from '@/components/admin/form/fields';
import PublishingSection from './PublishingSection';
import { saveJob } from '@/actions/admin/jobs';

export default function JobForm({ item, defaults }) {
  return (
    <AdminForm action={saveJob} recordId={item?.id} initialValues={item || defaults} cancelHref="/bys-panel-d10224a364/jobs">
      <FormLayout aside={<PublishingSection />}>
        <FormSection title="Position" description='Card in "Open Positions" on the Careers page.' icon="fa-regular fa-briefcase">
          <div className="row">
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
          </div>
        </FormSection>
        <FormSection title="Requirements & applying" icon="fa-regular fa-list-check">
          <TextAreaField name="requirements" label="Requirements" maxLength={1500} rows={6} help="One requirement per line (max 10 lines, 150 characters each)." />
          <TextField name="applyLink" label="Apply link" maxLength={255} help="Optional. https://…, mailto:… or a site path. Defaults to the contact page." placeholder="/contact" className="mb-0" />
        </FormSection>
      </FormLayout>
    </AdminForm>
  );
}
