import { pageMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/site/common/Breadcrumb';
import ContactForm from '@/components/site/contact/ContactForm';
import { ContactInfo, ContactMap } from '@/components/site/contact/ContactInfo';

export const dynamic = 'force-dynamic';
export const generateMetadata = () => pageMetadata('contact');

export default function ContactPage() {
  return (
    <>
      <Breadcrumb title="Contact Us" />
      <div className="contact__area section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 lg-mb-25">
              <ContactInfo />
            </div>
            <div className="col-lg-7 wow fadeInRight" data-wow-delay=".4s">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <ContactMap />
    </>
  );
}
