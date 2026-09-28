'use client';

import { useActionState } from 'react';
import { login } from '@/actions/admin/auth';

export default function LoginForm({ next }) {
  const [state, formAction, pending] = useActionState(login, { ok: null, errors: {}, values: {} });
  const errors = state?.errors || {};
  return (
    <form action={formAction} className="admin-form">
      {state?.message && (
        <div className="admin-alert admin-alert--danger" role="alert">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <div>{state.message}</div>
        </div>
      )}
      <input type="hidden" name="next" value={next || ''} />
      <div className="admin-field">
        <label htmlFor="email" className="form-label">Email</label>
        <div className="admin-input-icon">
          <i className="fa-regular fa-at"></i>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            maxLength={191}
            placeholder="you@company.com"
            defaultValue={state?.values?.email || ''}
            className={`form-control form-control-lg${errors.email ? ' is-invalid' : ''}`}
          />
        </div>
        {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
      </div>
      <div className="admin-field">
        <label htmlFor="password" className="form-label">Password</label>
        <div className="admin-input-icon">
          <i className="fa-regular fa-lock"></i>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={128}
            placeholder="••••••••"
            className={`form-control form-control-lg${errors.password ? ' is-invalid' : ''}`}
          />
        </div>
        {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary btn-lg w-100 mt-2" disabled={pending}>
        {pending ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : <i className="fa-regular fa-right-to-bracket me-2"></i>}
        Sign in
      </button>
    </form>
  );
}
