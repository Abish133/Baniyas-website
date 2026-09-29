'use client';

import AdminForm, { FormSection } from '@/components/admin/form/AdminForm';
import { TextField } from '@/components/admin/form/fields';
import { saveAdminUser } from '@/actions/admin/users';
import { ADMIN_BASE } from '@/lib/admin-path';

export default function AdminUserForm({ item }) {
  return (
    <AdminForm action={saveAdminUser} recordId={item?.id} initialValues={item || {}} cancelHref={`${ADMIN_BASE}/users`}>
      <div className="row">
        <div className="col-xl-8">
          <FormSection
            title="Admin account"
            description="This person can sign in to the admin panel and change everything on the website."
            icon="fa-regular fa-user-shield"
          >
            <div className="row">
              <div className="col-md-6">
                <TextField name="name" label="Name" required minLength={2} maxLength={80} />
              </div>
              <div className="col-md-6">
                <TextField name="email" label="Email (used to sign in)" type="email" required maxLength={191} />
              </div>
            </div>
            <TextField
              name="password"
              label={item ? 'New password' : 'Password'}
              type="password"
              required={!item}
              minLength={8}
              maxLength={64}
              help={
                item
                  ? 'Leave empty to keep the current password. 8–64 characters, with at least one letter and one number.'
                  : '8–64 characters, with at least one letter and one number. Share it with the person securely; they can change it under My Account.'
              }
              className="mb-0"
            />
          </FormSection>
        </div>
      </div>
    </AdminForm>
  );
}
