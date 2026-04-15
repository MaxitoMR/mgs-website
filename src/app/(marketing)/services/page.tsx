import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore 30+ specialized janitorial and facility cleaning services from MGS Supply & Services. Commercial, medical, industrial, and specialty cleaning across Greater Houston.",
  openGraph: {
    title: "Our Services | MGS Supply & Services",
    description:
      "Commercial, medical, industrial, and specialty cleaning services across Greater Houston.",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
