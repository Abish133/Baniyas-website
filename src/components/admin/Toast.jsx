'use client';

import { useEffect } from 'react';

const ICONS = {
  success: 'fa-solid fa-circle-check',
  neutral: 'fa-solid fa-eye-slash',
  warning: 'fa-solid fa-triangle-exclamation',
};

export const TOAST_DURATION = 5000;

/**
 * The admin's toast notification (top right, closes itself after 5 s).
 * Give it a new `key` to show the same message again.
 */
export default function Toast({ tone = 'success', title, text, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`admin-toast admin-toast--${tone}`} role="status" aria-live="polite">
      <i className={`${ICONS[tone]} admin-toast__icon`}></i>
      <div className="admin-toast__body">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <button type="button" className="admin-toast__close" onClick={onClose} aria-label="Dismiss">
        <i className="fa-solid fa-xmark"></i>
      </button>
      <span className="admin-toast__progress" style={{ animationDuration: `${TOAST_DURATION}ms` }}></span>
    </div>
  );
}
