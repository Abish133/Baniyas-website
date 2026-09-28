import LoginForm from '@/components/admin/LoginForm';

export const metadata = { title: 'Sign in' };

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;
  return (
    <main className="admin-login">
      <div className="admin-login__card card shadow-sm">
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <img src="/assets/img/logo.png" alt="Bani Yas" className="admin-login__logo" />
            <h1 className="h4 mt-2 mb-1">Bani Yas Admin</h1>
            <p className="text-muted small mb-0">Sign in to manage the website content</p>
          </div>
          <LoginForm next={typeof next === 'string' ? next : ''} />
        </div>
      </div>
    </main>
  );
}
