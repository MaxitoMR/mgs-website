import type { Metadata } from "next";
import GalleryContent from "./gallery-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse before-and-after photos and project galleries from MGS Supply & Services. See the results of our commercial, medical, and industrial cleaning work.",
  openGraph: {
    title: "Gallery | MGS Supply & Services",
    description:
      "Before-and-after photos showcasing our professional cleaning results across Houston facilities.",
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
