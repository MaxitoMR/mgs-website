import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";

export const metadata: Metadata = {
  title: "MGS Supply & Services — Professional Janitorial Services",
  description:
    "Commercial, medical, and industrial janitorial services across greater Houston. Insured, bonded, and operated to a documented QA standard since 2006.",
  openGraph: {
    title: "MGS Supply & Services",
    description: "Commercial, medical, and industrial janitorial services across greater Houston. Insured, bonded, and operated to a documented QA standard since 2006.",
    type: "website",
  },
};
import { ServicesGrid } from "@/components/sections/services-grid";
import { CrewBand } from "@/components/sections/crew-band";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Testimonials } from "@/components/sections/testimonials";
import { ClientPortalCta } from "@/components/sections/client-portal-cta";
import { AppShowcase } from "@/components/sections/app-showcase";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ContactSection } from "@/components/sections/contact-section";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd type="LocalBusiness" />
      <HeroSection />
      <ServicesGrid />
      <CrewBand />
      {/* One trust section, not three. TrustBadges absorbed the "Why facilities
          standardize on us" card grid; the hero stat bar is the numeric
          version of the same claims and is not repeated. */}
      <TrustBadges />
      {/* <Testimonials /> — hidden until real client reviews are collected */}
      <ClientPortalCta />
      {/* One continuous dark field between two light sections — the app
          chapter is meant to read as a single scroll, not stacked pitches. */}
      <AppShowcase />
      <ClosingCta />
      <ContactSection />
    </>
  );
}
