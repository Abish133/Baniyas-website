'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextField, NumberField, CheckboxField } from '@/components/admin/form/fields';
import { saveClient } from '@/actions/admin/clients';

export default function ClientForm({ item, defaults }) {
  return (
    <AdminForm action={saveClient} recordId={item?.id} initialValues={item || defaults} cancelHref="/admin/clients">
      <div className="card admin-card">
        <div className="card-body row">
          <div className="col-lg-8">
            <TextField name="name" label="Client name" required minLength={2} maxLength={120} help="e.g. M/S Vertiv Gulf LLC" />
          </div>
          <div className="col-sm-6 col-lg-2">
            <NumberField name="sortOrder" label="Sort order" required min={0} max={9999} />
          </div>
          <div className="col-sm-6 col-lg-2 pt-sm-4">
            <CheckboxField name="isActive" label="Visible" />
          </div>
        </div>
      </div>
    </AdminForm>
  );
}
