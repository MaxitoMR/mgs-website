import type { Metadata } from "next";
import ApplicationContent from "./application-content";

export const metadata: Metadata = {
  title: "Employee Application",
  description:
    "Apply to join the MGS Supply & Services team. We hire janitorial team members, medical facility specialists, floor care technicians, and team leads across Greater Houston.",
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
