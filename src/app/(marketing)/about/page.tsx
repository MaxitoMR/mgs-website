import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/shared/page-header";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { SectionHeading } from "@/components/shared/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { AWARD, COMPANY } from "@/lib/constants";
import {
  Users,
  Phone,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "MGS Supply & Services is a Katy, Texas janitorial contractor serving commercial, medical, and industrial facilities across greater Houston since 2006. Meet the team and the standard they hold.",
  alternates: { canonical: `${COMPANY.url}/about` },
};

/* Office team portraits from the July 2026 shoot. Names and roles were
   supplied by the owner — do NOT edit them from a photo alone. */
const TEAM = [
  { image: "/images/team-01.jpg", name: "Barbara Perez-Puebla", role: "Sales" },
  { image: "/images/team-02.jpg", name: "Rhonda Pitts", role: "Receptionist" },
  { image: "/images/team-03.jpg", name: "Edgar Nunez", role: "Accountant" },
  { image: "/images/team-04.jpg", name: "Saul Reyes", role: "Operations Manager" },
  { image: "/images/team-05.jpg", name: "Gisella Islas", role: "Chief Executive Officer" },
];

/* Moved here with the /leadership consolidation. */
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
      {/* Gisella still has a Person entity — she appears in the team grid —
          but it now points at /about, since /leadership is retired. */}
      <JsonLd
        type="Person"
        data={{
          name: "Gisella Islas",
          jobTitle: "Chief Executive Officer",
          image: `${COMPANY.url}/images/team-05.jpg`,
          url: `${COMPANY.url}/about`,
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
            { "@type": "ListItem", position: 2, name: "About Us", item: `${COMPANY.url}/about` },
          ],
        }}
      />

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
            <SectionHeading
              eyebrow="Who We Are"
              title="A contractor built around one standard."
            />
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
            <SectionHeading
              eyebrow="Recognition"
              title={AWARD.headline}
              lede={
                <>
                  {AWARD.issuer} ranks janitorial contractors by locality from
                  aggregated Google Reviews — so it reflects what our clients
                  wrote publicly, not what we say about ourselves. {AWARD.claim},{" "}
                  {AWARD.month} {AWARD.year}.
                </>
              }
            />
            <p className="mt-5 text-sm text-gray-600" style={{ fontWeight: 300 }}>
              {AWARD.attribution}
            </p>
          </MotionWrapper>
        </div>
      </SectionWrapper>

      {/* The team. `id` is the redirect target for the retired /leadership
          route, so an old link still lands on the people it promised.
          Renders only when every member has both a name and a role — these
          are identifiable people, and a guessed name against a real face
          misrepresents someone. The gate makes that impossible, not just
          unlikely. */}
      {TEAM.every((m) => m.name && m.role) && (
        <SectionWrapper id="leadership">
          <SectionHeading
            className="mb-12"
            eyebrow="The Team"
            title="The people who hold the standard."
            lede="The office in Katy that scopes the work, schedules the crews, and answers the phone when something needs fixing."
          />

          <ul className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-5">
            {TEAM.map((m, i) => (
              <li key={m.image}>
                <MotionWrapper delay={i * 0.08}>
                  {/* aspect-[4/5] with a top-biased crop: the masters are tall
                      2:3 frames, so uncropped they render as small, mostly-desk
                      slivers. Cropping to the face gives every card the same
                      height and puts the person first. */}
                  <div
                    className="group relative aspect-[4/5] overflow-hidden bg-gray-100 shadow-premium transition-shadow duration-300 hover:shadow-premium-lg"
                    style={{ borderTopLeftRadius: "1.25rem" }}
                  >
                    <Image
                      src={m.image}
                      alt={`${m.name}, ${m.role} at ${COMPANY.name}`}
                      fill
                      sizes="(min-width: 1024px) 19vw, (min-width: 640px) 31vw, 46vw"
                      quality={82}
                      className="object-cover object-[50%_28%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold leading-snug text-gray-900">
                    {m.name}
                  </h3>
                  <p
                    className="mt-1 text-sm text-gray-600"
                    style={{ fontWeight: 300 }}
                  >
                    {m.role}
                  </p>
                </MotionWrapper>
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* Operating principles — moved here from the retired /leadership page. */}
      <SectionWrapper className="bg-[#F4F4F5]">
        <SectionHeading
          className="mb-12"
          eyebrow="How Leadership Operates"
          title="The principles behind the work."
        />
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
                <p.icon className="h-5 w-5 text-brand-green-text" aria-hidden="true" />
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

      <WhyChooseUs />
      {/* WhyChooseUs is #111111, so the CTA backdrop must match it (not the default #191919) */}
      <CtaBanner backdrop="#111111" />
    </>
  );
}
