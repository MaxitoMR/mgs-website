import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services-data";
import { COMPANY } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.url;

  const staticPages = [
    { route: "", priority: 1, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    // Local landing page — high priority, it targets the home-market query.
    { route: "/katy", priority: 0.9, changeFrequency: "monthly" as const },
    { route: "/gallery", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/careers", priority: 0.7, changeFrequency: "monthly" as const },
    { route: "/employee-application", priority: 0.5, changeFrequency: "monthly" as const },
    { route: "/quote", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/walkthrough", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/diffusers", priority: 0.6, changeFrequency: "monthly" as const },
    { route: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { route: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ].map((page) => ({
    url: `${base}${page.route}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const servicePages = getAllSlugs().map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
