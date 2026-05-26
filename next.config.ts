import type { NextConfig } from "next";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID ?? "chris-auto-shine";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "x-app-id", value: APP_ID }],
      },
    ];
  },
};

export default nextConfig;
