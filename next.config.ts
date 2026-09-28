import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // life.zayviana.com serves the private Life OS app (public/life/index.html).
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "life.zayviana.com" }],
          destination: "/life/index.html",
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: "/life/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
