'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** Theme loader: rendered on the server and removed as soon as the page has hydrated. */
export default function Preloader() {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  if (hydrated) return null;
  return (
    <div className="theme-loader">
      <div className="spinner">
        <div className="spinner-bounce one"></div>
        <div className="spinner-bounce two"></div>
        <div className="spinner-bounce three"></div>
      </div>
    </div>
  );
}
