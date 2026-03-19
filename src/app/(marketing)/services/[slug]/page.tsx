import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ServiceCard } from "@/components/shared/service-card";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { JsonLd } from "@/components/seo/json-ld";
import {
  services,
  getServiceBySlug,
  getServicesByCategory,
  getAllSlugs,
} from "@/lib/services-data";
import { COMPANY } from "@/lib/constants";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.description,
    openGraph: {
      title: `${service.title} | ${COMPANY.name}`,
      description: service.description,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getServicesByCategory(service.category)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        type="Service"
        data={{
          name: service.title,
          description: service.longDescription,
          provider: {
            "@type": "LocalBusiness",
            name: COMPANY.name,
            url: COMPANY.url,
          },
          areaServed: "Greater Houston, TX",
        }}
      />

      <PageHeader
        title={service.title}
        subtitle={service.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      />

      <SectionWrapper>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={service.image}
              alt={service.title}
              width={800}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              About This Service
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              {service.longDescription}
            </p>

            <div className="mt-8">
              <h3 className="font-display text-lg font-bold text-gray-900">
                What&apos;s Included
              </h3>
              <ul className="mt-4 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/quote"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-8 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-brand-lime hover:shadow-lg"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand-green px-8 py-3.5 font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-white"
              >
                <Phone className="h-5 w-5" />
                {COMPANY.phone.display}
              </a>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 rounded-2xl bg-brand-green/5 p-8 lg:p-12">
          <h3 className="font-display text-2xl font-bold text-gray-900">
            Key Benefits
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-sm"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Related Services */}
      {related.length > 0 && (
        <SectionWrapper className="bg-gray-50">
          <h2 className="mb-8 font-display text-2xl font-bold text-gray-900">
            Related Services
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </SectionWrapper>
      )}

      <CtaBanner />
    </>
  );
}
