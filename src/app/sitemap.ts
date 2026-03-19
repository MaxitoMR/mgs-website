import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/services-data";
import { COMPANY } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.url;

  const staticPages = [
    "",
    "/about",
    "/services",
    "/gallery",
    "/careers",
    "/employee-application",
    "/quote",
    "/diffusers",
    "/privacy-policy",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const servicePages = getAllSlugs().map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages];
}
