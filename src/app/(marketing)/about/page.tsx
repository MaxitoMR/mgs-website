import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { AWARD } from "@/lib/constants";
import {
  Users,
  Phone,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MGS Supply & Services is a Katy, Texas janitorial contractor serving commercial, medical, and industrial facilities across greater Houston since 2006.",
};

const values = [
  {
    icon: Users,
    title: "Dedicated Crews",
    description: "One accountable team per site. No rotating subcontractors.",
    // corner position on the floating layout (lg and up)
    position: "lg:-top-8 lg:-left-8",
  },
  {
    icon: Phone,
    title: "Direct Line",
    description: "Reach a person who knows your account — not a queue.",
    position: "lg:-top-8 lg:-right-8",
  },
  {
    icon: ShieldCheck,
    title: "Vetted & Insured",
    description: "Background-checked, bonded, and covered on every site.",
    position: "lg:-bottom-8 lg:-left-8",
  },
  {
    icon: ClipboardCheck,
    title: "Documented QA",
    description: "Inspection scores recorded and reported to the client.",
    position: "lg:-bottom-8 lg:-right-8",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="A Katy, Texas janitorial contractor serving commercial, medical, and industrial facilities across greater Houston since 2006."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      <SectionWrapper>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <MotionWrapper>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green-text">
              Who We Are
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              A contractor built around one standard.
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                MGS Supply &amp; Services maintains commercial, medical, and
                industrial facilities across greater Houston from our base in Katy,
                Texas. A dedicated crew is assigned to each site and held to the
                same documented protocol on every visit.
              </p>
              <p>
                The work is built on EPA-registered chemistry and objective
                verification — ATP bioluminescence testing confirms a surface is
                clean at the microbial level, not to the eye. QA results are
                recorded and reported, so a lapse is identified before it reaches
                your desk.
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
                      <value.icon className="h-4 w-4 text-brand-green-text" />
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

      {/* Recognition — the plaque itself. A photographed physical artifact
          reads as real in a way a re-drawn badge does not, which is the
          whole point of putting it here rather than in the hero. */}
      <SectionWrapper className="bg-[#F4F4F5]">
        <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <MotionWrapper>
            <Image
              src={AWARD.image}
              alt={`${AWARD.issuer} plaque: Ranked #${AWARD.rank}, ${AWARD.category}, ${AWARD.locality}, ${AWARD.month} ${AWARD.year}`}
              width={1200}
              height={1502}
              sizes="(min-width: 1024px) 22rem, 60vw"
              quality={84}
              className="mx-auto h-auto w-56 shadow-premium sm:w-64 lg:w-80"
            />
          </MotionWrapper>

          <MotionWrapper delay={0.15}>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green-text">
              Recognition
            </span>
            <h2
              className="mt-3 font-gothic text-gray-900"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 400, lineHeight: 1.15 }}
            >
              {AWARD.headline}
            </h2>
            <p className="mt-5 max-w-xl text-gray-600" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              {AWARD.issuer} ranks janitorial contractors by locality using
              aggregated {AWARD.basis.replace("Powered by ", "")} — so this
              reflects what our clients wrote publicly, not what we say about
              ourselves. It covers {AWARD.category.toLowerCase()} providers in{" "}
              {AWARD.locality} for {AWARD.month} {AWARD.year}.
            </p>
            <p className="mt-4 text-sm text-gray-600" style={{ fontWeight: 300 }}>
              {AWARD.attribution}
            </p>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      <WhyChooseUs />
      {/* WhyChooseUs is #111111, so the CTA backdrop must match it (not the default #191919) */}
      <CtaBanner backdrop="#111111" />
    </>
  );
}
