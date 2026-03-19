import { HeroSection } from "@/components/sections/hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { VideoShowcase } from "@/components/sections/video-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { ServiceAreas } from "@/components/sections/service-areas";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ContactSection } from "@/components/sections/contact-section";
import { JsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd type="LocalBusiness" />
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <VideoShowcase />
      <Testimonials />
      <ServiceAreas />
      <CtaBanner />
      <ContactSection />
    </>
  );
}
