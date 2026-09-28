'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Tab switches fire both "visibilitychange" and "focus"; refresh once.
const MIN_INTERVAL = 2000;

/**
 * Keeps an open page in sync with the admin panel: re-fetches the server-rendered
 * content when the tab becomes active again, when the page comes back from the
 * browser's back/forward cache, and after back/forward navigation (which Next.js
 * otherwise serves from its client-side router cache).
 */
export default function LiveContentRefresh() {
  const router = useRouter();

  useEffect(() => {
    let last = Date.now();
    let timer;
    const refresh = (force = false) => {
      if (!force && Date.now() - last < MIN_INTERVAL) return;
      last = Date.now();
      router.refresh();
    };

    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };
    const onPageShow = (event) => {
      if (event.persisted) refresh(true);
    };
    // Let the router finish restoring the cached page first.
    const onPopState = () => {
      clearTimeout(timer);
      timer = setTimeout(() => refresh(true), 0);
    };

    document.addEventListener('visibilitychange', onVisible);
    window.addEventListener('focus', onVisible);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('popstate', onPopState);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisible);
      window.removeEventListener('focus', onVisible);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('popstate', onPopState);
    };
  }, [router]);

  return null;
}
