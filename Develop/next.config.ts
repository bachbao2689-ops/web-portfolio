import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/web-portfolio' : '',
  assetPrefix: isProd ? '/web-portfolio/' : '',
  images: { unoptimized: true },
  ...(process.env.PORTFOLIO_BUILD_DIR ? { distDir: process.env.PORTFOLIO_BUILD_DIR } : {}),
  devIndicators: false,
};

export default nextConfig;
