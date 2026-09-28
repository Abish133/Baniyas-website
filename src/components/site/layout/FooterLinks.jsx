import Link from 'next/link';
import { getSiteContact } from '@/lib/content';
import AddressLines from '@/components/site/common/AddressLines';

export async function FooterAddress({ prefix }) {
  const contact = await getSiteContact();
  return (
    <div className={`${prefix}-widget address`}>
      <h4>Address</h4>
      <div className={`${prefix}-widget-address`}>
        <h6>
          <a href={contact.mapUrl} target="_blank" rel="noreferrer">
            <AddressLines lines={contact.addressLines} />
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
