import { HeroSection } from "@/components/sections/hero";
import { StatsOverlap } from "@/components/sections/stats-overlap";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
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
      {/* <Testimonials /> — hidden until real client reviews are collected */}
      <CtaBanner />
      <ContactSection />
    </>
  );
}
