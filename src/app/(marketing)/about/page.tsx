import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import {
  Users,
  Phone,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MGS Supply & Services is a janitorial company based in Katy, TX, cleaning Houston-area facilities since 2006.",
};

const values = [
  {
    icon: Users,
    title: "Dedicated Crews",
    description: "The same team every visit. They learn your building.",
    // corner position on the floating layout (lg and up)
    position: "lg:-top-8 lg:-left-8",
  },
  {
    icon: Phone,
    title: "We Pick Up the Phone",
    description: "Call and reach a person who knows your account.",
    position: "lg:-top-8 lg:-right-8",
  },
  {
    icon: ShieldCheck,
    title: "Background-Checked",
    description: "Every employee cleared before their first shift.",
    position: "lg:-bottom-8 lg:-left-8",
  },
  {
    icon: ClipboardCheck,
    title: "QA You Can See",
    description: "Inspection scores posted to your portal.",
    position: "lg:-bottom-8 lg:-right-8",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="We run a janitorial company out of Katy, TX. We've been doing this since 2006."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <SectionWrapper>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <MotionWrapper>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green">
              Who We Are
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              The crew behind your clean building.
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                We&apos;re a janitorial company based in Katy, cleaning offices,
                clinics, and industrial facilities across the Houston area. The
                same crews, the same standards, every visit.
              </p>
              <p>
                Our work runs on EPA-registered disinfectants and tools like ATP
                testing — we verify a surface is actually clean instead of
                eyeballing it. When a site slips, we catch it before you have to
                call.
              </p>
            </div>
          </MotionWrapper>

          {/* Right — photo with the four cards floating at its corners */}
          <MotionWrapper delay={0.2}>
            <div className="relative lg:mx-10 lg:my-8">
              <div
                className="overflow-hidden shadow-premium"
                style={{ borderTopLeftRadius: "clamp(1.5rem, 3vw, 3rem)" }}
              >
                <Image
                  src="/images/mgs-katy-2006.jpg"
                  alt="The MGS home base in Katy, Texas"
                  width={2000}
                  height={1333}
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  quality={80}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* contents on lg lets each card position against the image wrapper */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-0 lg:contents">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className={`w-full border border-gray-100 bg-white p-3.5 lg:absolute lg:w-48 ${value.position}`}
                    style={{
                      borderTopLeftRadius: "1rem",
                      boxShadow:
                        "0 22px 48px -12px rgba(17,24,39,0.28), 0 6px 16px -8px rgba(17,24,39,0.18)",
                    }}
                  >
                    <div
                      className="mb-2.5 flex h-9 w-9 items-center justify-center"
                      style={{
                        background: "#69AF2315",
                        borderTopLeftRadius: "0.6rem",
                      }}
                    >
                      <value.icon className="h-4 w-4 text-brand-green" />
                    </div>
                    <h3 className="font-display text-sm font-bold text-gray-900">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-snug text-gray-600">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      <WhyChooseUs />
      {/* WhyChooseUs is #111111, so the CTA backdrop must match it (not the default #191919) */}
      <CtaBanner backdrop="#111111" />
    </>
  );
}
