import Link from 'next/link';
import { getSiteContact, getSiteSettings } from '@/lib/content';
import LineBreaks from '@/components/site/common/LineBreaks';

export async function FooterAddress({ prefix }) {
  const contact = await getSiteContact();
  return (
    <div className={`${prefix}-widget address`}>
      <h4>Address</h4>
      <div className={`${prefix}-widget-address`}>
        <h6>
          <a href={contact.mapUrl} target="_blank" rel="noreferrer">
            <LineBreaks lines={contact.addressLines} />
          </a>
        </h6>
        <br />
        <h6><a href={contact.telephone.href}>{contact.telephone.label}</a></h6>
        {contact.mobile && (
          <>
            <br />
            <h6><a href={contact.mobile.href}>{contact.mobile.label}</a></h6>
          </>
        )}
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

/** Links to the legal pages that have text (Admin → Legal Pages); hidden when there are none. */
export async function FooterSupport({ prefix }) {
  const s = await getSiteSettings();
  const links = [
    s['legal.terms'] && { href: '/terms', label: 'Terms & Conditions' },
    s['legal.privacy'] && { href: '/privacy', label: 'Privacy Policy' },
  ].filter(Boolean);
  if (!links.length) return null;

  return (
    <div className={`${prefix}-widget address`}>
      <h4>Support</h4>
      <div className="footer-widget-menu">
        <ul>
          {links.map((link) => (
            <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
