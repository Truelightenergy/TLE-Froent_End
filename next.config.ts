import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      })
    );
    return config;
  },
};

export default nextConfig;
