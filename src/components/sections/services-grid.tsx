"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    id: "commercial",
    title: "Commercial Cleaning",
    eyebrow: "COMMERCIAL",
    description:
      "Elevate your business environment with comprehensive cleaning solutions designed for professional spaces.",
    color: "#69AF23",
    services: [
      { name: "Multi-Tenant Offices", link: "/services/multi-tenant-offices", image: "/images/1_1751323808589.png" },
      { name: "Retail Spaces", link: "/services/retail-facilities", image: "/images/MGS_Supply_And_Services_Gallery-Commercial-10_1752003221911.jpg" },
      { name: "Restaurants", link: "/services/restaurants", image: "/images/Official_About_Us_Background_1752010002961.png" },
      { name: "Gymnasiums", link: "/services/gymnasiums", image: "/images/school image_1752005095720.png" },
      { name: "Car Dealerships", link: "/services/car-dealerships", image: "/images/Car Dealership pic 2_1752160411184.png" },
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
      { name: "Surgical Centers", link: "/services/surgery-centers", image: "/images/surgery center image 2_1752526747820.jpg" },
      { name: "Laboratories", link: "/services/laboratories", image: "/images/laboratories image_1752167124287.png" },
      { name: "Imaging Centers", link: "/services/imaging-facilities", image: "/images/imaging center image_1752168794610.png" },
      { name: "Sports Rehab", link: "/services/sports-rehabilitation", image: "/images/sports n rehab image_1752182551586.png" },
      { name: "Private Practices", link: "/services/clinics", image: "/images/private practice image 2_1752166261770.png" },
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
      { name: "Factory Plants", link: "/services/factory-plants", image: "/images/factory plant image_1752262345888.png" },
      { name: "Petrochemical Plants", link: "/services/petrochemical-plants", image: "/images/commercial-claning-housong-chemical-plants_1752268757986.jpeg" },
      { name: "Warehouses", link: "/services/warehouses", image: "/images/IMG_1741_1751917994935.JPG" },
      { name: "Hydroelectric Plants", link: "/services/hydroelectric-plants", image: "/images/10_1752185091077.png" },
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
      { name: "Post-Construction", link: "/services/post-construction", image: "/images/post construction image_1752524176668.png" },
      { name: "Industrial Cleanup", link: "/services/industrial-cleanup", image: "/images/9_1752184097090.png" },
      { name: "Window Cleaning", link: "/services/windows", image: "/images/7_1752264862114.png" },
      { name: "Terminal Sanitization", link: "/services/terminal-sanitization", image: "/images/terminal sanitization_1752528525894.png" },
      { name: "Concrete Floors", link: "/services/concrete-floors", image: "/images/MGS_Supply_And_Services_Gallery-Concrete-8_1752005273591.jpg" },
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
        {/* Header: eyebrow + heading left, description right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 mb-12 lg:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow mb-4"
              style={{ color: category.color }}
            >
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

        {/* Card grid */}
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
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

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
  return (
    <>
      {serviceCategories.map((category, index) => (
        <CategorySection key={category.id} category={category} index={index} />
      ))}
    </>
  );
}
