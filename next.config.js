/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  experimental: {
    // Disable incremental cache to prevent EIO errors
    isrMemoryCacheSize: 0,
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    // Prevent filesystem watching issues
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules', '**/.next'],
    };
    return config;
  },
};

module.exports = nextConfig;
