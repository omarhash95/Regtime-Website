/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};
module.exports = nextConfig;
