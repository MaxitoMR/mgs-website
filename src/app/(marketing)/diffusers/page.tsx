import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  Wind,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Scent Diffusers",
  description:
    "Cold-air nebulizing scent diffusion for commercial spaces. IFRA-compliant oils, no heat or residue, up to 5,000 sq ft per unit.",
};

const features = [
  {
    icon: Wind,
    title: "Advanced Diffusion Technology",
    description:
      "Cold-air nebulization delivers consistent, long-lasting fragrance without heat, residue, or waste.",
  },
  {
    icon: Shield,
    title: "Safe & Compliant",
    description:
      "Hypoallergenic, IFRA-compliant essential oil blends safe for commercial environments.",
  },
  {
    icon: Clock,
    title: "Programmable Schedules",
    description:
      "Runs on your operating hours, so you are not scenting an empty building.",
  },
];

const benefits = [
  "Up to 5,000 sq ft of coverage per unit",
  "No heat, residue or aerosol propellant",
  "IFRA-compliant, hypoallergenic oils",
  "Scent profile matched to your brand",
  "Automatic refills, no staff involvement",
  "Masks facility odors at the source",
];

export default function DiffusersPage() {
  return (
    <>
      <PageHeader
        title="Scent Diffusers"
        subtitle="Cold-air nebulizing diffusion for commercial spaces."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Diffusers" },
        ]}
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2">
          <MotionWrapper>
            <span className="t-eyebrow text-brand-green-text">
              Premium Scenting
            </span>
            <h2 className="mt-3 font-display text-[1.75rem] font-bold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 lg:text-lg">
              Cold-air nebulization disperses IFRA-compliant oil as a dry mist — no heat, no residue, no propellant. One unit covers up to 5,000 sq ft on a schedule you set.
            </p>

            <div className="mt-8 space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-none bg-brand-green/10 text-brand-green-text">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MotionWrapper>

          <MotionWrapper delay={0.2}>
            {/* text-brand-on-green, not text-white. White measures 2.71:1
                against the green end of this gradient and 1.82:1 against the
                lime — the worst text/background pair on the site. The on-green
                ink is 6.51 and 8.78 on the same two stops. */}
            <div className="rounded-none bg-gradient-to-br from-brand-green to-brand-lime p-8 text-brand-on-green">
              <h3 className="font-display text-xl font-bold lg:text-2xl">Key Benefits</h3>
              <ul className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="mt-8 inline-flex items-center gap-2 rounded-none bg-white px-6 py-3 font-semibold text-brand-green-text transition-all hover:bg-paper"
              >
                Request a Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      <CtaBanner />
    </>
  );
}
