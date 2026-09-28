import { getSiteContact } from '@/lib/content';
import SocialLinks from './SocialLinks';

export default async function Copyright({ variant }) {
  const { socialLinks } = await getSiteContact();
  return (
    <div className={variant === 'home' ? 'copyright__area four' : 'copyright__area'}>
      <div className="container">
        <div className="row al-center">
          <div className="col-md-7">
            <div className="copyright__area-content md-t-center md-mb-10">
              <p>Copyright 2025 – All Rights Reserved By Bani Yas</p>
            </div>
          </div>
          <div className="col-md-5">
            <SocialLinks className="copyright__area-social t-right md-t-center" links={socialLinks} />
          </div>
        </div>
      </div>
    </div>
  );
}
