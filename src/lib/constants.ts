export const COMPANY = {
  name: "MGS Supply & Services",
  legalName: "MGS Supply & Services LLC",
  tagline: "Professional Janitorial Services",
  description:
    "Enterprise-grade janitorial services for commercial, medical, and industrial facilities.",
  phone: {
    primary: "+17138048529",
    display: "(713) 804-8529",
    secondary: "281-829-5357",
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
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
} as const;

export const BRAND = {
  green: "#69AF23",
  lime: "#9FD01B",
  dark: "#2C3E50",
} as const;

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
