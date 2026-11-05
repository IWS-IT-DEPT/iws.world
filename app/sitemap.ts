import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";
import { serviceAreas, servicePages } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/services", priority: 0.9 },
    ...servicePages.map((p) => ({ path: `/services/${p.slug}`, priority: 0.9 })),
    { path: "/locations", priority: 0.9 },
    ...serviceAreas.map((a) => ({ path: `/locations/${a.slug}`, priority: 0.9 })),
    { path: "/careers", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
