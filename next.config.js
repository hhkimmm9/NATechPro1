/** @type {import('next').NextConfig} */

const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config, {}) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false };

    // https://onnxruntime.ai/docs/tutorials/web/classify-images-nextjs-github-template.html
    config.plugins.push(
      new NodePolyfillPlugin(), 
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/onnxruntime-web/dist/*.wasm',
            to: 'static/chunks/app',
          },
          {
            from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
            to: 'static/chunks/app',
          },
          {
            from: './model',
            to: 'static/chunks/app',
          },
        ],
      }),
      );
    return config;
  },
  images: {
    domains: ['i.natgeofe.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;

