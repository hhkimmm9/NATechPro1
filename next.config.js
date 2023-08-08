/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.module.rules.push({
      test: /\.node$/,

      loader: "node-loader",
    })
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['i.natgeofe.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;

