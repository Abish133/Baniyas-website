import { getSiteContact, getSiteSettings } from '@/lib/content';
import SocialLinks from './SocialLinks';

export default async function Copyright({ variant }) {
  const [{ socialLinks }, s] = await Promise.all([getSiteContact(), getSiteSettings()]);
  return (
    <div className={variant === 'home' ? 'copyright__area four' : 'copyright__area'}>
      <div className="container">
        <div className="row al-center">
          <div className="col-md-7">
            <div className="copyright__area-content md-t-center md-mb-10">
              <p>Copyright {new Date().getFullYear()} – {s['layout.copyright']}</p>
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
