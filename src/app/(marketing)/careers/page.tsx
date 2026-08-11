import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import {
  Briefcase,
  GraduationCap,
  Heart,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Openings for floor techs, supervisors, day maids and janitors across greater Houston. Competitive pay, training on the job, and a route to team lead.",
};

const benefits = [
  {
    icon: Briefcase,
    title: "Competitive Wages",
    description: "Competitive pay, reviewed on performance.",
  },
  {
    icon: GraduationCap,
    title: "Training & Certification",
    description:
      "Training on the job, and industry certifications earned on shift.",
  },
  {
    icon: TrendingUp,
    title: "Advancement Opportunities",
    description: "A route from team member to team lead to management.",
  },
  {
    icon: Heart,
    title: "Supportive Culture",
    description:
      "One crew per site, so you work the same building with the same people.",
  },
];

const openPositions = [
  {
    title: "Janitorial Team Member",
    type: "Full-Time / Part-Time",
    location: "Katy / Houston, TX",
  },
  {
    title: "Medical Facility Cleaning Specialist",
    type: "Full-Time",
    location: "Houston, TX",
  },
  {
    title: "Floor Care Technician",
    type: "Full-Time",
    location: "Katy, TX",
  },
  {
    title: "Team Lead — Industrial Division",
    type: "Full-Time",
    location: "Houston Metro Area",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        title="Careers at MGS"
        subtitle="Full-time work across greater Houston, with training and a route to supervisor."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Careers" },
        ]}
      />

      <SectionWrapper>
        <div className="text-center">
          <MotionWrapper>
            <h2 className="font-display text-[1.75rem] font-bold text-gray-900 sm:text-4xl">
              Why Work With Us?
            </h2>
          </MotionWrapper>
        </div>
        <div className="mt-7 grid gap-5 sm:gap-8 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {benefits.map((benefit, i) => (
            <MotionWrapper key={benefit.title} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-brand-green/10 text-brand-green-text">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 lg:text-lg">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-paper">
        <h2 className="mb-8 font-display text-xl font-bold text-gray-900 lg:text-2xl">
          Open Positions
        </h2>
        <div className="space-y-4">
          {openPositions.map((position) => (
            <MotionWrapper key={position.title}>
              <div className="mgs-card flex flex-col items-start justify-between gap-4 rounded-none p-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-display text-xl font-bold text-gray-900 lg:text-lg">
                    {position.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {position.type} &bull; {position.location}
                  </p>
                </div>
                <Link
                  href="/employee-application"
                  className="group inline-flex min-h-12 items-center gap-2 rounded-none bg-brand-green-deep px-6 py-2.5 text-sm font-semibold text-brand-on-green transition-all hover:bg-brand-green-deep-hover"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
