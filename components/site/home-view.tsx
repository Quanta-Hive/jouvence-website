"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Shield, Lightbulb, TrendingUp, Star, ChevronRight, Play } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "./fade-in";
import type { Locale, Dictionary } from "@/lib/i18n";
import type { HomeContent } from "@/lib/validations/site-settings";

const pillarIcons = [Users, Shield, Lightbulb, TrendingUp] as const;
const pillarColors = ["#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0"];
const priorityColors = ["#1d9bf0", "#ff700c", "#ffcb08"];
const priorityImages = [
  "https://images.unsplash.com/photo-1775138622438-f9568c3e279d?auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1608560938854-96a63d9214a8?auto=format&fit=crop&w=1080&q=80",
  "https://images.unsplash.com/photo-1761342611675-110a915fecf4?auto=format&fit=crop&w=1080&q=80",
];
const figureColors = ["#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0", "#ff700c"];

const statIcons = [Users, TrendingUp, Shield, Lightbulb] as const;
const statColors = ["#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0"];

type LeaderProp = {
  name: string;
  photoUrl: string | null;
  role: string;
};

type Props = {
  locale: Locale;
  dict: Dictionary;
  leader: LeaderProp | null;
  content: HomeContent;
};

export function HomeView({ locale, dict, leader, content }: Props) {
  const t = dict.home;

  const pillarItems = [
    { ...t.pillars.items.youth, color: pillarColors[0], Icon: pillarIcons[0] },
    { ...t.pillars.items.integrity, color: pillarColors[1], Icon: pillarIcons[1] },
    { ...t.pillars.items.innovation, color: pillarColors[2], Icon: pillarIcons[2] },
    { ...t.pillars.items.progress, color: pillarColors[3], Icon: pillarIcons[3] },
  ];

  return (
    <div>
      <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1603279760408-ba34e1b9857c?auto=format&fit=crop&w=1920&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/60" />
        </div>
        <motion.div
          className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-brand-blue/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-brand-orange/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <Star size={16} className="text-brand-yellow" />
                <span className="font-display text-sm font-medium text-white/80">{t.heroBadge}</span>
              </motion.div>

              <motion.h1
                className="font-display font-extrabold leading-[1.1] text-white"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.heroTitle} <span className="text-brand-blue">{t.heroTitleHighlight}</span>
              </motion.h1>

              <motion.p
                className="max-w-lg text-lg font-semibold leading-relaxed text-white/80"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t.heroSubtitlePrefix}{" "}
                <span className="relative inline-block">
                  <span className="text-brand-yellow">{t.heroSubtitleHighlight}</span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-brand-orange"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                </span>{" "}
                {t.heroSubtitleSuffix}
              </motion.p>

              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
              >
                <Link
                  href={`/${locale}/get-involved`}
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-light px-8 py-4 font-display font-bold text-white shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-orange/50"
                >
                  {t.heroCtaPrimary}
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href={`/${locale}/program`}
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-brand-yellow/30 bg-gradient-to-r from-brand-yellow/20 to-brand-yellow/10 px-8 py-4 font-display font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5"
                >
                  <Play size={18} className="text-brand-yellow" />
                  {t.heroCtaSecondary}
                </Link>
              </motion.div>
            </div>

            {leader && (
              <motion.div
                className="relative hidden lg:block"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative">
                  <div className="overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl">
                    {leader.photoUrl ? (
                      <Image
                        src={leader.photoUrl}
                        alt={leader.name}
                        width={640}
                        height={520}
                        className="h-[520px] w-full object-cover object-top"
                        style={{ width: "100%", height: "520px" }}
                      />
                    ) : (
                      <div className="flex h-[520px] w-full items-center justify-center bg-brand-navy/40 font-display text-6xl font-bold text-white/40">
                        {leader.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <motion.div
                    className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-xl bg-white p-4 shadow-2xl"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src="/brand/logo.png" alt="" width={56} height={56} className="h-14 w-auto" />
                    <div>
                      <p className="font-display text-sm font-bold text-brand-navy">{leader.name}</p>
                      <p className="text-xs font-medium text-brand-blue">{leader.role}</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="absolute -right-4 -top-4 rounded-xl bg-brand-blue p-4 text-white shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <p className="font-display text-2xl font-extrabold">{content.membersBadge}</p>
                    <p className="text-xs text-white/80">{t.membersBadge}</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 73.3C120 66.7 240 53.3 360 46.7C480 40 600 40 720 46.7C840 53.3 960 66.7 1080 66.7C1200 66.7 1320 53.3 1380 46.7L1440 40V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-brand-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {content.stats.map((stat, i) => {
              const Icon = statIcons[i];
              const color = statColors[i];
              const label = locale === "fr" ? stat.labelFr : stat.labelEn;
              const desc = locale === "fr" ? stat.descFr : stat.descEn;
              return (
                <FadeIn
                  key={i}
                  delay={i * 0.1}
                  className="group rounded-2xl border border-brand-navy/5 bg-white p-6 text-center transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
                >
                  <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={24} style={{ color }} />
                  </div>
                  <div className="mb-2 font-display text-4xl font-extrabold" style={{ color }}>
                    {stat.value}
                  </div>
                  <div className="mb-1 font-display text-sm font-bold text-brand-navy">{label}</div>
                  <div className="text-xs text-brand-navy/50">{desc}</div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <FadeIn as="span" className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
              {t.pillars.kicker}
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-4xl font-extrabold text-brand-navy">
              {t.pillars.title}
            </FadeIn>
            <FadeIn as="p" delay={0.2} className="mx-auto mt-4 max-w-2xl text-base text-brand-navy/60">
              {t.pillars.subtitle}
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillarItems.map((pillar, i) => (
              <FadeIn
                key={pillar.title}
                delay={i * 0.1}
                className="group relative overflow-hidden rounded-2xl border border-brand-navy/5 bg-white p-8 transition-all hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
              >
                <div className="absolute left-0 top-0 h-1 w-full rounded-t-2xl" style={{ background: pillar.color }} />
                <motion.div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{ background: `${pillar.color}15` }}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <pillar.Icon size={28} style={{ color: pillar.color }} />
                </motion.div>
                <h3 className="font-display text-lg font-bold text-brand-navy">{pillar.title}</h3>
                <p className="mt-3 text-brand-navy/60" style={{ lineHeight: 1.7 }}>
                  {pillar.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <FadeIn as="span" className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              {t.priorities.kicker}
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-4xl font-extrabold text-brand-navy">
              {t.priorities.title}
            </FadeIn>
            <FadeIn as="p" delay={0.2} className="mx-auto mt-4 max-w-2xl text-base text-brand-navy/60">
              {t.priorities.subtitle}
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.priorities.items.map((priority, i) => {
              const color = priorityColors[i];
              return (
                <FadeIn
                  key={priority.title}
                  delay={i * 0.15}
                  className="group overflow-hidden rounded-2xl border border-brand-navy/5 bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={priorityImages[i]}
                      alt={priority.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1 font-display text-xs font-bold text-white backdrop-blur-sm"
                      style={{ background: `${color}dd` }}
                    >
                      {priority.label}
                    </span>
                  </div>
                  <div className="p-8">
                    <h3 className="mb-4 font-display text-xl font-bold text-brand-navy">{priority.title}</h3>
                    <ul className="space-y-3">
                      {priority.actions.map((action) => (
                        <li key={action} className="flex items-start gap-3">
                          <ChevronRight size={16} className="mt-0.5 flex-shrink-0" style={{ color }} />
                          <span className="text-sm leading-relaxed text-brand-navy/70">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.4} className="mt-10 text-center">
            <Link
              href={`/${locale}/program`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-blue-light px-7 py-3 font-display text-sm font-bold text-white shadow-md shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {t.priorities.cta}
              <ArrowRight size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-navy to-brand-navy-soft py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <FadeIn as="span" className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
              {t.figures.kicker}
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-4xl font-extrabold">
              {t.figures.title}
            </FadeIn>
            <FadeIn as="p" delay={0.2} className="mx-auto mt-4 max-w-2xl text-white/60">
              {t.figures.subtitle}
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {content.figures.map((item, i) => {
              const label = locale === "fr" ? item.labelFr : item.labelEn;
              const sublabel = locale === "fr" ? item.sublabelFr : item.sublabelEn;
              return (
                <FadeIn
                  key={i}
                  delay={i * 0.05}
                  className="group rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white/15"
                >
                  <div className="mb-2 font-display text-3xl font-extrabold" style={{ color: figureColors[i] }}>
                    {item.value}
                  </div>
                  <div className="mb-1 font-display text-sm font-bold text-white">{label}</div>
                  <div className="text-xs text-white/50">{sublabel}</div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.4} className="mx-auto mt-10 max-w-3xl text-center text-white/70" style={{ lineHeight: 1.8 }}>
            {t.figures.note}
          </FadeIn>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <FadeIn className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1761666520005-3ffcf13e74c8?auto=format&fit=crop&w=1080&q=80"
                  alt={t.aboutPreview.title}
                  width={800}
                  height={500}
                  className="h-[450px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-brand-blue/10" />
            </FadeIn>

            <FadeIn delay={0.15} className="space-y-6">
              <span className="inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
                {t.aboutPreview.kicker}
              </span>
              <h2 className="font-display text-4xl font-extrabold text-brand-navy">{t.aboutPreview.title}</h2>
              <p className="text-base leading-relaxed text-brand-navy/60">{t.aboutPreview.body}</p>
              <div className="space-y-4">
                {t.aboutPreview.highlights.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue/10">
                      <ChevronRight size={14} className="text-brand-blue" />
                    </div>
                    <span className="font-medium text-brand-navy/70">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-blue-light px-6 py-2.5 font-display text-sm font-bold text-white shadow-md shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                {t.aboutPreview.cta}
                <ArrowRight size={16} />
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1574936911847-adaa51549f3e?auto=format&fit=crop&w=1920&q=80"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/85" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn as="h2" className="mb-6 font-display font-extrabold text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
            {t.cta.title} <span className="text-brand-yellow">{t.cta.titleHighlight}</span> ?
          </FadeIn>
          <FadeIn as="p" delay={0.15} className="mx-auto mb-10 max-w-2xl text-lg text-white/70" style={{ lineHeight: 1.8 }}>
            {t.cta.body}
          </FadeIn>
          <FadeIn delay={0.3} className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/get-involved`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-light px-8 py-4 font-display font-bold text-white shadow-lg shadow-brand-orange/30 transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {t.cta.primary}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-white to-gray-100 px-8 py-4 font-display font-bold text-brand-navy shadow-lg transition-all hover:-translate-y-1"
            >
              {t.cta.secondary}
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
