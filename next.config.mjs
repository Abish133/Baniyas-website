/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      // Admin uploads go through Server Actions; the largest per-file limit is 5 MB
      // and a form can carry up to three images.
      bodySizeLimit: '16mb',
    },
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
