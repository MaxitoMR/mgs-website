import { COMPANY } from "@/lib/constants";

interface JsonLdProps {
  type: "LocalBusiness" | "Service" | "WebPage";
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
    ...data,
  };

  const jsonLd = type === "LocalBusiness" ? localBusiness : { ...baseData, ...data };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
