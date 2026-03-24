"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DropletAccent } from "@/components/shared/droplet-accent";

const unsplashUrl = (id: string) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600`;

const serviceCategories = [
  {
    id: "commercial",
    title: "Commercial Cleaning",
    eyebrow: "COMMERCIAL",
    description:
      "Elevate your business environment with comprehensive cleaning solutions designed for professional spaces.",
    color: "#69AF23",
    services: [
      { name: "Multi-Tenant Offices", link: "/services/multi-tenant-offices", image: "photo-1497366216548-37526070297c" },
      { name: "Retail Spaces", link: "/services/retail-facilities", image: "photo-1441986300917-64674bd600d8" },
      { name: "Restaurants", link: "/services/restaurants", image: "photo-1414235077428-338989a2e8c0" },
      { name: "Gymnasiums", link: "/services/gymnasiums", image: "photo-1534438327276-14e5300c3a48" },
      { name: "Car Dealerships", link: "/services/car-dealerships", image: "photo-1562694583-0671889972d9" },
    ],
  },
  {
    id: "medical",
    title: "Medical Facilities",
    eyebrow: "MEDICAL",
    description:
      "Specialized cleaning protocols that meet the highest healthcare standards for infection control.",
    color: "#2196F3",
    services: [
      { name: "Surgical Centers", link: "/services/surgery-centers", image: "photo-1559757148-5c350d0d3c56" },
      { name: "Laboratories", link: "/services/laboratories", image: "photo-1582719471384-894fbb16e074" },
      { name: "Imaging Centers", link: "/services/imaging-facilities", image: "photo-1551190822-a9333d879b1f" },
      { name: "Sports Rehab", link: "/services/sports-rehabilitation", image: "photo-1576091160550-2173dba999ef" },
      { name: "Private Practices", link: "/services/clinics", image: "photo-1666214280557-f1b5022eb634" },
    ],
  },
  {
    id: "industrial",
    title: "Industrial Cleaning",
    eyebrow: "INDUSTRIAL",
    description:
      "Robust cleaning services designed for manufacturing, processing, and heavy-duty environments.",
    color: "#FF8F00",
    services: [
      { name: "Factory Plants", link: "/services/factory-plants", image: "photo-1565793298595-6a879b1d9492" },
      { name: "Petrochemical Plants", link: "/services/petrochemical-plants", image: "photo-1518709268805-4e9042af2176" },
      { name: "Warehouses", link: "/services/warehouses", image: "photo-1566041510394-cf7c8fe21800" },
      { name: "Hydroelectric Plants", link: "/services/hydroelectric-plants", image: "photo-1473341304170-971dccb5ac1e" },
    ],
  },
  {
    id: "specialized",
    title: "Specialized Services",
    eyebrow: "SPECIALIZED",
    description:
      "Advanced cleaning for unique requirements and challenging environments.",
    color: "#9FD01B",
    services: [
      { name: "Post-Construction", link: "/services/post-construction", image: "photo-1541888946425-d81bb19240f5" },
      { name: "Industrial Cleanup", link: "/services/industrial-cleanup", image: "photo-1581578731548-c64695cc6952" },
      { name: "Window Cleaning", link: "/services/windows", image: "photo-1462826303086-329426d1aef5" },
      { name: "Terminal Sanitization", link: "/services/terminal-sanitization", image: "photo-1584982751601-97dcc096659c" },
      { name: "Concrete Floors", link: "/services/concrete-floors", image: "photo-1558618666-fcd25c85cd64" },
    ],
  },
];

const sectionBgs = ["bg-[#f0f5e8]", "bg-white", "bg-[#f5f5f5]", "bg-white"];

function CategorySection({
  category,
  index,
}: {
  category: (typeof serviceCategories)[0];
  index: number;
}) {
  return (
    <section
      id={`category-${category.id}`}
      className={`relative w-full overflow-hidden ${sectionBgs[index]}`}
      style={{
        paddingTop: 'clamp(3rem, 5vw, 5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 5rem)',
        borderTopLeftRadius: index > 0 ? 'clamp(2rem, 4vw, 4rem)' : undefined,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Pfizer-style header: eyebrow + heading left, description right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-12 lg:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-4"
              style={{ color: category.color }}
            >
              <DropletAccent color={category.color} size={13} />
              {category.eyebrow}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-gothic text-gray-900"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              {category.title.split(' ')[0]}{' '}
              <span style={{ color: category.color }}>
                {category.title.split(' ').slice(1).join(' ')}
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-end"
          >
            <p className="text-gray-600 text-base" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              {category.description}
            </p>
          </motion.div>
        </div>

        {/* Card grid — 2 cols mobile, 3 cols tablet, responsive for 4-5 items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-6">
          {category.services.map((service, serviceIndex) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: serviceIndex * 0.08,
              }}
            >
              <Link
                href={service.link}
                className="group relative block overflow-hidden bg-white shadow-premium transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-2"
                style={{ borderTopLeftRadius: '1.5rem' }}
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={unsplashUrl(service.image)}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Label */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#69AF23] transition-colors">
                    {service.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 mt-2 text-gray-400 group-hover:text-[#69AF23] transition-all duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesGrid() {
  useEffect(() => {
    serviceCategories.forEach((cat) => {
      cat.services.forEach((s) => {
        const sImg = new window.Image();
        sImg.src = unsplashUrl(s.image);
      });
    });
  }, []);

  return (
    <>
      {serviceCategories.map((category, index) => (
        <CategorySection key={category.id} category={category} index={index} />
      ))}
    </>
  );
}
