'use client';

import { createContext, useActionState, useContext } from 'react';
import Link from 'next/link';

const FormContext = createContext({ errors: {}, values: {} });

export function useFormField(name) {
  const { errors, values } = useContext(FormContext);
  return { error: errors?.[name], value: values?.[name] };
}

/**
 * Wraps a Server Action form: shows the server message, feeds field errors and the
 * submitted values back into the fields (so nothing typed is lost on a validation error).
 */
export default function AdminForm({ action, initialValues = {}, recordId, submitLabel = 'Save', cancelHref, children }) {
  const [state, formAction, pending] = useActionState(
    async (previous, formData) => ({ ...(await action(previous, formData)), nonce: Date.now() }),
    { ok: null, errors: {}, values: null, nonce: 0 }
  );

  const values = state.values ? { ...initialValues, ...state.values } : initialValues;
  const errorCount = Object.keys(state.errors || {}).length;

  return (
    <FormContext value={{ errors: state.errors || {}, values }}>
      <form action={formAction} className="admin-form">
        {state.message && (
          <div className={`alert ${state.ok ? 'alert-success' : 'alert-danger'}`} role="alert">
            <i className={`fa-solid ${state.ok ? 'fa-circle-check' : 'fa-triangle-exclamation'} me-2`}></i>
            {state.message}
            {!state.ok && errorCount > 0 && <span className="ms-1">({errorCount} field{errorCount > 1 ? 's' : ''})</span>}
          </div>
        )}
        {recordId && <input type="hidden" name="id" value={recordId} />}
        {/* Re-mount the fields after each response so defaults reflect the submitted values. */}
        <div key={state.nonce}>{children}</div>
        <div className="admin-form__actions">
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>Saving…
              </>
            ) : (
              <>
                <i className="fa-solid fa-floppy-disk me-2"></i>
                {submitLabel}
              </>
            )}
          </button>
          {cancelHref && (
            <Link href={cancelHref} className="btn btn-outline-secondary">
              Cancel
            </Link>
          )}
        </div>
      </form>
    </FormContext>
  );
}
