import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const staticPaths = ["", "/about", "/program", "/news", "/get-involved", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of ["fr", "en"] as const) {
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "" ? 1.0 : 0.7,
      });
    }
  }

  const posts = await prisma.blogPost
    .findMany({
      where: { status: "PUBLISHED" },
      select: { slugFr: true, slugEn: true, updatedAt: true },
    })
    .catch(() => []);

  for (const post of posts) {
    entries.push({
      url: `${baseUrl}/fr/news/${post.slugFr}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    });
    entries.push({
      url: `${baseUrl}/en/news/${post.slugEn}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return entries;
}
