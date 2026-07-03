"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Stethoscope, Factory, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const serviceCategories = [
  {
    id: "commercial",
    title: "Commercial Cleaning",
    shortTitle: "Commercial",
    icon: Building2,
    description:
      "Cleaning for offices, retail, restaurants, and the other spaces your business runs out of.",
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
    shortTitle: "Medical",
    icon: Stethoscope,
    description:
      "Infection-control cleaning for clinics, labs, and surgical centers — where a wipe-down doesn't cut it.",
    color: "#19A0DB",
    services: [
      { name: "Surgical Centers", link: "/services/surgery-centers", image: "/images/surgery-center.jpg" },
      { name: "Laboratories", link: "/services/laboratories", image: "/images/laboratories image_1752167124287.png" },
      { name: "Imaging Centers", link: "/services/imaging-facilities", image: "/images/imaging center image_1752168794610.png" },
      { name: "Sports Rehab", link: "/services/sports-rehabilitation", image: "/images/sports-rehab.jpg" },
      { name: "Private Practices", link: "/services/clinics", image: "/images/private practice image 2_1752166261770.png" },
    ],
  },
  {
    id: "industrial",
    title: "Industrial Cleaning",
    shortTitle: "Industrial",
    icon: Factory,
    description:
      "Cleaning built for plants, warehouses, and heavy-duty environments.",
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
    shortTitle: "Specialized",
    icon: Wrench,
    description:
      "The jobs that don't fit a standard schedule — post-construction, window work, concrete floors.",
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

export function ServicesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = serviceCategories[activeIndex];
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Animate header on first scroll into view
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-header-el",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards when tab changes
  const animateCards = useCallback(() => {
    if (!contentRef.current) return;
    const cards = contentRef.current.querySelectorAll(".svc-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
    );
    // Animate description bar
    const bar = contentRef.current.querySelector(".svc-desc");
    if (bar) {
      gsap.fromTo(bar, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
    }
  }, []);

  useEffect(() => {
    animateCards();
  }, [activeIndex, animateCards]);

  const handleTabClick = (i: number) => {
    if (i === activeIndex) return;
    // Quick fade out current cards
    if (contentRef.current) {
      const cards = contentRef.current.querySelectorAll(".svc-card");
      gsap.to(cards, {
        opacity: 0, y: -15, duration: 0.2, stagger: 0.03,
        ease: "power2.in",
        onComplete: () => setActiveIndex(i),
      });
    } else {
      setActiveIndex(i);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FBFBFE]"
      style={{
        paddingTop: 'clamp(3rem, 5vw, 5rem)',
        paddingBottom: 'clamp(3rem, 5vw, 5rem)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section header */}
        <div ref={headerRef} className="mb-10 lg:mb-14">
          <p className="svc-header-el eyebrow text-[#69AF23] mb-4 opacity-0">Our Services</p>
          <h2
            className="svc-header-el font-gothic text-gray-900 opacity-0"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            What we <span className="text-[#69AF23]">do.</span>
          </h2>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-10 lg:mb-14 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          {serviceCategories.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = i === activeIndex;
            return (
              <button
                key={cat.id}
                onClick={() => handleTabClick(i)}
                className={cn(
                  "group flex items-center gap-2.5 px-5 py-3 text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0",
                  isActive
                    ? "text-white shadow-lg"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
                )}
                style={{
                  borderTopLeftRadius: '1.25rem',
                  borderBottomRightRadius: '0.25rem',
                  borderTopRightRadius: '0.25rem',
                  borderBottomLeftRadius: '0.25rem',
                  ...(isActive ? { backgroundColor: cat.color } : {}),
                }}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {cat.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Active category content */}
          <div ref={contentRef} key={active.id}>
            {/* Description bar */}
            <div className="svc-desc flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="h-8 w-1 rounded-full"
                  style={{ backgroundColor: active.color }}
                />
                <h3
                  className="font-gothic text-gray-900"
                  style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', fontWeight: 400 }}
                >
                  {active.title}
                </h3>
              </div>
              <p className="text-gray-500 text-sm max-w-md" style={{ fontWeight: 300, lineHeight: 1.6 }}>
                {active.description}
              </p>
            </div>

            {/* Service cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-6">
              {active.services.map((service, serviceIndex) => (
                <div key={service.name} className="svc-card opacity-0">
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
                      {/* Color accent line at top */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: active.color }}
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#69AF23] transition-colors">
                        {service.name}
                      </h3>
                      <ArrowRight className="h-4 w-4 mt-2 text-gray-400 group-hover:text-[#69AF23] transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#69AF23] hover:text-[#5a9a1e] transition-colors"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
