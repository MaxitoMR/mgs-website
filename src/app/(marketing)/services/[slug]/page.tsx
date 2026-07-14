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
          serviceType: service.title,
          description: service.longDescription,
          url: `${COMPANY.url}/services/${service.slug}`,
          image: `${COMPANY.url}${service.image}`,
          provider: {
            "@type": "LocalBusiness",
            name: COMPANY.name,
            url: COMPANY.url,
            telephone: COMPANY.phone.display,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.address.street,
              addressLocality: COMPANY.address.city,
              addressRegion: COMPANY.address.state,
              postalCode: COMPANY.address.zip,
              addressCountry: "US",
            },
          },
          areaServed: { "@type": "City", name: "Houston" },
        }}
      />
      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: COMPANY.url },
            { "@type": "ListItem", position: 2, name: "Services", item: `${COMPANY.url}/services` },
            {
              "@type": "ListItem",
              position: 3,
              name: service.shortTitle,
              item: `${COMPANY.url}/services/${service.slug}`,
            },
          ],
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
          <div className="overflow-hidden rounded-none">
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
                className="group inline-flex items-center justify-center gap-2 rounded-none bg-brand-green px-8 py-3.5 font-semibold text-white shadow-md transition-all hover:bg-brand-lime hover:shadow-lg"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${COMPANY.phone.primary}`}
                className="inline-flex items-center justify-center gap-2 rounded-none border-2 border-brand-green px-8 py-3.5 font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-white"
              >
                <Phone className="h-5 w-5" />
                {COMPANY.phone.display}
              </a>
            </div>
          </div>
        </div>

        {/* Gallery — each photo as its own feature row, image side alternating.
            Handles any count and any aspect ratio without cropping. */}
        {service.gallery && service.gallery.length > 0 && (
          <div className="mt-20 space-y-14 lg:space-y-20">
            {service.gallery.map((g, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={g.src}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div
                    className={`mgs-card overflow-hidden ${flip ? "lg:order-2" : ""}`}
                    style={{ borderTopLeftRadius: "clamp(1.5rem, 3vw, 3rem)" }}
                  >
                    <Image
                      src={g.src}
                      alt={g.title ?? `${service.title} on site`}
                      width={1200}
                      height={900}
                      sizes="(min-width:1024px) 36rem, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className={flip ? "lg:order-1" : ""}>
                    {i === 0 && (
                      <p className="eyebrow mb-3 text-brand-green">A closer look</p>
                    )}
                    <h3 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
                      {g.title ?? service.shortTitle}
                    </h3>
                    {g.caption && (
                      <p className="mt-5 text-lg leading-relaxed text-gray-600">
                        {g.caption}
                      </p>
                    )}
                    <div className="mt-6 h-1 w-16 rounded-full bg-brand-green" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Benefits */}
        <div className="mt-16 rounded-none bg-brand-green/5 p-8 lg:p-12">
          <h3 className="font-display text-2xl font-bold text-gray-900">
            Key Benefits
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-none bg-white p-4 shadow-sm"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none bg-brand-green text-white">
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
