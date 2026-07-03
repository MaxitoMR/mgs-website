import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";

export const metadata: Metadata = {
  title: "MGS Supply & Services — Professional Janitorial Services",
  description:
    "Janitorial services for offices, clinics, and industrial facilities around Houston. In business since 2006.",
  openGraph: {
    title: "MGS Supply & Services",
    description: "Janitorial services for offices, clinics, and industrial facilities around Houston. In business since 2006.",
    type: "website",
  },
};
import { StatsOverlap } from "@/components/sections/stats-overlap";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CrewBand } from "@/components/sections/crew-band";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Testimonials } from "@/components/sections/testimonials";
import { ClientPortalCta } from "@/components/sections/client-portal-cta";
import { AppPromo } from "@/components/sections/app-promo";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ContactSection } from "@/components/sections/contact-section";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd type="LocalBusiness" />
      <HeroSection />
      <StatsOverlap />
      <ServicesGrid />
      <WhyChooseUs />
      <CrewBand />
      <TrustBadges />
      {/* <Testimonials /> — hidden until real client reviews are collected */}
      <ClientPortalCta />
      <AppPromo />
      <CtaBanner />
      <ContactSection />
    </>
  );
}
