'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Toast from './Toast';

const MESSAGES = {
  created: ['success', 'Created', 'The website is updated.'],
  updated: ['success', 'Changes saved', 'The website is updated.'],
  deleted: ['success', 'Deleted', 'The item was removed.'],
  allread: ['success', 'All caught up', 'Every message is marked as read.'],
  selfdelete: ['warning', 'Not allowed', 'You cannot delete your own account. Ask another admin to do it.'],
  lastadmin: ['warning', 'Not allowed', 'This is the only admin account, so it cannot be deleted.'],
  activated: ['success', 'Now visible', 'The item is shown on the website.'],
  deactivated: ['neutral', 'Hidden', 'The item is hidden from the website.'],
  limit: ['warning', 'Limit reached', 'The maximum number of visible items for this section is reached. Hide another item first.'],
  incomplete: ['warning', 'Details missing', 'This service needs a main image and details before it can be shown on the services page. Edit it first.'],
};

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
    if (!toastId) return;
    const url = new URL(window.location.href);
    if (url.searchParams.has('status')) {
      url.searchParams.delete('status');
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }, [toastId]);

  const close = useCallback(() => setToast(null), []);

  if (!toast) return null;
  const [tone, title, text] = MESSAGES[toast.status];
  return <Toast key={toast.id} tone={tone} title={title} text={text} onClose={close} />;
}
