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
    description:
      "The same team cleans your building every visit. They learn your space, so you're not re-explaining the job to a new face each week.",
  },
  {
    icon: Phone,
    title: "We Pick Up the Phone",
    description:
      "Call us and you get a person who knows your account — not a ticket number and a queue.",
  },
  {
    icon: ShieldCheck,
    title: "Background-Checked",
    description:
      "Every employee clears a criminal background check before their first shift. They're insured and bonded, too.",
  },
  {
    icon: ClipboardCheck,
    title: "QA You Can See",
    description:
      "We inspect our own work and post the scores to your portal. If a site slips, you'll know before we do something about it.",
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
        <div className="grid gap-12 lg:grid-cols-2">
          <MotionWrapper>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green">
              Our Story
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Where MGS started
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                MGS started in 2006 taking commercial office contracts around
                Katy. A few buildings, a small crew, and one rule we didn&apos;t
                want to break: do the job right and show up when we said we would.
              </p>
              <p>
                Over the years we picked up medical and industrial accounts,
                mostly because clients referred us to people they knew. We
                haven&apos;t run much advertising. The work brought in the work.
              </p>
              <p>
                These days the crews use EPA-registered disinfectants and tools
                like ATP testing to verify a clean instead of eyeballing it. The
                tools changed. The rule from 2006 didn&apos;t.
              </p>
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-none bg-gray-50 p-6"
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

      <SectionWrapper className="pt-0">
        <MotionWrapper>
          <figure className="mx-auto max-w-5xl">
            <div
              className="overflow-hidden shadow-premium"
              style={{ borderTopLeftRadius: "clamp(1.5rem, 3vw, 3rem)" }}
            >
              <Image
                src="/images/mgs-katy-2006.jpg"
                alt="The MGS home base in Katy, Texas"
                width={2000}
                height={1333}
                sizes="(min-width: 1024px) 64rem, 100vw"
                quality={80}
                className="h-auto w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-gray-500">
              Home base in Katy, Texas — where MGS has run since 2006.
            </figcaption>
          </figure>
        </MotionWrapper>
      </SectionWrapper>

      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
