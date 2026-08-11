import type { Metadata } from "next";
import GalleryContent from "./gallery-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Before-and-after comparisons and site photographs from commercial, medical and industrial work across greater Houston.",
  openGraph: {
    title: "Gallery | MGS Supply & Services",
    description:
      "Before-and-after photos showcasing our professional cleaning results across Houston facilities.",
  },
};

export default function GalleryPage() {
  return <GalleryContent />;
}
