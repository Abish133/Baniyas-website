'use client';

import Link from 'next/link';
import BrandLogo from './BrandLogo';
import NavMenu from './NavMenu';
import { useSiteUI } from './SiteUIProvider';

/**
 * variant="home"  -> transparent header over the video banner (header__four)
 * variant="inner" -> header used on every inner page (header__area two)
 */
export default function Header({ variant = 'inner' }) {
  const { setSidebarOpen, mobileMenuOpen, setMobileMenuOpen } = useSiteUI();
  const isHome = variant === 'home';

  const button = (
    <Link className="build_button" href="/contact">
      Get Started<i className="flaticon-right-up"></i>
    </Link>
  );

  return (
    <div className={isHome ? 'header__four' : 'header__area two'}>
      <div className="custom_container">
        <div className="header__area-menubar">
          <div className="header__area-menubar-left one">
            <BrandLogo />
          </div>
          <div className="header__area-menubar-center">
            <div className="header__area-menubar-center-menu">
              <NavMenu id="mobilemenu" />
            </div>
          </div>
          <div className="header__area-menubar-right">
            <div className="header__area-menubar-right-btn one">
              {isHome ? <div className="item_bounce">{button}</div> : button}
            </div>
            <div className="header__area-menubar-right-sidebar">
              <div className="header__area-menubar-right-sidebar-icon" onClick={() => setSidebarOpen(true)}>
                <i className="flaticon-menu-6"></i>
              </div>
            </div>
            <div className="header__area-menubar-right-responsive-menu menu__bar">
              <i
                className={`flaticon-menu-3${mobileMenuOpen ? ' clicked' : ''}`}
                onClick={() => setMobileMenuOpen((open) => !open)}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
