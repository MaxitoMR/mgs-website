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
  { src: "/images/services/4a7ffe20-cb17-4d46-9434-76a526c68257_1767643062610-sMYPZHkq.jpg", category: "Commercial", alt: "Commercial cleaning" },
  { src: "/images/services/15bb683b-a628-463a-842b-4e61212a5dc2_1767643055559-DLNZ6rtn.jpg", category: "Commercial", alt: "Office cleaning" },
  { src: "/images/services/f7990ebd-7762-4961-bb15-60648046f3b4_1767643158635-DqH5-qtO.jpg", category: "Industrial", alt: "Industrial facility" },
  { src: "/images/services/13861450-daa5-4248-bb08-de14e018fd16_1767643162967-C7NIC8Ex.jpg", category: "Commercial", alt: "Office building" },
  { src: "/images/services/d865150d-7215-4494-bbdf-06ccbe397679_1767643388358-BGdRjNKS.jpg", category: "Industrial", alt: "Industrial cleaning" },
  { src: "/images/services/ab8693e4-5b4d-401a-8dd4-0940e4b26366_1767643390203-3vwITDI4.jpg", category: "Specialized", alt: "Specialized cleaning" },
  { src: "/images/services/46d54f10-ed35-44a7-89ce-19eb8f9ebbfb_1767643425721-BVQrG0Tg.jpg", category: "Commercial", alt: "School cleaning" },
  { src: "/images/services/a9826249-9689-4a7d-bfd2-9675ebac083a_1767643428382-B6DbbN7F.jpg", category: "Medical", alt: "Medical facility" },
  { src: "/images/services/10058993-6a9c-45d5-b3a5-d8635899bae7_1767644062493-BSaFDC1I.jpg", category: "Medical", alt: "Clinical cleaning" },
  { src: "/images/services/338a6f3d-4f6d-49dc-9e4b-0043852bf68c_1767644054741-BZeABH9x.jpg", category: "Medical", alt: "Surgery center cleaning" },
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
