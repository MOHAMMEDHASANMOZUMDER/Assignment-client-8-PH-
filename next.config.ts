import type { NextConfig } from "next";

const configuredApiUrl = process.env.API_URL?.replace(/\/+$/, "").replace(/\/api$/, "");

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${configuredApiUrl || "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
