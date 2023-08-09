/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
    config.plugins.push(
      new NodePolyfillPlugin(), 
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
            to: 'static/chunks/app/gallery/editor',
          },
          {
            from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
            to: 'static/chunks/app/gallery/editor',
          },
          // {
          //   from: './model',
          //   to: 'static/chunks/app/gallery/editor',
          // },
        ],
      }),
    );
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['i.natgeofe.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;

