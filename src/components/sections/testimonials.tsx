"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
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
    <section
      className="relative w-full overflow-hidden bg-[#f0f5e8]"
      style={{
        paddingTop: 'clamp(2rem, 8vw, 8rem)',
        paddingBottom: 'clamp(2rem, 8vw, 8rem)',
        borderTopLeftRadius: 'clamp(2rem, 4vw, 4rem)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header with nav controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-brand-green-text mb-4"
            >
Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-gothic text-gray-900"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', fontWeight: 300, lineHeight: 1.1 }}
            >
              What our clients{' '}
              <span className="text-brand-green-text">say.</span>
            </motion.h2>
          </div>
          <div className="flex items-end">
            <div className="flex items-center gap-4 lg:ml-auto">
              <button
                onClick={scrollPrev}
                className="flex h-12 w-12 items-center justify-center border border-gray-300 text-gray-500 transition-all duration-300 hover:border-[#69AF23] hover:text-brand-green-text"
                style={{ borderTopLeftRadius: '0.75rem' }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                className="flex h-12 w-12 items-center justify-center border border-gray-300 text-gray-500 transition-all duration-300 hover:border-[#69AF23] hover:text-brand-green-text"
                style={{ borderTopLeftRadius: '0.75rem' }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_100%] px-3 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div
                  className="group relative h-full overflow-hidden bg-white p-8 shadow-premium transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-1"
                  style={{ borderTopLeftRadius: '2rem' }}
                >
                  <Quote className="mb-5 h-10 w-10 text-brand-green-text/10" />

                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-[#9FD01B] text-[#9FD01B]" />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm" style={{ fontWeight: 300, lineHeight: 1.8 }}>
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center gap-4 border-t border-gray-100 pt-6">
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-brand-green-deep text-sm font-medium text-brand-on-green"
                      style={{ borderTopLeftRadius: '0.75rem' }}
                    >
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5" style={{ fontWeight: 300 }}>
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 transition-all duration-300",
                selectedIndex === i ? "w-10 bg-[#69AF23]" : "w-2 bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
