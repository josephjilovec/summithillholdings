import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/ventures/:slug/capital", destination: "/contact?venture=:slug", permanent: false },
      { source: "/portfolio/:slug/capital", destination: "/contact?venture=:slug", permanent: false },
      { source: "/portfolio/ferrix-corp/capital", destination: "/contact?venture=crestline-metals", permanent: false },
      { source: "/portfolio/payer-delta-az/capital", destination: "/contact?venture=payer-delta", permanent: false },
      { source: "/ventures", destination: "/portfolio", permanent: true },
      { source: "/ventures/:path*", destination: "/portfolio/:path*", permanent: true },
      { source: "/portfolio/ferrix-corp", destination: "/portfolio/crestline-metals", permanent: true },
      { source: "/portfolio/payer-delta-az", destination: "/portfolio/payer-delta", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" }
        ]
      }
    ];
  }
};

export default nextConfig;
