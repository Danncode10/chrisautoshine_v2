import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
  ];
}
