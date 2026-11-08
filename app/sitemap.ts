import type { MetadataRoute } from "next";
import { serviceSlugs } from "@/data/packages";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    ...serviceSlugs.map((s) => ({ url: `${SITE_URL}/services/${s}`, lastModified: now, priority: 0.8 })),
    { url: `${SITE_URL}/order`, lastModified: now, priority: 0.9 },
  ];
}
