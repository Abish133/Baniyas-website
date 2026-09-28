'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

const SiteUIContext = createContext(null);

/** Open/closed state for the off-canvas sidebar and the mobile menu. */
export function SiteUIProvider({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close everything after navigating (the static site did a full page load).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setSidebarOpen(false);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const value = useMemo(
    () => ({ sidebarOpen, setSidebarOpen, mobileMenuOpen, setMobileMenuOpen }),
    [sidebarOpen, mobileMenuOpen]
  );
  return <SiteUIContext.Provider value={value}>{children}</SiteUIContext.Provider>;
}

export function useSiteUI() {
  const ctx = useContext(SiteUIContext);
  if (!ctx) throw new Error('useSiteUI must be used inside <SiteUIProvider>');
  return ctx;
}
