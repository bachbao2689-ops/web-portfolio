import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: process.env.PORTFOLIO_BUILD_DIR || '.next',
  outputFileTracingRoot: process.cwd(),
  devIndicators: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
