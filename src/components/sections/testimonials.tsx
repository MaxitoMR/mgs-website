"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Facility Manager, Memorial Hospital",
    text: "MGS has transformed our facility maintenance. Their medical-grade cleaning protocols and ATP testing verification give us complete confidence in our infection control compliance.",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Michael Torres",
    title: "Operations Director, Houston Commerce Center",
    text: "We manage a 500,000 sq ft multi-tenant office complex. MGS handles everything seamlessly — from individual suite cleaning to common areas. Their consistency is unmatched.",
    rating: 5,
    initials: "MT",
  },
  {
    name: "David Chen",
    title: "Plant Manager, Gulf Coast Petrochemicals",
    text: "Finding a cleaning service that understands HAZWOPER protocols and industrial safety requirements is rare. MGS delivers every time with certified teams and proper documentation.",
    rating: 5,
    initials: "DC",
  },
  {
    name: "Lisa Williams",
    title: "Principal, Katy Independent School",
    text: "The difference MGS made in our school is visible daily. Classrooms are spotless, restrooms are always stocked, and their team is respectful of our educational environment.",
    rating: 5,
    initials: "LW",
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <SectionWrapper>
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
          className="subtitle inline-block text-brand-green"
        >
          Testimonials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="mt-4 font-display text-4xl font-extrabold tracking-[-0.02em] text-gray-900 sm:text-5xl"
        >
          What Our Clients Say
        </motion.h2>
      </div>

      <div className="relative mt-16">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-8 shadow-premium transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-1">
                  {/* Gradient border accent on hover */}
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-green to-brand-lime opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Large decorative quote */}
                  <Quote className="mb-5 h-10 w-10 text-brand-green/10" />

                  {/* Stars */}
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-brand-lime text-brand-lime"
                      />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-[15px] leading-relaxed text-gray-600">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                    {/* Avatar placeholder */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-lime text-sm font-bold text-white">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-display text-[15px] font-bold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={scrollPrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-400 shadow-sm transition-all duration-300 hover:border-brand-green hover:text-brand-green hover:shadow-green-glow"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  selectedIndex === i
                    ? "w-10 bg-gradient-to-r from-brand-green to-brand-lime"
                    : "w-2 bg-gray-200 hover:bg-gray-300"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={scrollNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-gray-400 shadow-sm transition-all duration-300 hover:border-brand-green hover:text-brand-green hover:shadow-green-glow"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
