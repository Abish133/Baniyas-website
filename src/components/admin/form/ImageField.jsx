'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Field from './Field';
import { useFormField } from './AdminForm';
import { checkImage, describeRules } from '@/lib/validation/image-rules';

function readDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight, url });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('unreadable'));
    };
    img.src = url;
  });
}

/**
 * File input with instant validation (type, size, width/height, aspect ratio)
 * against the section's rules, plus preview of the current and new image.
 */
export default function ImageField({ name, label, rules, currentUrl, required, removable = false, previewClass = '' }) {
  const id = useId();
  const inputRef = useRef(null);
  const { error: serverError } = useFormField(name);
  const [preview, setPreview] = useState(null);
  const [clientError, setClientError] = useState(null);
  const [removed, setRemoved] = useState(false);

  useEffect(() => () => preview && URL.revokeObjectURL(preview.url), [preview]);

  async function handleChange(event) {
    const input = event.target;
    const file = input.files?.[0];
    setClientError(null);
    input.setCustomValidity('');
    setPreview(null);
    if (!file) return;
    try {
      const info = await readDimensions(file);
      const problem = checkImage({ size: file.size, type: file.type, width: info.width, height: info.height }, rules);
      if (problem) {
        URL.revokeObjectURL(info.url);
        setClientError(problem);
        input.setCustomValidity(problem);
        return;
      }
      setPreview({ ...info, size: file.size });
    } catch {
      const problem = `${rules.label} could not be read. Please choose a JPG, PNG or WEBP image.`;
      setClientError(problem);
      input.setCustomValidity(problem);
    }
  }

  function clearSelection() {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.setCustomValidity('');
    }
    setPreview(null);
    setClientError(null);
  }

  const error = clientError || serverError;
  const showCurrent = currentUrl && !preview && !removed;

  return (
    <Field id={id} label={label} required={required && !currentUrl} help={describeRules(rules)} error={error}>
      <div className="image-field">
        <div className={`image-field__preview ${previewClass}`}>
          {preview ? (
            <img src={preview.url} alt="New image preview" />
          ) : showCurrent ? (
            <img src={currentUrl} alt="Current image" />
          ) : (
            <span className="text-muted small">
              <i className="fa-regular fa-image fa-2x d-block mb-1"></i>No image
            </span>
          )}
        </div>
        <div className="image-field__controls">
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="file"
            accept={rules.types.join(',')}
            required={required && !currentUrl}
            className={`form-control${error ? ' is-invalid' : ''}`}
            onChange={handleChange}
          />
          {preview && (
            <div className="small text-success mt-2">
              <i className="fa-solid fa-circle-check me-1"></i>
              {preview.width}×{preview.height} px · {(preview.size / 1024).toFixed(0)} KB — looks good.
              <button type="button" className="btn btn-link btn-sm p-0 ms-2" onClick={clearSelection}>
                Undo
              </button>
            </div>
          )}
          {showCurrent && <div className="small text-muted mt-2">Leave empty to keep the current image.</div>}
          {removable && currentUrl && !preview && (
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                id={`${id}-remove`}
                name={`remove_${name}`}
                checked={removed}
                onChange={(e) => setRemoved(e.target.checked)}
              />
              <label className="form-check-label small" htmlFor={`${id}-remove`}>
                Remove this image
              </label>
            </div>
          )}
        </div>
      </div>
    </Field>
  );
}
