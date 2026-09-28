import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/admin.css';

export const metadata = {
  title: { default: 'Admin', template: '%s · Bani Yas Admin' },
  robots: { index: false, follow: false },
  icons: { icon: '/assets/img/browser_icon_baniyas.png' },
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Theme icon fonts (Font Awesome + flaticon) for icons and the icon picker */}
        <link rel="stylesheet" href="/assets/css/fontawesome.css" precedence="admin" />
        <link rel="stylesheet" href="/assets/font/flaticon_flexitype.css" precedence="admin" />
      </head>
      <body className="admin-body">{children}</body>
    </html>
  );
}
