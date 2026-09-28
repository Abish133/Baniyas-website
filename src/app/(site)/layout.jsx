import { SITE_NAME } from '@/lib/constants/site';
import { getSiteContact, getSiteSettings } from '@/lib/content';
import { SITE_URL, businessJsonLd } from '@/lib/seo';
import { SiteUIProvider } from '@/components/site/layout/SiteUIProvider';
import SidebarPopup from '@/components/site/layout/SidebarPopup';
import MobileMenu from '@/components/site/layout/MobileMenu';
import Preloader from '@/components/site/effects/Preloader';
import CustomCursor from '@/components/site/effects/CustomCursor';
import ScrollToTop from '@/components/site/effects/ScrollToTop';
import ThemeEffects from '@/components/site/effects/ThemeEffects';
import LiveContentRefresh from '@/components/site/effects/LiveContentRefresh';
import WhatsAppButton from '@/components/site/layout/WhatsAppButton';

// The sidebar and footers show contact details from the database.
export const dynamic = 'force-dynamic';

// Pages set their own title/description (see lib/seo.js); these are the fallbacks.
export async function generateMetadata() {
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_NAME, template: `%s - ${SITE_NAME}` },
    description: s['seo.home_description'],
    icons: { icon: '/assets/img/browser_icon_baniyas.png' },
    openGraph: { type: 'website', siteName: SITE_NAME, images: [{ url: s['seo.share_image'] }] },
  };
}

// Theme stylesheets, in the same order as the original pages.
const STYLESHEETS = [
  '/assets/css/bootstrap.min.css',
  '/assets/css/fontawesome.css',
  '/assets/font/flaticon_flexitype.css',
  '/assets/css/animate.css',
  '/assets/css/swiper-bundle.min.css',
  '/assets/css/magnific-popup.css',
  '/assets/css/style.css',
  '/assets/css/site-custom.css',
];

export default async function SiteRootLayout({ children }) {
  const [contact, settings, jsonLd] = await Promise.all([getSiteContact(), getSiteSettings(), businessJsonLd()]);
  return (
    <html lang="en">
      <head>
        {STYLESHEETS.map((href) => (
          <link key={href} rel="stylesheet" href={href} precedence="theme" />
        ))}
      </head>
      <body>
        <SiteUIProvider>
          <Preloader />
          <CustomCursor />
          <SidebarPopup contact={contact} text={settings['layout.sidebar_text']} />
          <MobileMenu />
          {children}
          <WhatsAppButton whatsapp={contact.whatsapp} />
          <ScrollToTop />
          <ThemeEffects />
          <LiveContentRefresh />
        </SiteUIProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
