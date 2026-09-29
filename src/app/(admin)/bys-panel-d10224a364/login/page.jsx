import Link from 'next/link';
import LoginForm from '@/components/admin/LoginForm';

export const metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;
  return (
    <main className="admin-login">
      <section className="admin-login__visual" aria-hidden="true">
        <div className="admin-login__brand">
          <img src="/assets/img/logo.webp" alt="" />
          <span>
            Bani Yas
            <small>Building Contg. LLC</small>
          </span>
        </div>
        <div className="admin-login__quote">
          <h2>Shaping futures,<br />built to last.</h2>
          <p>Manage services, projects, careers and enquiries for the Bani Yas website from one place.</p>
        </div>
      </section>
      <section className="admin-login__panel">
        <div className="admin-login__card">
          <img src="/assets/img/logo.webp" alt="Bani Yas" className="admin-login__logo" />
          <h1>Welcome back</h1>
          <p className="admin-login__lead">Sign in to the content manager.</p>
          <LoginForm next={typeof next === 'string' ? next : ''} />
          <Link href="/" className="admin-login__back">
            <i className="fa-regular fa-arrow-left me-2"></i>Back to website
          </Link>
        </div>
      </section>
    </main>
  );
}
