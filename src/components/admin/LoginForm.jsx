'use client';

import { useActionState } from 'react';
import { login } from '@/actions/admin/auth';

export default function LoginForm({ next }) {
  const [state, formAction, pending] = useActionState(login, { ok: null, errors: {}, values: {} });
  const errors = state?.errors || {};
  return (
    <form action={formAction} noValidate={false}>
      {state?.message && (
        <div className="alert alert-danger py-2" role="alert">
          {state.message}
        </div>
      )}
      <input type="hidden" name="next" value={next || ''} />
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          maxLength={191}
          defaultValue={state?.values?.email || ''}
          className={`form-control form-control-lg${errors.email ? ' is-invalid' : ''}`}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={128}
          className={`form-control form-control-lg${errors.password ? ' is-invalid' : ''}`}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary btn-lg w-100" disabled={pending}>
        {pending ? <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> : <i className="fa-solid fa-right-to-bracket me-2"></i>}
        Sign in
      </button>
    </form>
  );
}
