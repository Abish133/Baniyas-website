'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextField, NumberField, CheckboxField } from '@/components/admin/form/fields';
import { saveHomeStat } from '@/actions/admin/stats';

export default function HomeStatForm({ item, defaults }) {
  return (
    <AdminForm action={saveHomeStat} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/stats">
      <div className="card admin-card">
        <div className="card-body row">
          <div className="col-sm-4">
            <NumberField name="value" label="Number" required min={0} max={999999} help="Animated from 0 when scrolled into view." />
          </div>
          <div className="col-sm-2">
            <TextField name="suffix" label="Suffix" maxLength={5} help="e.g. + or %" />
          </div>
          <div className="col-sm-6">
            <TextField name="label" label="Label" required minLength={2} maxLength={40} help="e.g. Complete Projects" />
          </div>
          <div className="col-sm-4">
            <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} />
          </div>
          <div className="col-sm-8 pt-sm-4">
            <CheckboxField name="isActive" label="Show on website" help="Maximum 3 counters can be visible (3-column layout)." />
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
