import { CONTACT, MAP_URL, MAP_EMBED_URL } from '@/lib/constants/site';

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

export function ContactInfo() {
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
        <Item icon="flaticon-phone" label="Phone:"><a href={CONTACT.telephone.href}>{CONTACT.telephone.label}</a></Item>
        <Item icon="flaticon-phone" label="Mobile:"><a href={CONTACT.mobile.href}>{CONTACT.mobile.label}</a></Item>
        <Item icon="flaticon-email-3" label="Email Address:"><a href={CONTACT.email.href}>{CONTACT.email.label}</a></Item>
        <Item icon="flaticon-location-1" label="Location:">
          <a href={MAP_URL} target="_blank" rel="noreferrer">
            Post Box No.9962, Unit No:301,
            <br />
            Emirates Islamic Tower,
            <br />
            Al Nakheel, RAK-UAE
          </a>
        </Item>
      </div>
    </div>
  );
}

export function ContactMap() {
  return (
    <div className="map section-padding pt-0">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 wow fadeInUp" data-wow-delay=".4s">
            <div className="map-area">
              <iframe
                src={MAP_EMBED_URL}
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
