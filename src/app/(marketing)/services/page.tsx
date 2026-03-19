import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { ServiceCard } from "@/components/shared/service-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { services, serviceCategories, getServicesByCategory } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore our comprehensive janitorial services for commercial, medical, and industrial facilities. 25+ specialized cleaning solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle={`${services.length}+ specialized cleaning solutions for every facility type.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      {serviceCategories.map((category) => {
        const categoryServices = getServicesByCategory(category.id);
        return (
          <SectionWrapper key={category.id} id={category.id}>
            <div className="mb-10">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-green">
                {category.name}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-gray-900 sm:text-3xl">
                {category.description}
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryServices.map((service, i) => (
                <ServiceCard key={service.slug} service={service} index={i} />
              ))}
            </div>
          </SectionWrapper>
        );
      })}

      <CtaBanner />
    </>
  );
}
