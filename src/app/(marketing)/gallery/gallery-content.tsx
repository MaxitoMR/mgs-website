"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { BeforeAfterSlider } from "@/components/shared/before-after-slider";
import { cn } from "@/lib/utils";

const categories = ["All", "Commercial", "Medical", "Industrial", "Concrete", "Specialized"];

const galleryImages = [
  { src: "/images/MGS_Supply_And_Services_Gallery-Commercial-3_1751305978237.jpg", category: "Commercial", alt: "Commercial cleaning" },
  { src: "/images/MGS_Supply_And_Services_Gallery-Commercial-10_1752003221911.jpg", category: "Commercial", alt: "Commercial services" },
  { src: "/images/1_1751323808589.png", category: "Commercial", alt: "Office door cleaning" },
  { src: "/images/school image_1752005095720.png", category: "Commercial", alt: "Gym floor waxing" },
  { src: "/images/Official_About_Us_Background_1752010002961.png", category: "Commercial", alt: "Carpet cleaning" },
  { src: "/images/surgery center image 2_1752526747820.jpg", category: "Medical", alt: "Surgery center cleaning" },
  { src: "/images/imaging center image_1752168794610.png", category: "Medical", alt: "CT scanner cleaning" },
  { src: "/images/laboratories image_1752167124287.png", category: "Medical", alt: "Laboratory cleaning" },
  { src: "/images/private practice image 2_1752166261770.png", category: "Medical", alt: "Recovery bay cleaning" },
  { src: "/images/terminal sanitization_1752528525894.png", category: "Medical", alt: "Terminal sanitization" },
  { src: "/images/IMG_1741_1751917994935.JPG", category: "Industrial", alt: "Warehouse cleaning" },
  { src: "/images/factory plant image_1752262345888.png", category: "Industrial", alt: "Factory floor stripping" },
  { src: "/images/commercial-claning-housong-chemical-plants_1752268757986.jpeg", category: "Industrial", alt: "Chemical plant cleaning" },
  { src: "/images/10_1752185091077.png", category: "Industrial", alt: "HVAC duct cleaning" },
  { src: "/images/MGS_Supply_And_Services_Gallery-Concrete-8_1752005273591.jpg", category: "Concrete", alt: "Concrete floor polishing" },
  { src: "/images/post construction image_1752524176668.png", category: "Specialized", alt: "Post-construction cleanup" },
  { src: "/images/7_1752264862114.png", category: "Specialized", alt: "Window cleaning" },
  { src: "/images/9_1752184097090.png", category: "Specialized", alt: "Industrial cleanup" },
];

const beforeAfterPairs = [
  {
    before: "/images/15bb683b-a628-463a-842b-4e61212a5dc2_1767643055559.jpg",
    after: "/images/4a7ffe20-cb17-4d46-9434-76a526c68257_1767643062610.jpg",
    label: "Shower Stall — Deep Clean",
  },
  {
    before: "/images/d865150d-7215-4494-bbdf-06ccbe397679_1767643388358.jpg",
    after: "/images/ab8693e4-5b4d-401a-8dd4-0940e4b26366_1767643390203.jpg",
    label: "Tile Wall — Restoration",
  },
  {
    before: "/images/338a6f3d-4f6d-49dc-9e4b-0043852bf68c_1767644054741.jpg",
    after: "/images/10058993-6a9c-45d5-b3a5-d8635899bae7_1767644062493.jpg",
    label: "Flush Valve — Sanitization",
  },
  {
    before: "/images/46d54f10-ed35-44a7-89ce-19eb8f9ebbfb_1767643425721.jpg",
    after: "/images/a9826249-9689-4a7d-bfd2-9675ebac083a_1767643428382.jpg",
    label: "Shower Handle — Detail Clean",
  },
  {
    before: "/images/f7990ebd-7762-4961-bb15-60648046f3b4_1767643158635.jpg",
    after: "/images/13861450-daa5-4248-bb08-de14e018fd16_1767643162967.jpg",
    label: "Grab Bar — Sanitization",
  },
  {
    before: "/images/9a54ad3e-6b5a-445f-9d65-d859fb59e4fd_1767643532481.jpg",
    after: "/images/10058993-6a9c-45d5-b3a5-d8635899bae7_1767644062493.jpg",
    label: "Toilet Valve — Restoration",
  },
];

export default function GalleryContent() {
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
        subtitle="Documented results across commercial, medical, and industrial facilities throughout greater Houston."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Gallery" },
        ]}
      />

      {/* Before & After Section */}
      <SectionWrapper className="bg-[#111111]" dark>
        <div className="text-center mb-10">
          <p className="eyebrow text-[#9FD01B] mb-3">Before & After</p>
          <h2 className="font-gothic text-white" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300 }}>
            The MGS <span className="text-[#69AF23]">difference.</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm" style={{ fontWeight: 300 }}>
            Drag the slider to see the transformation. Every detail matters.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beforeAfterPairs.map((pair) => (
            <BeforeAfterSlider
              key={pair.label}
              before={pair.before}
              after={pair.after}
              label={pair.label}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Photo Gallery */}
      <SectionWrapper>
        <div className="text-center mb-10">
          <p className="eyebrow text-brand-green-text mb-3">Photo Gallery</p>
          <h2 className="font-gothic text-gray-900" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 300 }}>
            Our work in <span className="text-brand-green-text">action.</span>
          </h2>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "bg-brand-green-deep text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
              style={{ borderTopLeftRadius: '0.75rem' }}
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
                className="group cursor-pointer overflow-hidden"
                style={{ borderTopLeftRadius: '1.5rem' }}
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
              className="absolute right-4 top-4 bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
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
                className="max-h-[85vh] w-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
