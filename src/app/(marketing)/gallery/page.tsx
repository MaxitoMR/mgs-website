"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { cn } from "@/lib/utils";

const categories = ["All", "Commercial", "Medical", "Industrial", "Concrete", "Specialized"];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop", category: "Commercial", alt: "Commercial office cleaning" },
  { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", category: "Commercial", alt: "Modern office building" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop", category: "Industrial", alt: "Industrial facility cleaning" },
  { src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop", category: "Commercial", alt: "Professional cleaning team" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop", category: "Commercial", alt: "Restaurant deep cleaning" },
  { src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop", category: "Specialized", alt: "Power washing services" },
  { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop", category: "Commercial", alt: "School facility maintenance" },
  { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop", category: "Medical", alt: "Medical clinic sanitization" },
  { src: "https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=800&h=600&fit=crop", category: "Medical", alt: "Surgery center cleaning" },
  { src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop", category: "Medical", alt: "Healthcare facility" },
  { src: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=800&h=600&fit=crop", category: "Concrete", alt: "Concrete floor polishing" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop", category: "Industrial", alt: "Warehouse cleaning" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <PageHeader
        title="Our Work"
        subtitle="See the MGS difference in action across commercial, medical, and industrial facilities."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      <SectionWrapper>
        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-brand-green text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((image) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setLightboxImage(image.src)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SectionWrapper>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt="Gallery image"
                width={1200}
                height={900}
                className="max-h-[85vh] w-auto rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
