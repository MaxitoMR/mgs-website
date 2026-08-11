import type { Metadata } from "next";
import { AppTour } from "@/components/sections/app-tour";

export const metadata: Metadata = {
  title: "The MGS Management App",
  description:
    "Every screen of the MGS Management App: inspections scored on site with required photos, clock-ins refused outside the geofence, corrective-action queues and PDF exports, in English or Spanish.",
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
