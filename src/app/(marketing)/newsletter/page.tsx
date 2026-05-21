import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { Newspaper, Clock, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "MGS Field Brief — Monthly Newsletter",
  description:
    "Practical updates from MGS Supply & Services. One short email a month with field notes, supply pricing, and industry calls-outs for facility managers.",
  openGraph: {
    title: "MGS Field Brief — Monthly Newsletter",
    description:
      "One useful email a month from MGS Supply & Services. Field notes, supply pricing, and industry calls-outs for facility managers.",
    type: "website",
  },
};

const features = [
  {
    icon: Newspaper,
    title: "Field notes",
    body: "What our drivers and techs are actually seeing — facility-side trends before they show up in trade press.",
  },
  {
    icon: Clock,
    title: "Once a month",
    body: "Short, focused, no fluff. Land in your inbox, take 3 minutes, get back to running your building.",
  },
  {
    icon: Mail,
    title: "One-click unsubscribe",
    body: "Every issue has a link. We respect inbox time — if it's not useful, you should be able to leave instantly.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <PageHeader
        title="The MGS Field Brief"
        subtitle="Monthly. Useful. Written for facility managers, by the people in the field."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Newsletter" },
        ]}
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <NewsletterForm
              source="website_newsletter_page"
              variant="card"
              heading="Subscribe."
              blurb="Drop your email. We send one short issue a month with what's actually moving in facility ops."
            />
          </div>

          <div className="lg:col-span-2">
            <ul className="space-y-6">
              {features.map((f) => (
                <li key={f.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-brand-green/10 text-brand-green">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-gray-900">
                      {f.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
