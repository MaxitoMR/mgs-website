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
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CrewBand } from "@/components/sections/crew-band";
import { TrustBadges } from "@/components/sections/trust-badges";
import { Testimonials } from "@/components/sections/testimonials";
import { ClientPortalCta } from "@/components/sections/client-portal-cta";
import { AppPromo } from "@/components/sections/app-promo";
import { AppInTheField } from "@/components/sections/app-in-the-field";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ContactSection } from "@/components/sections/contact-section";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd type="LocalBusiness" />
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <CrewBand />
      <TrustBadges />
      {/* <Testimonials /> — hidden until real client reviews are collected */}
      <ClientPortalCta />
      <AppPromo />
      {/* Sits directly under AppPromo on purpose: the screenshot makes the
          claim, the photographs of it in use are the evidence. */}
      <AppInTheField />
      <ClosingCta />
      <ContactSection />
    </>
  );
}
