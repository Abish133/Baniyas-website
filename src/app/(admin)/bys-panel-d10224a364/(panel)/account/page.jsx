import { requireAdmin } from '@/lib/auth/session';
import PageHeader from '@/components/admin/PageHeader';
import { FormSection } from '@/components/admin/form/AdminForm';
import { ProfileForm, PasswordForm } from '@/components/admin/forms/AccountForms';
import { initials } from '@/components/admin/nav';

export const metadata = { title: 'My Account' };

export default async function AccountPage() {
  const admin = await requireAdmin();
  const lastLogin = admin.lastLoginAt
    ? new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Dubai' }).format(new Date(admin.lastLoginAt))
    : null;

  return (
    <>
      <PageHeader title="My Account" description="Update your login details." />
      <div className="form-layout form-layout--start">
        <aside className="form-layout__aside">
          <section className="admin-card admin-profile">
            <span className="admin-avatar admin-avatar--xl">{initials(admin.name)}</span>
            <h2>{admin.name}</h2>
            <p>{admin.email}</p>
            <span className="admin-chip">
              <i className="fa-regular fa-user-shield"></i>Administrator
            </span>
            {lastLogin && <small>Last sign-in: {lastLogin}</small>}
          </section>
        </aside>
        <div className="form-layout__main">
          <FormSection title="Profile" description="Your name and the email you sign in with." icon="fa-regular fa-user">
            <ProfileForm admin={{ name: admin.name, email: admin.email }} />
          </FormSection>
          <FormSection title="Change password" description="Use a strong password you don't use elsewhere." icon="fa-regular fa-key">
            <PasswordForm />
          </FormSection>
        </div>
      </div>
    </>
  );
}
