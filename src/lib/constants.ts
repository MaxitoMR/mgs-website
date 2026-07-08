export const COMPANY = {
  name: "MGS Supply & Services",
  legalName: "MGS Supply & Services LLC",
  tagline: "Professional Janitorial Services",
  description:
    "Commercial, medical, and industrial janitorial services across greater Houston. Insured, bonded, and operated to a documented QA standard since 2006.",
  phone: {
    primary: "+12818295358",
    display: "(281)-829-5358",
    secondary: "(281)-829-5357",
  },
  email: "support@mgssupplyandservices.com",
  address: {
    street: "5602 10th St",
    city: "Katy",
    state: "TX",
    zip: "77493",
    full: "5602 10th St, Katy, TX 77493",
    mapsUrl: "https://maps.google.com/?q=5602+10th+St+Katy+TX+77493",
  },
  url: "https://mgssupplyandservices.com",
  social: {
    facebook: "https://facebook.com/mgssupplyandservices",
    instagram: "https://instagram.com/mgssupplyandservices",
    linkedin: "https://linkedin.com/company/mgs-supply-and-services",
  },
} as const;

export const BRAND = {
  green: "#69AF23",
  lime: "#9FD01B",
  dark: "#191919",
} as const;

// Cloudflare Stream customer subdomain — build an embed with
// `https://${CLOUDFLARE_STREAM_CUSTOMER}/<videoUid>/iframe`.
export const CLOUDFLARE_STREAM_CUSTOMER =
  "customer-eurkcxtg1osm96dx.cloudflarestream.com";

export const CLOUDFLARE_STREAMS = {
  hero: "https://customer-eurkcxtg1osm96dx.cloudflarestream.com/02c5b18d6e2c920bbfffd01c32135743/manifest/video.m3u8",
  showcase1:
    "https://customer-eurkcxtg1osm96dx.cloudflarestream.com/6042b005bc6af23d33c3b8b597b50410/manifest/video.m3u8",
  showcase2:
    "https://customer-eurkcxtg1osm96dx.cloudflarestream.com/7f0073dfe00c438eed908cf07b8313e2/manifest/video.m3u8",
  showcase3:
    "https://customer-eurkcxtg1osm96dx.cloudflarestream.com/9d80faec3133ed23b6feb956439fd4cc/manifest/video.m3u8",
} as const;

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "AW-11060183424";
export const GA_CONVERSION =
  process.env.NEXT_PUBLIC_GA_CONVERSION ||
  "AW-11060183424/KuCrCPWB5vUbEICD9Jkp";
