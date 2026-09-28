'use client';

import BrandLogo from './BrandLogo';
import SocialLinks from './SocialLinks';
import { useSiteUI } from './SiteUIProvider';
import AddressLines from '@/components/site/common/AddressLines';

/** Off-canvas "hamburger" sidebar + mobile menu popup. */
export default function SidebarPopup({ contact }) {
  const { sidebarOpen, setSidebarOpen } = useSiteUI();
  return (
    <>
      <div className={`header__area-menubar-right-sidebar-popup${sidebarOpen ? ' active' : ''}`}>
        <div className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
          <i className="fal fa-times"></i>
        </div>
        <BrandLogo />
        <p>Redefining the construction industry with innovative solutions, cuttin-edge technology and sustainable practices</p>
        <div className="header__area-menubar-right-sidebar-popup-contact">
          <h4 className="mb-30">Address</h4>
          <div className="header__area-menubar-right-sidebar-popup-contact-item">
            <div className="header__area-menubar-right-sidebar-popup-contact-item-icon">
              <i className="flaticon-location-1"></i>
            </div>
            <div className="header__area-menubar-right-sidebar-popup-contact-item-content">
              <span>Location:</span>
              <h6>
                <a href={contact.mapUrl} target="_blank" rel="noreferrer">
                  <AddressLines lines={contact.addressLines} />
                </a>
              </h6>
            </div>
          </div>
          <div className="header__area-menubar-right-sidebar-popup-contact-item">
            <div className="header__area-menubar-right-sidebar-popup-contact-item-icon">
              <i className="flaticon-phone"></i>
            </div>
            <div className="header__area-menubar-right-sidebar-popup-contact-item-content">
              <span>Telephone Number:</span>
              <h6><a href={contact.telephone.href}>{contact.telephone.label}</a></h6>
            </div>
          </div>
          {contact.mobile && (
            <div className="header__area-menubar-right-sidebar-popup-contact-item">
              <div className="header__area-menubar-right-sidebar-popup-contact-item-icon">
                <i className="flaticon-phone"></i>
              </div>
              <div className="header__area-menubar-right-sidebar-popup-contact-item-content">
                <span>Mobile Number:</span>
                <h6><a href={contact.mobile.href}>{contact.mobile.label}</a></h6>
              </div>
            </div>
          )}
          <div className="header__area-menubar-right-sidebar-popup-contact-item">
            <div className="header__area-menubar-right-sidebar-popup-contact-item-icon">
              <i className="flaticon-email-3"></i>
            </div>
            <div className="header__area-menubar-right-sidebar-popup-contact-item-content">
              <span>Email Address:</span>
              <h6><a href={contact.email.href}>{contact.email.label}</a></h6>
            </div>
          </div>
        </div>
        <SocialLinks className="header__area-menubar-right-sidebar-popup-social" links={contact.socialLinks} />
      </div>
      <div className={`sidebar-overlay${sidebarOpen ? ' show' : ''}`} onClick={() => setSidebarOpen(false)}></div>
    </>
  );
}
