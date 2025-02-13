// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;