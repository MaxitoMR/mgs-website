import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "customer-eurkcxtg1osm96dx.cloudflarestream.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/services/clinic-private-practice",
        destination: "/services/clinics",
        permanent: true,
      },
      {
        source: "/services/school-university",
        destination: "/services/schools",
        permanent: true,
      },
      {
        source: "/services/surgical-centers",
        destination: "/services/surgery-centers",
        permanent: true,
      },
      {
        source: "/services/terminal-cleaning",
        destination: "/services/terminal-sanitization",
        permanent: true,
      },
      {
        source: "/services/sports-rehab",
        destination: "/services/sports-rehabilitation",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
