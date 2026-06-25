import { NewsView, type NewsArticle } from "@/components/site/news-view";
import { prisma } from "@/lib/db";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function NewsPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);

  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  const articles: NewsArticle[] = posts.map((post) => ({
    id: post.id,
    slug: locale === "fr" ? post.slugFr : post.slugEn,
    title: locale === "fr" ? post.titleFr : post.titleEn,
    excerpt: locale === "fr" ? post.excerptFr : post.excerptEn,
    category: post.category,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt ? formatDate(post.publishedAt, locale) : "",
  }));

  return <NewsView locale={locale} dict={dict} articles={articles} />;
}
