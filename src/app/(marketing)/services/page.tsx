import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Twenty-five defined cleaning programs across the commercial, medical, industrial and specialized sectors, delivered across greater Houston.",
  openGraph: {
    title: "Our Services | MGS Supply & Services",
    description:
      "Commercial, medical, industrial, and specialty cleaning services across Greater Houston.",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
