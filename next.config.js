/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    NEXTAUTH_URL: 'http://localhost:3000',
  },
};

module.exports = nextConfig;
