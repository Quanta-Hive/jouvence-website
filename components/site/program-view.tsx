"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Building2, Shield, Factory, Landmark, Hospital, ChevronDown, ArrowRight, Target, Calendar, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "./fade-in";
import { type Chantier } from "@/lib/program-data";
import type { Locale, Dictionary } from "@/lib/i18n";

const ICONS: Record<Chantier["iconKey"], LucideIcon> = {
  Landmark,
  Shield,
  Factory,
  Building2,
  Hospital,
};

type Props = {
  locale: Locale;
  dict: Dictionary;
  chantiers: Chantier[];
};

export function ProgramView({ locale, dict, chantiers }: Props) {
  const t = dict.program;
  const [expanded, setExpanded] = useState<string | null>(null);
  const totalChapters = chantiers.reduce((sum, c) => sum + c.chapitres.length, 0);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy-soft to-brand-navy py-28 text-white">
        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-brand-blue/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-brand-orange/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Target size={18} className="text-brand-yellow" />
              <span className="font-display text-sm font-semibold text-white/90">{t.kicker}</span>
            </motion.div>

            <motion.h1
              className="mb-6 font-display font-extrabold leading-[1.1] text-white"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {t.title}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent">{t.titleHighlight}</span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-light"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>{" "}
              {t.titleSuffix}
            </motion.h1>

            <motion.p
              className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              className="mx-auto grid max-w-2xl grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              {[
                { number: "5", label: t.statLabels.chantiers, color: "#1d9bf0" },
                { number: String(totalChapters), label: t.statLabels.chapters, color: "#ff700c" },
                { number: "2035", label: t.statLabels.vision, color: "#ffcb08" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="mb-2 font-display text-3xl font-extrabold" style={{ color: stat.color }}>
                    {stat.number}
                  </div>
                  <div className="font-display text-xs font-semibold text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-brand-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn as="span" className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
              {t.axesKicker}
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-4xl font-extrabold text-brand-navy">
              {t.axesTitle}
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {chantiers.map((chantier, i) => {
              const Icon = ICONS[chantier.iconKey];
              return (
                <FadeIn key={chantier.id} delay={i * 0.1} className="group relative">
                  <div className="relative h-full overflow-hidden rounded-3xl border-2 border-brand-navy/5 bg-white p-8 transition-all duration-500 hover:border-transparent hover:shadow-2xl">
                    <div
                      className="absolute left-0 top-0 h-2 w-full rounded-t-3xl transition-all duration-500 group-hover:h-full group-hover:opacity-5"
                      style={{ background: chantier.color }}
                    />
                    <div className="relative z-10">
                      <motion.div
                        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                        style={{ background: `${chantier.color}15` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Icon size={32} style={{ color: chantier.color }} />
                      </motion.div>

                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-navy/5 px-3 py-1">
                        <span className="font-display text-xs font-bold" style={{ color: chantier.color }}>
                          {t.chantier} {chantier.id}
                        </span>
                        <span className="text-xs text-brand-navy/30">•</span>
                        <span className="font-display text-xs font-semibold text-brand-navy/50">
                          {chantier.chapitres.length} {t.chapters}
                        </span>
                      </div>

                      <h3 className="mb-4 font-display text-xl font-bold leading-tight text-brand-navy">{chantier.title}</h3>
                      <p className="mb-6 text-brand-navy/60" style={{ lineHeight: 1.7 }}>
                        {chantier.description}
                      </p>

                      <div className="mb-6 space-y-2">
                        {chantier.chapitres.slice(0, 3).map((chapitre) => (
                          <div key={chapitre.id} className="flex items-start gap-2 text-sm text-brand-navy/50">
                            <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: chantier.color }} />
                            <span className="leading-snug">{chapitre.title}</span>
                          </div>
                        ))}
                        {chantier.chapitres.length > 3 && (
                          <div className="pl-5 font-display text-sm font-semibold text-brand-navy/40">
                            +{chantier.chapitres.length - 3} {t.otherChapters}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(`chantier-${chantier.id}`);
                          el?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 px-6 py-3 font-display text-sm font-bold transition-all hover:scale-[1.02]"
                        style={{ borderColor: `${chantier.color}30`, color: chantier.color }}
                      >
                        {t.viewDetails}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn as="span" className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              {t.detailedKicker}
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-4xl font-extrabold text-brand-navy">
              {t.detailedTitle}
            </FadeIn>
          </div>

          <div className="space-y-16">
            {chantiers.map((chantier) => {
              const Icon = ICONS[chantier.iconKey];
              return (
                <div key={chantier.id} id={`chantier-${chantier.id}`}>
                  <FadeIn className="mb-8 flex items-center gap-4 border-b-2 pb-6" style={{ borderColor: `${chantier.color}30` }}>
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: `${chantier.color}15` }}>
                      <Icon size={28} style={{ color: chantier.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-display text-sm font-semibold" style={{ color: chantier.color }}>
                        {t.chantier} {chantier.id}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-brand-navy">{chantier.title}</h3>
                    </div>
                    <div className="rounded-full px-4 py-1.5 font-display text-sm font-bold" style={{ background: `${chantier.color}15`, color: chantier.color }}>
                      {chantier.chapitres.length} {t.chapters}
                    </div>
                  </FadeIn>

                  <div className="space-y-3">
                    {chantier.chapitres.map((chapitre, idx) => {
                      const isOpen = expanded === chapitre.id;
                      return (
                        <div
                          key={chapitre.id}
                          className="overflow-hidden rounded-2xl border-2 transition-all duration-300"
                          style={{ borderColor: isOpen ? chantier.color : "rgb(229 231 235)" }}
                        >
                          <button
                            type="button"
                            onClick={() => setExpanded(isOpen ? null : chapitre.id)}
                            className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors"
                            style={{ background: isOpen ? `${chantier.color}05` : "white" }}
                          >
                            <div className="flex flex-1 items-center gap-4">
                              <div
                                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold"
                                style={{
                                  background: isOpen ? chantier.color : `${chantier.color}15`,
                                  color: isOpen ? "white" : chantier.color,
                                }}
                              >
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-display text-base font-bold text-brand-navy">{chapitre.title}</h4>
                                <div className="mt-1 text-sm font-medium text-brand-navy/50">
                                  {chapitre.points.length} {t.measures}
                                </div>
                              </div>
                            </div>
                            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                              <ChevronDown size={24} style={{ color: chantier.color }} />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="px-6 pb-6 pt-2">
                                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {chapitre.points.map((point, pi) => (
                                      <motion.div
                                        key={pi}
                                        className="flex items-start gap-3 rounded-lg bg-brand-surface p-3 transition-colors hover:bg-brand-navy/5"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: pi * 0.03 }}
                                      >
                                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full mt-0.5" style={{ background: `${chantier.color}20` }}>
                                          <Check size={12} style={{ color: chantier.color }} />
                                        </div>
                                        <span className="text-sm leading-relaxed text-brand-navy/70">{point}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-surface to-white py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2">
              <Calendar size={18} className="text-brand-blue" />
              <span className="font-display text-xs font-bold uppercase tracking-widest text-brand-blue">{t.timeline.kicker}</span>
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-4xl font-extrabold text-brand-navy">
              {t.timeline.title}
            </FadeIn>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-brand-blue via-brand-orange to-brand-yellow" />
            <div className="space-y-12">
              {t.timeline.phases.map((phase, i) => {
                const colors = ["#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0"];
                const color = colors[i];
                return (
                  <FadeIn key={phase.period} delay={i * 0.15} className="relative flex gap-8">
                    <motion.div
                      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-xl"
                      style={{ background: color }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-2xl">{phase.icon}</span>
                    </motion.div>
                    <div className="flex-1 pb-4">
                      <div className="mb-3 inline-block rounded-full px-4 py-1 font-display text-sm font-bold" style={{ background: `${color}15`, color }}>
                        {phase.period}
                      </div>
                      <div className="rounded-2xl border-2 border-brand-navy/5 bg-white p-6 shadow-lg">
                        <ul className="space-y-3">
                          {phase.actions.map((action) => (
                            <li key={action} className="flex items-start gap-3">
                              <Check size={18} className="mt-0.5 flex-shrink-0" style={{ color }} />
                              <span className="leading-relaxed text-brand-navy/70">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue to-brand-blue-light" />
        <motion.div
          className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <FadeIn as="h2" className="mb-6 font-display font-extrabold text-white" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
            {t.cta.title} <span className="text-brand-yellow">{t.cta.titleHighlight}</span>
          </FadeIn>
          <FadeIn as="p" delay={0.1} className="mx-auto mb-10 max-w-2xl text-lg text-white/80" style={{ lineHeight: 1.8 }}>
            {t.cta.body}
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-display font-bold text-brand-blue shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              {t.cta.primary}
              <ArrowRight size={20} />
            </Link>
            <Link
              href={`/${locale}/get-involved`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-light px-8 py-4 font-display font-bold text-white shadow-xl shadow-brand-orange/30 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              {t.cta.secondary}
              <ArrowRight size={20} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
