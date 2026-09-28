import { requireAdmin } from '@/lib/auth/session';
import PageHeader from '@/components/admin/PageHeader';
import { ProfileForm, PasswordForm } from '@/components/admin/forms/AccountForms';

export const metadata = { title: 'My Account' };

export default async function AccountPage() {
  const admin = await requireAdmin();
  return (
    <>
      <PageHeader title="My Account" description="Update your login details." />
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card admin-card">
            <div className="card-header">Profile</div>
            <div className="card-body">
              <ProfileForm admin={{ name: admin.name, email: admin.email }} />
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card admin-card">
            <div className="card-header">Change password</div>
            <div className="card-body">
              <PasswordForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
