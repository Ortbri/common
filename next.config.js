/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-7debab0acbee4447a863dda9dfcd75d9.r2.dev',
        port: '',
        pathname: '/elements/**',
      },
    ],
  },
};

module.exports = nextConfig;
