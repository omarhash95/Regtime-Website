/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
}

module.exports = nextConfig
