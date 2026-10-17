import type { MetadataRoute } from "next";
import { allTools, SITE_URL } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    ...allTools.map((t) => ({ url: `${SITE_URL}/${t.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
