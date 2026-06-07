import type { MetadataRoute } from "next";
import { listBlogPosts } from "@/services/blog";
import { siteConfig } from "@/lib/config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const { data: posts } = await listBlogPosts({ publishedOnly: true, pageSize: 200 });
    blogRoutes = posts.map(post => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // sitemap still works without blog posts
  }

  return [...staticRoutes, ...blogRoutes];
}
