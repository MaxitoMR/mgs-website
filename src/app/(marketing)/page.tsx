import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";

export const metadata: Metadata = {
  title: "MGS Supply & Services — Professional Janitorial Services",
  description:
    "Commercial, medical and industrial janitorial services across greater Houston. Insured, bonded, and scored against a documented QA protocol since 2006.",
  openGraph: {
    title: "MGS Supply & Services",
    description: "Commercial, medical and industrial janitorial services across greater Houston. Insured, bonded, and scored against a documented QA protocol since 2006.",
    type: "website",
  },
};
import { ServicesGrid } from "@/components/sections/services-grid";
import { CrewBand } from "@/components/sections/crew-band";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Testimonials } from "@/components/sections/testimonials";
import { ClientPortalCta } from "@/components/sections/client-portal-cta";
import { AppShowcase } from "@/components/sections/app-showcase";
import { AwardBand } from "@/components/sections/award-band";
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
      {/* Clearances — the baseline credentials, framed as what has to be true
          before MGS is in the building. It absorbed the old "Why facilities
          standardize on us" card grid; the hero stat bar is the numeric
          version of the same claims and is not repeated. */}
      <TrustBadges />
      {/* <Testimonials /> — hidden until real client reviews are collected */}
      <ClientPortalCta />
      {/* One continuous dark field between two light sections — the app
          chapter is meant to read as a single scroll, not stacked pitches. */}
      <AppShowcase />
      {/* Third-party recognition immediately before the ask: it is a closing
          argument, not an opening one. Moved out of the clearances section,
          where a reputation claim sat among compliance claims. */}
      <AwardBand />
      <ClosingCta />
      <ContactSection />
    </>
  );
}
