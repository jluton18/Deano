import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Required for static export — no Next.js image optimization server available
  images: { unoptimized: true },
  // Clean trailing-slash behaviour for Netlify static hosting
  trailingSlash: false,
};

export default nextConfig;
