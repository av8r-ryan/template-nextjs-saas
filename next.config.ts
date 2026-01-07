import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is now the default bundler in Next.js 16
  // No need to enable it explicitly

  // Strict mode for better React practices
  reactStrictMode: true,

  // Image optimization domains (add your CDN domains here)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
