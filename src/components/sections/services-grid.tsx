"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Building2, Stethoscope, Factory, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import { getServiceBySlug } from "@/lib/services-data";

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

function shortDesc(link: string): string | undefined {
  const slug = link.replace("/services/", "");
  return getServiceBySlug(slug)?.description;
}

// Bento span per tile. Tile 0 is the big feature (2×2). To keep the mosaic
// gap-free, a 4-service sector makes its last tile a wide 2×1; the big tile
// alternates side per sector so no two categories read the same.
function tileSpan(i: number, total: number, bigOnRight: boolean): string {
  if (i === 0) {
    return bigOnRight
      ? "col-span-2 row-span-2 lg:col-start-3"
      : "col-span-2 row-span-2";
  }
  if (total === 4 && i === total - 1) return "col-span-2";
  return "";
}

export function ServicesGrid() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = serviceCategories[activeIndex];
  const bigOnRight = activeIndex % 2 === 1;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-header-el",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const animateTiles = useCallback(() => {
    if (!gridRef.current) return;
    const tiles = gridRef.current.querySelectorAll(".svc-tile");
    gsap.fromTo(
      tiles,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    animateTiles();
  }, [activeIndex, animateTiles]);

  const handleTabClick = (i: number) => {
    if (i === activeIndex) return;
    if (gridRef.current) {
      const tiles = gridRef.current.querySelectorAll(".svc-tile");
      gsap.to(tiles, {
        opacity: 0, y: -12, duration: 0.2, stagger: 0.02,
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
      className="relative w-full overflow-hidden bg-[#F4F4F5]"
      style={{ paddingTop: "clamp(3.5rem, 6vw, 6rem)", paddingBottom: "clamp(3.5rem, 6vw, 6rem)" }}
    >
      <div className="mx-auto max-w-[92rem] px-5 sm:px-8 lg:px-12">
        {/* Header + tabs on one baseline */}
        <div className="mb-8 flex flex-col gap-6 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="svc-header-el eyebrow mb-3 text-[#69AF23] opacity-0">Our Services</p>
            <h2
              className="svc-header-el font-gothic text-gray-900 opacity-0"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3.25rem)", fontWeight: 300, lineHeight: 1.05 }}
            >
              What we <span className="text-[#69AF23]">do.</span>
            </h2>
          </div>

          {/* Category tabs */}
          <div className="svc-header-el flex gap-2 overflow-x-auto pb-1 opacity-0 scrollbar-hide">
            {serviceCategories.map((cat, i) => {
              const Icon = cat.icon;
              const isActive = i === activeIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleTabClick(i)}
                  className={cn(
                    "group flex flex-shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-all duration-300",
                    isActive ? "text-white shadow-lg" : "bg-white text-gray-600 ring-1 ring-rgray-5 hover:text-gray-900",
                  )}
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderBottomRightRadius: "0.2rem",
                    borderTopRightRadius: "0.2rem",
                    borderBottomLeftRadius: "0.2rem",
                    ...(isActive ? { backgroundColor: cat.color } : {}),
                  }}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600")} />
                  {cat.shortTitle}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sector line — colored rule + title + description */}
        <div key={`${active.id}-head`} className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: active.color }} />
            <h3 className="font-gothic text-gray-900" style={{ fontSize: "clamp(1.35rem, 2.2vw, 2rem)", fontWeight: 400 }}>
              {active.title}
            </h3>
          </div>
          <p className="max-w-xl text-sm text-gray-500" style={{ fontWeight: 300, lineHeight: 1.6 }}>
            {active.description}
          </p>
        </div>

        {/* Bento mosaic */}
        <div
          ref={gridRef}
          key={active.id}
          className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          style={{ gridAutoRows: "minmax(clamp(11rem, 16vw, 17.5rem), 1fr)", gridAutoFlow: "dense" }}
        >
          {active.services.map((service, i) => {
            const isBig = i === 0;
            const desc = isBig ? shortDesc(service.link) : undefined;
            return (
              <Link
                key={service.name}
                href={service.link}
                className={cn(
                  "svc-tile group relative block overflow-hidden opacity-0 shadow-premium transition-shadow duration-500 hover:shadow-premium-lg",
                  tileSpan(i, active.services.length, bigOnRight),
                )}
                style={{ borderTopLeftRadius: isBig ? "2rem" : "1.25rem" }}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  sizes={isBig ? "(max-width:1024px) 100vw, 46vw" : "(max-width:640px) 50vw, 23vw"}
                />

                {/* Legibility gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                {/* Category-tinted wash on hover */}
                <div
                  className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-30"
                  style={{ backgroundColor: active.color }}
                />
                {/* Top accent that wipes in on hover */}
                <div
                  className="absolute left-0 top-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: active.color }}
                />

                {/* Big feature watermark icon */}
                {isBig && (
                  <active.icon
                    className="absolute right-5 top-5 h-10 w-10 text-white/20"
                    strokeWidth={1.5}
                  />
                )}

                {/* Content */}
                <div className={cn("absolute inset-x-0 bottom-0 flex flex-col", isBig ? "p-6 lg:p-8" : "p-4")}>
                  {isBig && (
                    <span
                      className="mb-2 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white"
                      style={{ backgroundColor: active.color }}
                    >
                      Featured
                    </span>
                  )}
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <h4
                        className={cn("font-gothic font-medium text-white", isBig ? "text-2xl lg:text-3xl" : "text-sm sm:text-base")}
                        style={{ letterSpacing: "-0.01em", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
                      >
                        {service.name}
                      </h4>
                      {desc && (
                        <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-white/75 lg:block">
                          {desc}
                        </p>
                      )}
                    </div>
                    <span
                      className={cn(
                        "flex flex-shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:bg-white",
                        isBig ? "h-11 w-11" : "h-8 w-8",
                      )}
                    >
                      <ArrowUpRight
                        className={cn("text-white transition-colors group-hover:text-gray-900", isBig ? "h-5 w-5" : "h-4 w-4")}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-8 flex justify-center lg:mt-10">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-[#69AF23]"
          >
            View all services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
