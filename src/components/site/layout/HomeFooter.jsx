import Link from 'next/link';
import BrandLogo from './BrandLogo';
import Copyright from './Copyright';
import { FooterAddress, FooterQuickLinks, FooterSupport } from './FooterLinks';
import { getSiteSettings } from '@/lib/content';

/** Home page footer (cta__four + footer__four + copyright four). */
export default async function HomeFooter() {
  const s = await getSiteSettings();
  return (
    <>
      <div className="cta__four">
        <div className="container">
          <div className="row jc-center">
            <div className="col-xl-12">
              <div className="cta__four-area t-center" style={{ backgroundImage: "url('/assets/img/page/subscribe.jpg')" }}>
                <div className="cta__four-area-content">
                  <h2 className="title_split_anim">{s['home.cta_title']}</h2>
                  <div className="item_bounce">
                    <Link className="build_button mt-40" href="/contact">
                      {s['home.cta_button']}<i className="flaticon-right-up"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__four">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="footer__four-area">
                <div className="row">
                  <div className="col-lg-4 col-sm-6">
                    <div className="footer__four-widget mr-40">
                      <BrandLogo className="" color="#000000" />
                      <h5>{s['layout.footer_tagline']}</h5>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 sm-mt-30">
                    <FooterAddress prefix="footer__four" />
                  </div>
                  <div className="col-lg-3 col-sm-6 lg-mt-30">
                    <FooterQuickLinks prefix="footer__four" />
                  </div>
                  <div className="col-lg-2 col-sm-6 lg-mt-30">
                    <FooterSupport prefix="footer__four" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright variant="home" />
    </>
  );
}
