'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const MESSAGES = {
  created: ['success', 'Created', 'The website is updated.'],
  updated: ['success', 'Changes saved', 'The website is updated.'],
  deleted: ['success', 'Deleted', 'The item was removed.'],
  activated: ['success', 'Now visible', 'The item is shown on the website.'],
  deactivated: ['neutral', 'Hidden', 'The item is hidden from the website.'],
  limit: ['warning', 'Limit reached', 'The maximum number of visible items for this section is reached. Hide another item first.'],
  incomplete: ['warning', 'Details missing', 'This service needs a main image and details before it can be shown on the services page. Edit it first.'],
};

const ICONS = {
  success: 'fa-solid fa-circle-check',
  neutral: 'fa-solid fa-eye-slash',
  warning: 'fa-solid fa-triangle-exclamation',
};

const DURATION = 5000;

/**
 * Toast for the ?status=… redirect after a save. The param is stripped from the URL so a
 * reload doesn't repeat it, and the same status arriving again shows a fresh toast.
 */
export default function StatusAlert() {
  const current = useSearchParams().get('status');
  const [toast, setToast] = useState(MESSAGES[current] ? { status: current, id: 1 } : null);
  const [seen, setSeen] = useState(current);
  if (seen !== current) {
    setSeen(current);
    if (MESSAGES[current]) setToast({ status: current, id: (toast?.id || 0) + 1 });
  }

  const toastId = toast?.id;
  useEffect(() => {
    if (!toastId) return undefined;
    const url = new URL(window.location.href);
    if (url.searchParams.has('status')) {
      url.searchParams.delete('status');
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
    const timer = setTimeout(() => setToast(null), DURATION);
    return () => clearTimeout(timer);
  }, [toastId]);

  if (!toast) return null;
  const [tone, title, text] = MESSAGES[toast.status];
  return (
    <div className={`admin-toast admin-toast--${tone}`} role="status" aria-live="polite" key={toast.id}>
      <i className={`${ICONS[tone]} admin-toast__icon`}></i>
      <div className="admin-toast__body">
        <strong>{title}</strong>
        <span>{text}</span>
      </div>
      <button type="button" className="admin-toast__close" onClick={() => setToast(null)} aria-label="Dismiss">
        <i className="fa-solid fa-xmark"></i>
      </button>
      <span className="admin-toast__progress" style={{ animationDuration: `${DURATION}ms` }}></span>
    </div>
  );
}
