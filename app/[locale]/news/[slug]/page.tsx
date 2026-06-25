import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { prisma } from "@/lib/db";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slugFr: true, slugEn: true },
  });
  return posts.flatMap((post) => [
    { locale: "fr", slug: post.slugFr },
    { locale: "en", slug: post.slugEn },
  ]);
}

export async function generateMetadata({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);

  const post = await prisma.blogPost.findFirst({
    where: {
      status: "PUBLISHED",
      OR: [{ slugFr: slug }, { slugEn: slug }],
    },
  });

  if (!post) return {};
  return {
    title: locale === "fr" ? post.titleFr : post.titleEn,
    description: locale === "fr" ? post.excerptFr : post.excerptEn,
    openGraph: {
      title: locale === "fr" ? post.titleFr : post.titleEn,
      description: locale === "fr" ? post.excerptFr : post.excerptEn,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);

  const post = await prisma.blogPost.findFirst({
    where: {
      status: "PUBLISHED",
      OR: [{ slugFr: slug }, { slugEn: slug }],
    },
    include: { author: { select: { name: true } } },
  });

  if (!post) notFound();

  const title = locale === "fr" ? post.titleFr : post.titleEn;
  const excerpt = locale === "fr" ? post.excerptFr : post.excerptEn;
  const body = locale === "fr" ? post.bodyFr : post.bodyEn;
  const sanitized = DOMPurify.sanitize(body);

  return (
    <article>
      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/news`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            {dict.news.backToNews}
          </Link>
          <span className="mb-4 inline-block rounded-full bg-brand-blue/20 px-3 py-1 font-display text-xs font-bold text-brand-blue">
            {post.category}
          </span>
          <h1 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-white/70">{excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {post.publishedAt ? formatDate(post.publishedAt, locale) : ""}
            </span>
            <span>—</span>
            <span>{post.author.name}</span>
          </div>
        </div>
      </section>

      {post.coverImage && (
        <div className="mx-auto -mt-12 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-2xl">
            <Image src={post.coverImage} alt={title} fill sizes="(max-width: 1024px) 100vw, 800px" className="object-cover" />
          </div>
        </div>
      )}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose-blog" dangerouslySetInnerHTML={{ __html: sanitized }} />
        </div>
      </section>
    </article>
  );
}
