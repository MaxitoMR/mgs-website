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
  // Commercial
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Commercial-3_1751305978237.jpg", category: "Commercial", alt: "Commercial cleaning" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Commercial-4_1751323808588.jpg", category: "Commercial", alt: "Office cleaning" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Commercial-9-1536x1152_1752007287553.jpg", category: "Commercial", alt: "Commercial facility" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Commercial-10_1752003221911.jpg", category: "Commercial", alt: "Commercial services" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Commercial-11_1752003063871.jpg", category: "Commercial", alt: "Retail cleaning" },
  // Medical
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Medical_Sterilization-1-768x1024_1752603315092.jpg", category: "Medical", alt: "Medical sterilization" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Medical_Sterilization-7-768x1024_1752603341667.jpg", category: "Medical", alt: "Hospital sanitization" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Medical_Sterilization-9-1536x1152_1752603436540.jpg", category: "Medical", alt: "Healthcare cleaning" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Sanitizing-1_1752167117841.jpg", category: "Medical", alt: "Sanitizing services" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Sanitizing-3_1752528648365.jpg", category: "Medical", alt: "Disinfection services" },
  // Concrete
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Concrete-1_1752594857721.jpg", category: "Concrete", alt: "Concrete floor polishing" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Concrete-2_1752594857721.jpg", category: "Concrete", alt: "Concrete coating" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Concrete-5_1752594857722.jpg", category: "Concrete", alt: "Concrete restoration" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Concrete-7_1752594857723.jpg", category: "Concrete", alt: "Floor finishing" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Concrete-10_1752594857723.jpg", category: "Concrete", alt: "Concrete maintenance" },
  // VCT/Industrial
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-VCT_Floor-1_1752594965441.jpg", category: "Industrial", alt: "VCT floor care" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-VCT_Floor-2_1752594969143.jpg", category: "Industrial", alt: "Floor stripping" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-VCT_Floor-3_1752594969143.jpg", category: "Industrial", alt: "Floor waxing" },
  // Specialized
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Special_Clean-18_1751918025461.jpg", category: "Specialized", alt: "Specialized cleaning" },
  { src: "/attached_assets/MGS_Supply_And_Services_Gallery-Carpet_Shampooing-1_1752528755838.jpg", category: "Specialized", alt: "Carpet shampooing" },
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
