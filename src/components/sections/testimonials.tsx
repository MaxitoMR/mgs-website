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
  },
  {
    name: "Michael Torres",
    title: "Operations Director, Houston Commerce Center",
    text: "We manage a 500,000 sq ft multi-tenant office complex. MGS handles everything seamlessly — from individual suite cleaning to common areas. Their consistency is unmatched.",
    rating: 5,
  },
  {
    name: "David Chen",
    title: "Plant Manager, Gulf Coast Petrochemicals",
    text: "Finding a cleaning service that understands HAZWOPER protocols and industrial safety requirements is rare. MGS delivers every time with certified teams and proper documentation.",
    rating: 5,
  },
  {
    name: "Lisa Williams",
    title: "Principal, Katy Independent School",
    text: "The difference MGS made in our school is visible daily. Classrooms are spotless, restrooms are always stocked, and their team is respectful of our educational environment.",
    rating: 5,
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
          className="inline-block text-sm font-bold uppercase tracking-widest text-brand-green"
        >
          Testimonials
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-3xl font-bold text-gray-900 sm:text-4xl"
        >
          What Our Clients Say
        </motion.h2>
      </div>

      <div className="relative mt-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_100%] px-4 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                  <Quote className="mb-4 h-8 w-8 text-brand-green/30" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-brand-lime text-brand-lime"
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="font-display font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={scrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all hover:border-brand-green hover:text-brand-green"
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
                  "h-2 rounded-full transition-all",
                  selectedIndex === i
                    ? "w-8 bg-brand-green"
                    : "w-2 bg-gray-300"
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={scrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-all hover:border-brand-green hover:text-brand-green"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
