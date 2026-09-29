const isDev = process.env.NODE_ENV !== 'production';

// Content-Security-Policy: only this site, Google Fonts and the Google Maps embed.
// 'unsafe-inline' scripts are needed by Next.js' inline bootstrapping (no nonces);
// 'unsafe-eval' only in development (React dev tooling).
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob:",
  "connect-src 'self'",
  'frame-src https://www.google.com https://maps.google.com',
  "frame-ancestors 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CSP },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  ...(isDev ? [] : [{ key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' }]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // Admin uploads go through Server Actions: images up to 5 MB (several per form)
      // and the home banner video up to 30 MB.
      bodySizeLimit: '40mb',
    },
    // The proxy (proxy.js) buffers request bodies; above this size the body is silently
    // cut off, which would corrupt large uploads. Keep it in line with bodySizeLimit.
    proxyClientMaxBodySize: '40mb',
  },
  async headers() {
    return [
      { source: '/:path*', headers: SECURITY_HEADERS },
      // Theme files (CSS, fonts, images, video) are not fingerprinted, so cache them for
      // 7 days rather than forever; admin uploads (/uploads) already have unique names.
      ...(isDev ? [] : [{ source: '/assets/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }] }]),
    ];
  },
  // Keep the old static URLs working.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/services.html', destination: '/services', permanent: true },
      { source: '/services-details.html', destination: '/services', permanent: true },
      { source: '/gallery.html', destination: '/portfolio', permanent: true },
      { source: '/portfolio.html', destination: '/portfolio', permanent: true },
      { source: '/gallery', destination: '/portfolio', permanent: true },
      { source: '/careers.html', destination: '/careers', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
