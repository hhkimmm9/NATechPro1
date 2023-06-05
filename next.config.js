/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['i.natgeofe.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;

