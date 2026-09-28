'use client';

import BrandLogo from './BrandLogo';
import NavMenu from './NavMenu';
import { useSiteUI } from './SiteUIProvider';

export default function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useSiteUI();
  return (
    <>
      <div className={`menu__bar-popup${mobileMenuOpen ? ' show' : ''}`}>
        <BrandLogo />
        <div className="vertical-menu">
          <div className="vertical_menu">
            <NavMenu />
          </div>
        </div>
      </div>
      <div
        className={`menu__bar-popup-overlay${mobileMenuOpen ? ' show' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </>
  );
}
