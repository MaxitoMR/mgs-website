import type { Metadata } from "next";
import { TrainingHub } from "./training-hub";

export const metadata: Metadata = {
  title: "Employee Training",
  description:
    "MGS Supply & Services field training — standards, safety, and protocol modules for team members.",
  robots: { index: false, follow: false },
};

export default function StaffPortalPage() {
  return <TrainingHub />;
}
