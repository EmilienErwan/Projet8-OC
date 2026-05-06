import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
    ],
    dangerouslyAllowLocalIP: true,
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
      {
        source: "/auth/:path*",
        destination: "http://localhost:4000/auth/:path*",
      },
    ];
  },
};

export default nextConfig;