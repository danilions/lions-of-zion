import { type NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [];
  },
};

export default nextConfig;

/** Allow cross-origin for LAN preview (Turbopack dev mode) */
export const config = {
  allowedDevOrigins: ["http://10.100.102.7:3000"],
};