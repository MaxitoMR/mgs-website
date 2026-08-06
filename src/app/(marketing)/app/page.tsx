import type { Metadata } from "next";
import { AppTour } from "@/components/sections/app-tour";

export const metadata: Metadata = {
  title: "The MGS Management App",
  description:
    "Every screen of the MGS Management App: QA inspections scored on site with required photos and notes, GPS-verified clock-ins refused outside the geofence, corrective-action queues, PDF and deficiency-report exports, and full English/Spanish operation.",
  alternates: { canonical: "/app" },
  openGraph: {
    title: "The MGS Management App — MGS Supply & Services",
    description:
      "The software that runs MGS field operations: inspections scored in the room, clock-ins verified against the building's coordinates, and a record that leaves with the client.",
    url: "/app",
    type: "website",
  },
};

export default function AppPage() {
  return <AppTour />;
}
