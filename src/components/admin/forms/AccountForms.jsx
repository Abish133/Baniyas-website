'use client';

import AdminForm from '@/components/admin/form/AdminForm';
import { TextField } from '@/components/admin/form/fields';
import { updateProfile, changePassword } from '@/actions/admin/auth';

export function ProfileForm({ admin }) {
  return (
    <AdminForm action={updateProfile} initialValues={admin} submitLabel="Update profile" stickyActions={false}>
      <TextField name="name" label="Name" required minLength={2} maxLength={80} />
      <TextField name="email" label="Email" type="email" required maxLength={191} className="mb-0" />
    </AdminForm>
  );
}

export function PasswordForm() {
  return (
    <AdminForm action={changePassword} submitLabel="Change password" stickyActions={false}>
      <TextField name="currentPassword" label="Current password" type="password" required maxLength={128} />
      <div className="row">
        <div className="col-md-6">
          <TextField name="newPassword" label="New password" type="password" required minLength={8} maxLength={64} help="8–64 characters, with at least one letter and one number." />
        </div>
        <div className="col-md-6">
          <TextField name="confirmPassword" label="Confirm new password" type="password" required minLength={8} maxLength={64} className="mb-0" />
        </div>
      </div>
    </AdminForm>
  );
}
