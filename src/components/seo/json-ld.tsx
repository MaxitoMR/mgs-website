import { AWARD, COMPANY } from "@/lib/constants";

interface JsonLdProps {
  type:
    | "LocalBusiness"
    | "Service"
    | "WebPage"
    | "FAQPage"
    | "Person"
    | "BreadcrumbList";
  data?: Record<string, unknown>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  const localBusiness = {
    ...baseData,
    name: COMPANY.name,
    description: COMPANY.description,
    url: COMPANY.url,
    telephone: COMPANY.phone.display,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
      addressCountry: "US",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 29.7858,
        longitude: -95.8244,
      },
      geoRadius: "100",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      COMPANY.social.facebook,
      COMPANY.social.instagram,
      COMPANY.social.linkedin,
    ],
    image: `${COMPANY.url}/og-image.png`,
    priceRange: "$$",
    /* schema.org/award — free text, and the correct place for third-party
       recognition.

       Deliberately NOT adding `aggregateRating` here: Google treats
       review/rating markup a business puts on its own site about itself as
       self-serving, and it is ineligible for rich results (and risks a
       structured-data manual action). The ratings behind this award live on
       our Google Business Profile, which is where Google reads them from. */
    award: `Ranked #${AWARD.rank} ${AWARD.category} in ${AWARD.locality} — ${AWARD.issuer}, ${AWARD.month} ${AWARD.year} (${AWARD.basis})`,
    ...data,
  };

  let jsonLd;
  if (type === "LocalBusiness") {
    jsonLd = localBusiness;
  } else if (type === "FAQPage") {
    jsonLd = { ...baseData, ...data };
  } else {
    jsonLd = { ...baseData, ...data };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
