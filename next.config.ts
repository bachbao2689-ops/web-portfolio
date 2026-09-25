import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/web-portfolio' : '',
  assetPrefix: isProd ? '/web-portfolio/' : '',
  images: { unoptimized: true },
  distDir: process.env.PORTFOLIO_BUILD_DIR || '.next',
  devIndicators: false,
};

export default nextConfig;
