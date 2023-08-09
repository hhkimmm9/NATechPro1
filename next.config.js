/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

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
    // https://onnxruntime.ai/docs/tutorials/web/classify-images-nextjs-github-template.html
    config.plugins.push(
      new NodePolyfillPlugin(), 
      new CopyPlugin({
        patterns: [
          {
            from: './node_modules/onnxruntime-web/dist/*.wasm',
            to: 'static/chunks/app/gallery/editor/[name][ext]',
          },
          // {
          //   from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
          //   to: 'static/chunks/app/gallery/editor',
          // },
          // {
          //   from: './model',
          //   to: 'static/chunks/app/gallery/editor',
          // },
        ],
      }),
      new webpack.DefinePlugin({
        'process.versions': JSON.stringify(process.versions),
        'process.env': JSON.stringify(process.env),
      }),
      // new webpack.ProvidePlugin({
      //   process: "process/browser",
      // }),
      );
    return config;
  },
  reactStrictMode: true,
  images: {
    domains: ['i.natgeofe.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;

