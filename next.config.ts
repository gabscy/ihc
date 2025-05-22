import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['github.com'],
    remotePatterns: [new URL('https://fimyopkehttxuhdgslmm.supabase.co/**')]
  }
};

export default nextConfig;
