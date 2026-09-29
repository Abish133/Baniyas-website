'use client';

import AdminForm, { FormLayout, FormSection } from '@/components/admin/form/AdminForm';
import { TextField, NumberField } from '@/components/admin/form/fields';
import PublishingSection from './PublishingSection';
import { saveHomeStat } from '@/actions/admin/stats';
import { ADMIN_BASE } from '@/lib/admin-path';

export default function HomeStatForm({ item, defaults }) {
  return (
    <AdminForm action={saveHomeStat} recordId={item?.id} initialValues={item || defaults} cancelHref={`${ADMIN_BASE}/stats`}>
      <FormLayout aside={<PublishingSection activeHelp="Maximum 3 counters can be visible (3-column layout)." />}>
        <FormSection title="Counter" description='Animated figure in the home page "About" section, e.g. 35+ Complete Projects.' icon="fa-regular fa-chart-simple">
          <div className="row">
            <div className="col-sm-5 col-lg-4">
              <NumberField name="value" label="Number" required min={0} max={999999} help="Animated from 0 when scrolled into view." />
            </div>
            <div className="col-sm-3 col-lg-2">
              <TextField name="suffix" label="Suffix" maxLength={5} help="e.g. + or %" />
            </div>
            <div className="col-sm-4 col-lg-6">
              <TextField name="label" label="Label" required minLength={2} maxLength={40} help="e.g. Complete Projects" />
            </div>
          </div>
        </FormSection>
      </FormLayout>
    </AdminForm>
  );
}
