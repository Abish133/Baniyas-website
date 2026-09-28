import Link from 'next/link';
import BrandLogo from './BrandLogo';
import Copyright from './Copyright';
import { FooterAddress, FooterQuickLinks, FooterSupport } from './FooterLinks';
import { getSiteSettings } from '@/lib/content';

/** Footer used by all inner pages (footer__one + copyright). */
export default async function Footer() {
  const s = await getSiteSettings();
  return (
    <>
      <div className="footer__one">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="footer__one-cta">
                <div className="row al-center">
                  <div className="col-lg-8 lg-t-center lg-mb-25">
                    <div className="footer__one-cta-title title_split_anim">
                      <h2>{s['layout.footer_cta']}</h2>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="footer__one-cta-icon t-right lg-t-center item_bounce">
                      <Link href="/contact" aria-label="Contact us"><i className="flaticon-right-up"></i></Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="footer__one-area">
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <div className="footer__one-widget mr-40">
                      <BrandLogo className="" color="#ffffff" />
                      <h5>{s['layout.footer_tagline']}</h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 sm-mt-30">
                    <FooterAddress prefix="footer__one" />
                  </div>
                  <div className="col-lg-3 col-sm-6 lg-mt-30">
                    <FooterQuickLinks prefix="footer__one" />
                  </div>
                  <div className="col-lg-2 col-sm-6 lg-mt-30">
                    <FooterSupport prefix="footer__one" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
}
