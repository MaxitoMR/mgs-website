export const COMPANY = {
  name: "MGS Supply & Services",
  legalName: "MGS Supply & Services LLC",
  tagline: "Professional Janitorial Services",
  description:
    "Commercial, medical and industrial janitorial services across greater Houston. Insured, bonded, and scored against a documented QA protocol since 2006.",
  phone: {
    primary: "+12818295357",
    display: "(281)-829-5357",
    secondary: "(281)-829-5358",
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

/* Third-party recognition. Single source of truth for the trust strip, the
   About page, and the LocalBusiness JSON-LD `award` property.

   Stated precisely on purpose — the category, city, month, and issuing
   source are what make it checkable, and a checkable claim is the whole
   reason this carries weight next to our self-asserted trust badges.
   Do NOT soften it into "award-winning": that's the version a facility
   manager discounts. */
export const AWARD = {
  rank: 3,
  issuer: "BusinessRate",
  category: "Janitorial Service",
  locality: "Katy, Texas",
  month: "June",
  year: 2026,
  basis: "Powered by Google Reviews",

  /* `headline` leads with the SUBSTANCE, not the rank number. "Ranked #3"
     as a headline invites "so who are #1 and #2?", and it decays the moment
     the position moves. What a buyer actually cares about — and what stays
     true — is that Katy clients rated the work highly on Google.
     `claim` carries the exact position immediately underneath, so nothing
     is hidden or softened; the precision is what makes it credible. */
  headline: "Top-3 rated janitorial service in Katy",
  claim: "Ranked #3 of janitorial services in Katy, Texas",
  attribution: "BusinessRate, June 2026 · from aggregated Google Reviews",

  /* Plaque photo. Used on /about ONLY, as evidence of a physical artifact.
     Deliberately not the lead visual anywhere else: the plaque's dominant
     elements are BusinessRate's logo and shield, so at display size it
     advertises the awarding body more than MGS. */
  image: "/images/businessrate-award-2026.jpg",

  /* SHELF LIFE: this is stamped June 2026 and will read as stale roughly a
     year out. Either refresh it when a newer ranking lands, or drop the
     month and keep the standing claim. Revisit mid-2027.
     TODO: no reviews link yet — see SESSION-NOTES. A Google Business
     Profile review URL here would make the claim checkable rather than
     merely specific, which is the difference between proof and assertion. */
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
