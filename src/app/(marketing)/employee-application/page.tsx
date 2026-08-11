import type { Metadata } from "next";
import ApplicationContent from "./application-content";

export const metadata: Metadata = {
  title: "Employee Application",
  description:
    "Openings for floor techs, supervisors, day maids and janitors across greater Houston. Apply in a few minutes.",
  openGraph: {
    title: "Employee Application | MGS Supply & Services",
    description:
      "Join our professional cleaning team. Apply for janitorial and facility specialist positions.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function EmployeeApplicationPage() {
  return <ApplicationContent />;
}
