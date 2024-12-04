import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ["page.tsx", "tsx"],
};

export default nextConfig;
