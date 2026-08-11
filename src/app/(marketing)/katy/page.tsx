import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Building2,
  Stethoscope,
  Factory,
  Wrench,
  ArrowRight,
  Phone,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { CtaBanner } from "@/components/sections/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { AWARD, COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Janitorial Services in Katy, TX",
  description:
    "Commercial, medical and industrial janitorial services in Katy, Texas. Headquartered on 10th Street since 2006, insured, bonded, and top-3 rated in Katy on BusinessRate.",
  alternates: { canonical: `${COMPANY.url}/katy` },
  openGraph: {
    title: `Janitorial Services in Katy, TX | ${COMPANY.name}`,
    description:
      "Katy-based since 2006, serving commercial, medical and industrial facilities across Katy and west Houston.",
    url: `${COMPANY.url}/katy`,
  },
};

/* Neighborhoods and business districts inside the Katy service radius.
   Named explicitly because local intent is how people actually search —
   "office cleaning near Cinco Ranch" beats a generic greater-Houston page. */
const AREAS = [
  "Cinco Ranch",
  "Katy Mills",
  "Old Katy / Downtown",
  "Grand Lakes",
  "Seven Meadows",
  "Cross Creek Ranch",
  "Firethorne",
  "Falcon Point",
  "Nottingham Country",
  "Green Trails",
  "Energy Corridor",
  "Fulshear",
];

const SECTORS = [
  {
    icon: Building2,
    title: "Offices & retail",
    body: "Multi-tenant buildings, dealerships, restaurants and storefronts along the Grand Parkway and I-10.",
    href: "/services/multi-tenant-offices",
  },
  {
    icon: Stethoscope,
    title: "Medical facilities",
    body: "Surgery centers, clinics, imaging and labs, to AORN and Joint Commission standards.",
    href: "/services/surgery-centers",
  },
  {
    icon: Factory,
    title: "Industrial sites",
    body: "Warehouses, plants and distribution space, scoped to the site's hazards.",
    href: "/services/warehouses",
  },
  {
    icon: Wrench,
    title: "Project work",
    body: "Post-construction cleanup, concrete floor care, windows and terminal sanitization.",
    href: "/services/post-construction",
  },
];

const FAQS = [
  {
    q: "Are you actually based in Katy?",
    a: `Yes. Our office and supply warehouse are at ${COMPANY.address.full}, and have been in Katy since 2006. Crews and equipment stage from here rather than driving in from central Houston.`,
  },
  {
    q: "How fast can you respond to an emergency in Katy?",
    a: "Crews stage locally, so most Katy addresses are a short drive from our warehouse. The 24/7 line is staffed for spill, flood and urgent decontamination — not a next-business-day voicemail.",
  },
  {
    q: "Do you service areas outside Katy?",
    a: "Yes. Katy is the home base, and we cover the Energy Corridor, Fulshear, Cypress, Sugar Land and west Houston from it. Katy sites get the shortest response times.",
  },
  {
    q: "Are you insured and bonded?",
    a: "Every engagement carries general liability coverage and bonding, and every employee clears a background check before their first shift. Certificates on request.",
  },
  {
    q: "How do I get a price for my Katy facility?",
    a: "Request a walkthrough. We measure the actual square footage, surfaces and traffic, then price against that rather than over the phone.",
  },
];

export default function KatyPage() {
  return (
    <>
      {/* BreadcrumbList comes from PageHeader's `breadcrumbs` prop. */}
      {/* Service (not a second LocalBusiness): the home page already declares
          the business entity. Duplicating it here under a different URL would
          split the same organization into two nodes. */}
      <JsonLd
        type="Service"
        data={{
          name: "Janitorial Services in Katy, Texas",
          serviceType: "Janitorial Service",
          description:
            "Commercial, medical, and industrial janitorial services for facilities in Katy, Texas.",
          url: `${COMPANY.url}/katy`,
          provider: {
            "@type": "LocalBusiness",
            name: COMPANY.name,
            telephone: COMPANY.phone.display,
            url: COMPANY.url,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.address.street,
              addressLocality: COMPANY.address.city,
              addressRegion: COMPANY.address.state,
              postalCode: COMPANY.address.zip,
              addressCountry: "US",
            },
            award: `Ranked #${AWARD.rank} ${AWARD.category} in ${AWARD.locality} — ${AWARD.issuer}, ${AWARD.month} ${AWARD.year}`,
          },
          areaServed: {
            "@type": "City",
            name: "Katy",
            containedInPlace: { "@type": "State", name: "Texas" },
          },
        }}
      />
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <PageHeader
        title="Janitorial Services in Katy, Texas"
        subtitle="Not a Houston company that drives out to Katy. The office, warehouse and crews have been here since 2006."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Katy, TX" }]}
      />

      {/* Lead credential. Typographic, not the plaque photo: the plaque's
          dominant elements are BusinessRate's logo and shield, so reproducing
          it here would hand the page's strongest position to the awarding
          body's branding. The plaque lives on /about as the artifact. */}
      <SectionWrapper className="bg-paper-alt">
        <MotionWrapper>
          <div className="mx-auto max-w-3xl text-center">
            <span className="t-eyebrow text-brand-green-text">
              What Katy clients say
            </span>
            <p
              className="t-h2 mt-4 font-gothic text-gray-900"
            >
              {AWARD.headline}
            </p>
            <div
              className="mx-auto mt-7 h-[3px] w-20"
              style={{ background: "var(--color-brand-green)" }}
              aria-hidden="true"
            />
            <p className="mt-7 text-gray-600" style={{ fontWeight: 300, lineHeight: 1.75 }}>
              {AWARD.issuer} ranks janitorial contractors by locality from
              aggregated Google Reviews. {AWARD.claim} — a reflection of what
              Katy clients wrote publicly, not what we say about ourselves.
            </p>
            <p className="mt-5 text-sm text-gray-600" style={{ fontWeight: 300 }}>
              {AWARD.attribution}
            </p>
          </div>
        </MotionWrapper>
      </SectionWrapper>

      {/* Why a local contractor */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <span className="t-eyebrow text-brand-green-text">
            Based in Katy
          </span>
          <h2
            className="t-h2 mt-3 font-gothic text-gray-900"
          >
            Crews stage here, not an hour away.
          </h2>
          <p className="mt-5 text-gray-600" style={{ fontWeight: 300, lineHeight: 1.75 }}>
            Most vendors bidding Katy work dispatch from inside the Loop, and you feel it in the callback time and in what happens when a pipe bursts at 2 a.m. Our office and supply warehouse are on 10th Street, so a Katy address is a short drive rather than a cross-town dispatch.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "Local office and warehouse",
              body: `${COMPANY.address.full} — supplies and equipment stocked on site, not ordered in.`,
            },
            {
              icon: Clock,
              title: "24/7 emergency response",
              body: "A staffed line for spill, flood, and urgent decontamination events, at any hour.",
            },
            {
              icon: Building2,
              title: "Operating here since 2006",
              body: "Two decades of Katy facilities, with the references to match.",
            },
          ].map((item) => (
            <div key={item.title} className="mgs-card flex items-start gap-4 rounded-sm p-5 sm:p-6">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center"
                style={{ background: "rgba(105, 175, 35, 0.1)", borderRadius: "0.5rem" }}
              >
                <item.icon className="h-5 w-5 text-brand-green-text" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600" style={{ fontWeight: 300, lineHeight: 1.65 }}>
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* What we clean in Katy */}
      <SectionWrapper className="bg-paper">
        <div className="max-w-3xl">
          <span className="t-eyebrow text-brand-green-text">
            What we clean in Katy
          </span>
          <h2
            className="t-h2 mt-3 font-gothic text-gray-900"
          >
            Four sectors, each scoped to its own standard.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {SECTORS.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="mgs-card group flex items-start gap-4 rounded-sm p-6"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center"
                style={{ background: "rgba(105, 175, 35, 0.1)", borderRadius: "0.5rem" }}
              >
                <s.icon className="h-5 w-5 text-brand-green-text" aria-hidden="true" />
              </div>
              <div>
                <h3 className="flex items-center gap-1.5 text-base font-semibold text-gray-900">
                  {s.title}
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-1.5 text-sm text-gray-600" style={{ fontWeight: 300, lineHeight: 1.65 }}>
                  {s.body}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Areas served */}
      <SectionWrapper>
        <div className="max-w-3xl">
          <span className="t-eyebrow text-brand-green-text">
            Areas we serve
          </span>
          <h2
            className="t-h2 mt-3 font-gothic text-gray-900"
          >
            Across Katy and the western corridor.
          </h2>
        </div>
        <ul className="mt-8 flex flex-wrap gap-2.5">
          {AREAS.map((area) => (
            <li
              key={area}
              className="border border-gray-200 bg-white px-3.5 py-1.5 text-sm text-gray-700"
              style={{ borderTopLeftRadius: "0.6rem", fontWeight: 300 }}
            >
              {area}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm text-gray-600" style={{ fontWeight: 300, lineHeight: 1.7 }}>
          Outside this list? We cover the greater Houston area —{" "}
          <Link
            href="/quote"
            className="-my-3 inline-block py-3 text-brand-green-text underline underline-offset-2"
          >
            send us the address
          </Link>{" "}
          and we will tell you honestly whether we are the right fit.
        </p>
      </SectionWrapper>

      {/* Local FAQ */}
      <SectionWrapper className="bg-paper-alt">
        <div className="max-w-3xl">
          <span className="t-eyebrow text-brand-green-text">
            Questions
          </span>
          <h2
            className="t-h2 mt-3 font-gothic text-gray-900"
          >
            Katy specifics.
          </h2>
        </div>
        <dl className="mt-10 grid gap-5 lg:grid-cols-2">
          {FAQS.map((f) => (
            <div key={f.q} className="mgs-card rounded-sm p-6">
              <dt className="text-base font-semibold text-gray-900">{f.q}</dt>
              <dd className="mt-2 text-sm text-gray-600" style={{ fontWeight: 300, lineHeight: 1.7 }}>
                {f.a}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/walkthrough"
            className="inline-flex items-center justify-center gap-2 bg-brand-green-deep px-7 py-3.5 font-medium text-brand-on-green transition-all duration-300 hover:bg-brand-green-deep-hover hover:shadow-lg"
            style={{ borderTopLeftRadius: "1.25rem" }}
          >
            Schedule a Katy walkthrough
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={`tel:${COMPANY.phone.primary}`}
            className="inline-flex items-center justify-center gap-2 border-2 border-brand-green-deep px-7 py-3.5 font-medium text-brand-green-text transition-all duration-300 hover:bg-brand-green-deep hover:text-brand-on-green"
            style={{ borderTopLeftRadius: "1.25rem" }}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {COMPANY.phone.display}
          </a>
        </div>
      </SectionWrapper>

      {/* The FAQ band above is the alt paper ground, so the CTA backdrop must
          match it. Kept as a literal because it is a prop, not a class — if
          --color-paper-alt moves, this has to move with it. */}
      <CtaBanner backdrop="#F5F4EC" />
    </>
  );
}
