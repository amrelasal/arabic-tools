import type { MetadataRoute } from "next";
import { allTools, SITE_URL } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    ...allTools.map((t) => ({ url: `${SITE_URL}/${t.slug}`, lastModified: now, priority: 0.8 })),
    ...["about", "privacy-policy", "contact"].map((s) => ({ url: `${SITE_URL}/${s}`, lastModified: now, priority: 0.3 })),
  ];
}
