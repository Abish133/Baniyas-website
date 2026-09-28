'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Field from './Field';
import { useFormField } from './AdminForm';
import { describeVideoRules } from '@/lib/validation/image-rules';

/** Video upload with size/type check and a preview of the current and new video. */
export default function VideoField({ name, label, rules, currentUrl }) {
  const id = useId();
  const inputRef = useRef(null);
  const { error: serverError } = useFormField(name);
  const [preview, setPreview] = useState(null);
  const [clientError, setClientError] = useState(null);

  useEffect(() => () => preview && URL.revokeObjectURL(preview.url), [preview]);

  function handleChange(event) {
    const input = event.target;
    const file = input.files?.[0];
    setClientError(null);
    input.setCustomValidity('');
    setPreview(null);
    if (!file) return;
    let problem = null;
    if (!rules.types.includes(file.type)) problem = `${rules.label} must be an MP4 or WEBM video.`;
    else if (file.size > rules.maxSizeMB * 1024 * 1024) {
      problem = `${rules.label} must be ${rules.maxSizeMB} MB or smaller (selected file is ${(file.size / 1024 / 1024).toFixed(1)} MB).`;
    }
    if (problem) {
      setClientError(problem);
      input.setCustomValidity(problem);
      return;
    }
    setPreview({ url: URL.createObjectURL(file), size: file.size });
  }

  function clearSelection() {
    if (inputRef.current) inputRef.current.value = '';
    setPreview(null);
    setClientError(null);
  }

  const error = clientError || serverError;
  const src = preview?.url || currentUrl;

  return (
    <Field id={id} label={label} help={describeVideoRules(rules)} error={error}>
      <div className="image-field">
        <div className="image-field__preview">
          {src ? (
            <>
              <video key={src} src={src} muted loop autoPlay playsInline controls preload="metadata" />
              <span className={`image-field__tag${preview ? ' image-field__tag--new' : ''}`}>{preview ? 'New' : 'Current'}</span>
            </>
          ) : (
            <span className="image-field__empty">
              <i className="fa-regular fa-film"></i>
              No video yet
            </span>
          )}
        </div>
        <div className="image-field__controls">
          <input ref={inputRef} id={id} name={name} type="file" accept={rules.types.join(',')} className={`form-control${error ? ' is-invalid' : ''}`} onChange={handleChange} />
          {preview && (
            <div className="small text-success mt-2">
              <i className="fa-solid fa-circle-check me-1"></i>
              {(preview.size / 1024 / 1024).toFixed(1)} MB — looks good.
              <button type="button" className="btn btn-link btn-sm p-0 ms-2" onClick={clearSelection}>
                Undo
              </button>
            </div>
          )}
          {currentUrl && !preview && <div className="small text-muted mt-2">Leave empty to keep the current video.</div>}
        </div>
      </div>
    </Field>
  );
}
