import { getSiteContact } from '@/lib/content';
import LineBreaks from '@/components/site/common/LineBreaks';

function Item({ icon, label, children }) {
  return (
    <div className="contact__area-left-contact-item">
      <div className="contact__area-left-contact-item-icon">
        <i className={icon}></i>
      </div>
      <div className="contact__area-left-contact-item-content">
        <span>{label}</span>
        <h6>{children}</h6>
      </div>
    </div>
  );
}

export async function ContactInfo() {
  const contact = await getSiteContact();
  return (
    <div className="contact__area-left mr-40 xl-mr-0">
      <div className="title">
        <span className="subtitle wow fadeInLeft" data-wow-delay=".4s">Contact Us</span>
        <h2 className="title_split_anim mb-25">Get In Touch</h2>
        <p className="wow fadeInUp" data-wow-delay=".4s">
          We’re here to assist you! Please reach out with any questions, feedback, or project inquiries.
        </p>
      </div>
      <div className="contact__area-left-contact wow fadeInUp" data-wow-delay=".7s">
        <Item icon="flaticon-phone" label="Phone:"><a href={contact.telephone.href}>{contact.telephone.label}</a></Item>
        {contact.mobile && <Item icon="flaticon-phone" label="Mobile:"><a href={contact.mobile.href}>{contact.mobile.label}</a></Item>}
        <Item icon="flaticon-email-3" label="Email Address:"><a href={contact.email.href}>{contact.email.label}</a></Item>
        <Item icon="flaticon-location-1" label="Location:">
          <a href={contact.mapUrl} target="_blank" rel="noreferrer">
            <LineBreaks lines={contact.addressLines} />
          </a>
        </Item>
      </div>
    </div>
  );
}

export async function ContactMap() {
  const { mapEmbedUrl } = await getSiteContact();
  return (
    <div className="map section-padding pt-0">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 wow fadeInUp" data-wow-delay=".4s">
            <div className="map-area">
              <iframe
                src={mapEmbedUrl}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bani Yas Building Contracting LLC location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
