/** Label + help + error wrapper used by every admin input. */
export default function Field({ id, label, required, help, error, counter, children, className = '' }) {
  return (
    <div className={`admin-field ${className}`}>
      {label && (
        <div className="d-flex justify-content-between align-items-end">
          <label htmlFor={id} className="form-label">
            {label}
            {required && <span className="text-danger ms-1">*</span>}
          </label>
          {counter}
        </div>
      )}
      {children}
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {help && <div className="form-text">{help}</div>}
    </div>
  );
}

export function CharCounter({ length, max }) {
  if (!max) return null;
  const tone = length > max ? 'text-danger' : length > max * 0.9 ? 'text-warning' : 'text-muted';
  return (
    <small className={`char-counter ${tone}`}>
      {length}/{max}
    </small>
  );
}
