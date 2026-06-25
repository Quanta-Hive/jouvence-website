"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "./fade-in";
import { NewsletterForm } from "./newsletter-form";
import type { Locale, Dictionary } from "@/lib/i18n";

const categoryColors: Record<string, string> = {
  "Événement": "#ff700c",
  "Event": "#ff700c",
  "Programme": "#1d9bf0",
  "Program": "#1d9bf0",
  "Activité": "#ffcb08",
  "Activity": "#ffcb08",
  "Partenariat": "#1d9bf0",
  "Partnership": "#1d9bf0",
  "Initiative": "#ff700c",
  "Actualité": "#1d9bf0",
  "News": "#1d9bf0",
};

export type NewsArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string | null;
  publishedAt: string;
};

type Props = {
  locale: Locale;
  dict: Dictionary;
  articles: NewsArticle[];
};

export function NewsView({ locale, dict, articles }: Props) {
  const t = dict.news;
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-navy py-24 text-white">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-brand-yellow/10 blur-3xl"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.span
            className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-yellow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.kicker}
          </motion.span>
          <motion.h1
            className="font-display font-extrabold"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t.title} <span className="text-brand-blue">{t.titleHighlight}</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      {articles.length === 0 ? (
        <section className="bg-white py-24 text-center">
          <p className="text-brand-navy/50">{t.empty}</p>
        </section>
      ) : (
        <>
          {featured && (
            <section className="bg-white py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeIn className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-brand-surface transition-all hover:shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 overflow-hidden lg:h-auto">
                      {featured.coverImage ? (
                        <Image src={featured.coverImage} alt={featured.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-brand-navy/5">—</div>
                      )}
                      <div className="absolute left-4 top-4">
                        <span className="rounded-lg bg-brand-yellow px-4 py-1.5 font-display text-sm font-bold text-brand-navy">
                          {t.featured}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center p-8 lg:p-12">
                      <div className="mb-4 flex items-center gap-3">
                        <span
                          className="rounded-lg px-3 py-1 font-display text-xs font-semibold text-white"
                          style={{ background: categoryColors[featured.category] ?? "#1d9bf0" }}
                        >
                          {featured.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-sm text-brand-navy/40">
                          <Calendar size={14} />
                          {featured.publishedAt}
                        </div>
                      </div>
                      <h2 className="font-display text-2xl font-bold leading-tight text-brand-navy">{featured.title}</h2>
                      <p className="mt-4 leading-relaxed text-brand-navy/60">{featured.excerpt}</p>
                      <Link
                        href={`/${locale}/news/${featured.slug}`}
                        className="mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-brand-blue to-brand-blue-light px-6 py-2.5 font-display text-sm font-bold text-white shadow-md shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        {dict.common.readArticle}
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <section className="bg-brand-surface py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <FadeIn as="h2" className="mb-10 font-display text-2xl font-bold text-brand-navy">
                  {t.latest}
                </FadeIn>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {rest.map((article, i) => (
                    <FadeIn
                      key={article.id}
                      delay={i * 0.1}
                      className="group overflow-hidden rounded-2xl border border-brand-navy/5 bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative h-52 overflow-hidden">
                        {article.coverImage ? (
                          <Image
                            src={article.coverImage}
                            alt={article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-brand-navy/5">—</div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-3">
                          <span
                            className="rounded-lg px-3 py-1 font-display text-xs font-semibold text-white"
                            style={{ background: categoryColors[article.category] ?? "#1d9bf0" }}
                          >
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-brand-navy/40">
                            <Calendar size={13} />
                            {article.publishedAt}
                          </span>
                        </div>
                        <h3 className="line-clamp-2 font-display text-lg font-bold leading-snug text-brand-navy">{article.title}</h3>
                        <p className="mt-2 line-clamp-2 leading-relaxed text-brand-navy/60">{article.excerpt}</p>
                        <Link
                          href={`/${locale}/news/${article.slug}`}
                          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-blue-light px-5 py-2 font-display text-sm font-bold text-white shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          {dict.common.readMore}
                          <ArrowRight size={15} />
                        </Link>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="relative overflow-hidden bg-brand-blue py-20">
        <motion.div
          className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1, 1.4, 1], x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn as="h2" className="mb-6 font-display text-3xl font-extrabold text-white">
            {t.newsletterTitle}
          </FadeIn>
          <FadeIn as="p" delay={0.1} className="mb-8 text-base text-white/80">
            {t.newsletterSubtitle}
          </FadeIn>
          <FadeIn delay={0.2}>
            <NewsletterForm
              locale={locale}
              variant="section"
              placeholder={t.newsletterEmail}
              buttonLabel={t.newsletterSubmit}
            />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
