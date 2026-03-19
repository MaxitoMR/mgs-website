import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import {
  Target,
  Eye,
  Heart,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MGS Supply & Services — our mission, values, and commitment to delivering enterprise-grade janitorial solutions.",
};

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To provide unmatched facility maintenance services that create healthier, safer, and more productive environments for every client we serve.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "To be the most trusted name in professional janitorial services across Texas, setting the standard for quality, reliability, and innovation.",
  },
  {
    icon: Heart,
    title: "Values",
    description:
      "Integrity, excellence, accountability, and continuous improvement drive every decision we make and every facility we maintain.",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A family of certified professionals, each rigorously trained, background-checked, and committed to exceeding expectations daily.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Enterprise-grade janitorial services built on trust, expertise, and an unwavering commitment to excellence."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2">
          <MotionWrapper>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green">
              Our Story
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Built on a Foundation of Excellence
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                MGS Supply &amp; Services was founded with a clear mission: to
                elevate the standard of professional janitorial services for
                commercial, medical, and industrial facilities across Texas.
              </p>
              <p>
                What began as a commitment to cleaner spaces has grown into a
                comprehensive facility management operation serving hundreds of
                clients across the Greater Houston area. Our growth has been
                driven by one principle — deliver results that exceed
                expectations, every single time.
              </p>
              <p>
                Today, we deploy certified teams equipped with advanced
                technology, EPA-registered disinfectants, and industry-leading
                protocols to protect the health and safety of every facility we
                serve.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-xl bg-gray-50 p-6"
                >
                  <value.icon className="mb-3 h-8 w-8 text-brand-green" />
                  <h3 className="font-display text-lg font-bold text-gray-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
