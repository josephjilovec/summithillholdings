import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { ventures } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/portfolio", "/studio", "/technology", "/creative", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...ventures.map((venture) => ({ url: `${site.url}/portfolio/${venture.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }))
  ];
}
