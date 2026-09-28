'use client';

import { createContext, useActionState, useContext, useState } from 'react';
import Link from 'next/link';

const FormContext = createContext({ errors: {}, values: {} });

export function useFormField(name) {
  const { errors, values } = useContext(FormContext);
  return { error: errors?.[name], value: values?.[name] };
}

/**
 * Wraps a Server Action form: shows the server message, feeds field errors and the
 * submitted values back into the fields (so nothing typed is lost on a validation error).
 * `stickyActions` pins the save bar to the bottom of the screen on long forms.
 */
export default function AdminForm({ action, initialValues = {}, recordId, submitLabel = 'Save changes', cancelHref, stickyActions = true, children }) {
  const [state, formAction, pending] = useActionState(
    async (previous, formData) => ({ ...(await action(previous, formData)), nonce: Date.now() }),
    { ok: null, errors: {}, values: null, nonce: 0 }
  );
  const [dirty, setDirty] = useState(false);
  const [lastNonce, setLastNonce] = useState(state.nonce);
  if (lastNonce !== state.nonce) {
    setLastNonce(state.nonce);
    setDirty(false);
  }

  const values = state.values ? { ...initialValues, ...state.values } : initialValues;
  const errorCount = Object.keys(state.errors || {}).length;

  return (
    <FormContext value={{ errors: state.errors || {}, values }}>
      <form action={formAction} className="admin-form" onChange={() => setDirty(true)}>
        {state.message && (
          <div className={`admin-alert ${state.ok ? 'admin-alert--success' : 'admin-alert--danger'}`} role="alert">
            <i className={`fa-solid ${state.ok ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
            <div>
              {state.message}
              {!state.ok && errorCount > 0 && (
                <span className="ms-1">
                  ({errorCount} field{errorCount > 1 ? 's' : ''} need{errorCount > 1 ? '' : 's'} attention)
                </span>
              )}
            </div>
          </div>
        )}
        {recordId && <input type="hidden" name="id" value={recordId} />}
        {/* Re-mount the fields after each response so defaults reflect the submitted values. */}
        <div key={state.nonce}>{children}</div>
        <div className={`admin-form__actions${stickyActions ? ' is-sticky' : ''}`}>
          <div className="admin-form__hint">
            {pending ? (
              <span>Saving…</span>
            ) : dirty ? (
              <span className="text-warning-emphasis">
                <i className="fa-solid fa-circle-small me-1"></i>Unsaved changes
              </span>
            ) : !state.ok && errorCount > 0 ? (
              <span className="text-danger">
                <i className="fa-solid fa-circle-exclamation me-1"></i>
                {errorCount} field{errorCount > 1 ? 's' : ''} to fix
              </span>
            ) : null}
          </div>
          {cancelHref && (
            <Link href={cancelHref} className="btn btn-light">
              Cancel
            </Link>
          )}
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? (
              <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            ) : (
              <i className="fa-regular fa-floppy-disk me-2"></i>
            )}
            {submitLabel}
          </button>
        </div>
      </form>
    </FormContext>
  );
}

/** Titled card grouping related fields. */
export function FormSection({ title, description, icon, children, className = '' }) {
  return (
    <section className={`admin-card form-section ${className}`}>
      {title && (
        <header className="form-section__head">
          {icon && (
            <span className="form-section__icon">
              <i className={icon}></i>
            </span>
          )}
          <div>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
        </header>
      )}
      <div className="form-section__body">{children}</div>
    </section>
  );
}

/** Two-column editor layout: content on the left, publishing options in a sticky side column. */
export function FormLayout({ aside, children }) {
  return (
    <div className="form-layout">
      <div className="form-layout__main">{children}</div>
      {aside && <aside className="form-layout__aside">{aside}</aside>}
    </div>
  );
}
