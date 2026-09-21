import type { MetadataRoute } from "next";
import { articles } from "@/content/articles";
import { brands } from "@/content/brands";
import { problems } from "@/content/problems";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().slice(0, 10);
  const entry = (path: string, lastModified: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("/", today, 1),
    entry("/services/", today, 0.9),
    ...services.map((s) => entry(`/services/${s.slug}/`, s.updated, 0.9)),
    entry("/brands/", today, 0.7),
    ...brands.map((b) => entry(`/brands/${b.slug}/`, b.updated, 0.7)),
    entry("/problems/", today, 0.8),
    ...problems.map((p) => entry(`/problems/${p.slug}/`, p.updated, 0.8)),
    entry("/guides/", today, 0.7),
    ...articles.map((a) => entry(`/guides/${a.slug}/`, a.updated, 0.8)),
    entry("/about/", today, 0.4),
    entry("/contact/", today, 0.6),
  ];
}
