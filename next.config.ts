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
        // hq.zayviana.com serves the private project dashboard (app/hq).
        {
          source: "/",
          has: [{ type: "host", value: "hq.zayviana.com" }],
          destination: "/hq",
        },
        // learn.zayviana.com serves the Study Shelf (public/learn/index.html).
        {
          source: "/",
          has: [{ type: "host", value: "learn.zayviana.com" }],
          destination: "/learn/index.html",
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
      {
        source: "/hq",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }, { key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/learn/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
