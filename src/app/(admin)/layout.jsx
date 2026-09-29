import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/admin.css';

// The admin panel shows live data for a signed-in user: never cache it.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Admin', template: '%s · Bani Yas Admin' },
  robots: { index: false, follow: false },
  icons: { icon: '/assets/img/browser_icon_baniyas.png' },
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Root layout of the admin, so the font loads on every admin page. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          precedence="admin"
        />
        {/* Theme icon fonts (Font Awesome + flaticon) for icons and the icon picker */}
        <link rel="stylesheet" href="/assets/css/fontawesome.css" precedence="admin" />
        <link rel="stylesheet" href="/assets/font/flaticon_flexitype.css" precedence="admin" />
      </head>
      <body className="admin-body">{children}</body>
    </html>
  );
}
