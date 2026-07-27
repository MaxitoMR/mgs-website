import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { COMPANY } from "@/lib/constants";
import { ClipboardCheck, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leadership of MGS Supply & Services. Gisella Islas, Chief Executive Officer, leads the company's commercial, medical, and industrial janitorial operations across greater Houston.",
};

/* Office team portraits from the July 2026 shoot. Names and roles were
   supplied by the owner — do NOT edit them from a photo alone. The section
   renders only when every entry has both fields, so an incomplete addition
   can never ship a face without an identity attached. */
const TEAM = [
  { image: "/images/team-01.jpg", name: "Barbara Perez-Puebla", role: "Sales" },
  { image: "/images/team-02.jpg", name: "Rhonda Pitts", role: "Receptionist" },
  { image: "/images/team-03.jpg", name: "Edgar Nunez", role: "Accountant" },
  { image: "/images/team-04.jpg", name: "Saul Reyes", role: "Operations Manager" },
  { image: "/images/team-05.jpg", name: "Gisella Islas", role: "Chief Executive Officer" },
];

const principles = [
  {
    icon: ClipboardCheck,
    title: "Verifiable, not assumed",
    body: "Cleaning is only as good as it can be measured. Every site is scored against a documented QA protocol and reported back to the client.",
  },
  {
    icon: ShieldCheck,
    title: "Accountable by design",
    body: "A dedicated crew is assigned to each facility and answerable for the result — no rotating subcontractors, no handoffs.",
  },
  {
    icon: Users,
    title: "People first",
    body: "The standard lives with the crews who execute it. They are vetted, trained to protocol, and supported to hold the line.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <JsonLd
        type="Person"
        data={{
          name: "Gisella Islas",
          jobTitle: "Chief Executive Officer",
          image: `${COMPANY.url}/images/gisella-islas.jpg`,
          url: `${COMPANY.url}/leadership`,
          worksFor: {
            "@type": "Organization",
            name: COMPANY.name,
            url: COMPANY.url,
          },
        }}
      />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: COMPANY.url },
            { "@type": "ListItem", position: 2, name: "About", item: `${COMPANY.url}/about` },
            { "@type": "ListItem", position: 3, name: "Leadership", item: `${COMPANY.url}/leadership` },
          ],
        }}
      />

      <PageHeader
        title="Leadership"
        subtitle="The people accountable for the standard MGS operates to — on every site, every visit."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Leadership" },
        ]}
      />

      {/* CEO feature */}
      <SectionWrapper>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          {/* Portrait */}
          <MotionWrapper>
            <div
              className="mgs-card overflow-hidden"
              style={{ borderTopLeftRadius: "clamp(1.5rem, 3vw, 3rem)" }}
            >
              <Image
                src="/images/gisella-islas.jpg"
                alt="Gisella Islas, Chief Executive Officer of MGS Supply & Services"
                width={1400}
                height={2100}
                sizes="(min-width: 1024px) 34rem, 100vw"
                quality={84}
                className="h-auto w-full"
                priority
              />
            </div>
          </MotionWrapper>

          {/* Bio */}
          <MotionWrapper delay={0.15}>
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green-text">
              Chief Executive Officer
            </span>
            <h2 className="mt-3 font-display text-4xl font-bold text-gray-900 sm:text-5xl">
              Gisella Islas
            </h2>

            <div className="mt-6 space-y-4 text-gray-600">
              <p>
                Gisella Islas leads MGS Supply &amp; Services as Chief Executive
                Officer, accountable for the standard the company holds across
                every facility it services.
              </p>
              <p>
                Under her direction, MGS built its model around a single premise:
                cleaning is only as good as it is verifiable. That principle runs
                through the operation — dedicated crews assigned to each site, QA
                scored and documented, and clients given full visibility into the
                work. What began as a small Katy, Texas operation now serves
                commercial, medical, and industrial facilities across greater
                Houston.
              </p>
            </div>

            {/* Pull quote */}
            <blockquote
              className="mt-8 border-l-2 border-brand-green pl-6 text-lg font-light italic leading-relaxed text-gray-800"
            >
              &ldquo;We don&apos;t ask clients to take our word for it. We measure
              the work, document it, and put it in front of them.&rdquo;
              <cite className="mt-2 block text-sm not-italic text-gray-500">
                — Gisella Islas, CEO
              </cite>
            </blockquote>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      {/* The team behind the standard.
          Renders nothing until every member has a real name and role — see
          the TEAM comment. Never ship a guessed name against a real face. */}
      {TEAM.every((m) => m.name && m.role) && (
        <SectionWrapper className="bg-[#FBFBFE]">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-green-text">
              The Team
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              The people who hold the standard.
            </h2>
            <p className="mt-4 max-w-2xl text-gray-600" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              The office in Katy that scopes the work, schedules the crews, and
              answers the phone when something needs fixing.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {TEAM.map((m, i) => (
              <li key={m.image}>
                <MotionWrapper delay={i * 0.08}>
                  <div
                    className="overflow-hidden"
                    style={{ borderTopLeftRadius: "1.25rem" }}
                  >
                    <Image
                      src={m.image}
                      alt={`${m.name}, ${m.role} at ${COMPANY.name}`}
                      width={1600}
                      height={2400}
                      sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                      quality={82}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-gray-900">
                    {m.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-gray-600" style={{ fontWeight: 300 }}>
                    {m.role}
                  </p>
                </MotionWrapper>
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* Operating principles */}
      <SectionWrapper className="bg-[#F4F4F5]">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-green-text">
            How Leadership Operates
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            The principles behind the work.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="mgs-card p-7"
              style={{ borderTopLeftRadius: "1.25rem" }}
            >
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center"
                style={{ background: "#69AF2315", borderTopLeftRadius: "0.7rem" }}
              >
                <p.icon className="h-5 w-5 text-brand-green-text" />
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Principles section is #F4F4F5, so the CTA's curved corner matches it. */}
      <CtaBanner backdrop="#F4F4F5" />
    </>
  );
}
