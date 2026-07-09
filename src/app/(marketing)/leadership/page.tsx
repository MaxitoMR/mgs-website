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
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green">
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

      {/* Operating principles */}
      <SectionWrapper className="bg-[#F4F4F5]">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-green">
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
                <p.icon className="h-5 w-5 text-brand-green" />
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
