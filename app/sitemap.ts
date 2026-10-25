import type { MetadataRoute } from "next";
import { allTools, categories, SITE_URL } from "@/lib/tools";
import { getArticles } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    ...allTools.map((t) => ({ url: `${SITE_URL}/${t.slug}`, lastModified: now, priority: 0.8 })),
    ...categories.map((c) => ({ url: `${SITE_URL}/category/${c.slug}`, lastModified: now, priority: 0.7 })),
    { url: `${SITE_URL}/blog`, lastModified: now, priority: 0.7 },
    ...getArticles().map((a) => ({ url: `${SITE_URL}/blog/${a.slug}`, lastModified: new Date(a.updated || a.date), priority: 0.6 })),
    ...["about", "privacy-policy", "contact", "credits"].map((s) => ({ url: `${SITE_URL}/${s}`, lastModified: now, priority: 0.3 })),
  ];
}
