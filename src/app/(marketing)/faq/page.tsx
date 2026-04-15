import type { Metadata } from "next";
import FAQContent from "./faq-content";
import { faqCategories } from "@/lib/faq-data";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers to common questions about MGS Supply & Services — pricing, service areas, cleaning schedules, medical-grade sanitization, billing, and how to get started.",
  openGraph: {
    title: "Frequently Asked Questions | MGS Supply & Services",
    description:
      "Answers to common questions about our janitorial services, pricing, and processes.",
  },
};

export default function FAQPage() {
  const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

  return (
    <>
      <JsonLd
        type="FAQPage"
        data={{
          mainEntity: allFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }}
      />
      <FAQContent />
    </>
  );
}
