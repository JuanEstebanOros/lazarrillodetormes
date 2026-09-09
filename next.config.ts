import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Clean public URLs for uploaded images (Railway Volume), served by the
      // dedicated route handler at src/app/api/uploads/[filename]/route.ts.
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
