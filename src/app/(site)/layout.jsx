import { SITE_NAME } from '@/lib/constants/site';
import { getSiteContact } from '@/lib/content';
import { SiteUIProvider } from '@/components/site/layout/SiteUIProvider';
import SidebarPopup from '@/components/site/layout/SidebarPopup';
import MobileMenu from '@/components/site/layout/MobileMenu';
import Preloader from '@/components/site/effects/Preloader';
import CustomCursor from '@/components/site/effects/CustomCursor';
import ScrollToTop from '@/components/site/effects/ScrollToTop';
import ThemeEffects from '@/components/site/effects/ThemeEffects';
import LiveContentRefresh from '@/components/site/effects/LiveContentRefresh';

// The sidebar and footers show contact details from the database.
export const dynamic = 'force-dynamic';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: SITE_NAME, template: `%s - ${SITE_NAME}` },
  description: SITE_NAME,
  icons: { icon: '/assets/img/browser_icon_baniyas.png' },
};

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
  const contact = await getSiteContact();
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
          <SidebarPopup contact={contact} />
          <MobileMenu />
          {children}
          <ScrollToTop />
          <ThemeEffects />
          <LiveContentRefresh />
        </SiteUIProvider>
      </body>
    </html>
  );
}
