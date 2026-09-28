import Link from 'next/link';
import { CONTACT, MAP_URL } from '@/lib/constants/site';

export function FooterAddress({ prefix }) {
  return (
    <div className={`${prefix}-widget address`}>
      <h4>Address</h4>
      <div className={`${prefix}-widget-address`}>
        <h6>
          <a href={MAP_URL} target="_blank" rel="noreferrer">
            Post Box No.9962, Unit No:301,
            <br />
            Emirates Islamic Tower,
            <br />
            Al Nakheel, RAK-UAE
          </a>
        </h6>
        <br />
        <h6><a href={CONTACT.telephone.href}>{CONTACT.telephone.label}</a></h6>
        <br />
        <h6><a href={CONTACT.mobile.href}>{CONTACT.mobile.label}</a></h6>
      </div>
    </div>
  );
}

export function FooterQuickLinks({ prefix }) {
  return (
    <div className={`${prefix}-widget ml-40 lg-ml-0`}>
      <h4>Quick links</h4>
      <div className="footer-widget-menu">
        <ul>
          <li><Link href="/about">About Us</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/portfolio">Portfolio</Link></li>
          <li><Link href="/careers">Careers</Link></li>
          <li><Link href="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </div>
  );
}

export function FooterSupport({ prefix }) {
  return (
    <div className={`${prefix}-widget address`}>
      <h4>Support</h4>
      <div className="footer-widget-menu">
        <ul>
          <li><Link href="/contact">Term &amp; Conditions</Link></li>
          <li><Link href="/contact">Privacy policy</Link></li>
        </ul>
      </div>
    </div>
  );
}
