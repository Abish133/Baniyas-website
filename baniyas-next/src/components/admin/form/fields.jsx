'use client';

import { useId, useState } from 'react';
import Field, { CharCounter } from './Field';
import { useFormField } from './AdminForm';

const toText = (value) => (value === null || value === undefined ? '' : String(value));

export function TextField({ name, label, required, minLength, maxLength, help, type = 'text', placeholder, pattern, className }) {
  const id = useId();
  const { error, value } = useFormField(name);
  const [length, setLength] = useState(toText(value).length);
  return (
    <Field id={id} label={label} required={required} help={help} error={error} className={className} counter={<CharCounter length={length} max={maxLength} />}>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={toText(value)}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        placeholder={placeholder}
        className={`form-control${error ? ' is-invalid' : ''}`}
        onChange={(e) => setLength(e.target.value.length)}
      />
    </Field>
  );
}

export function TextAreaField({ name, label, required, minLength, maxLength, help, rows = 4, placeholder, className }) {
  const id = useId();
  const { error, value } = useFormField(name);
  const [length, setLength] = useState(toText(value).length);
  return (
    <Field id={id} label={label} required={required} help={help} error={error} className={className} counter={<CharCounter length={length} max={maxLength} />}>
      <textarea
        id={id}
        name={name}
        rows={rows}
        defaultValue={toText(value)}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`form-control${error ? ' is-invalid' : ''}`}
        onChange={(e) => setLength(e.target.value.length)}
      />
    </Field>
  );
}

export function NumberField({ name, label, required, min, max, help, className }) {
  const id = useId();
  const { error, value } = useFormField(name);
  return (
    <Field id={id} label={label} required={required} help={help} error={error} className={className}>
      <input
        id={id}
        name={name}
        type="number"
        inputMode="numeric"
        step="1"
        min={min}
        max={max}
        required={required}
        defaultValue={toText(value)}
        className={`form-control${error ? ' is-invalid' : ''}`}
      />
    </Field>
  );
}

export function CheckboxField({ name, label, help, className }) {
  const id = useId();
  const { error, value } = useFormField(name);
  return (
    <div className={`mb-3 ${className || ''}`}>
      <div className="form-check form-switch">
        <input
          id={id}
          name={name}
          type="checkbox"
          role="switch"
          className={`form-check-input${error ? ' is-invalid' : ''}`}
          defaultChecked={value === true || value === 'on'}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
      {help && <div className="form-text">{help}</div>}
    </div>
  );
}
