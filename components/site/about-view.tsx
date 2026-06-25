"use client";

import Image from "next/image";
import { Eye, Heart, Award, Users, Zap, HandHeart } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "./fade-in";
import type { Locale, Dictionary } from "@/lib/i18n";

const valueIcons = [Award, Zap, Users, Heart, Award, HandHeart] as const;
const valueColors = ["#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0", "#ff700c", "#ffcb08"];

type TeamMember = {
  id: string;
  name: string;
  photoUrl: string | null;
  role: string;
};

type Props = {
  locale: Locale;
  dict: Dictionary;
  team: TeamMember[];
};

export function AboutView({ dict, team }: Props) {
  const t = dict.about;

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
          className="absolute right-0 top-0 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.span
            className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-yellow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.kicker}
          </motion.span>
          <motion.h1
            className="font-display font-extrabold leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <FadeIn className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
                  <Eye size={24} className="text-brand-blue" />
                </div>
                <h2 className="font-display text-3xl font-extrabold text-brand-navy">{t.vision.title}</h2>
              </div>
              <p className="text-base leading-relaxed text-brand-navy/60">{t.vision.p1}</p>
              <p className="text-base leading-relaxed text-brand-navy/60">{t.vision.p2}</p>
            </FadeIn>

            <FadeIn delay={0.15} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10">
                  <Heart size={24} className="text-brand-orange" />
                </div>
                <h2 className="font-display text-3xl font-extrabold text-brand-navy">{t.mission.title}</h2>
              </div>
              <ul className="space-y-4">
                {t.mission.items.map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed text-brand-navy/70">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn as="span" className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              {t.values.kicker}
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-4xl font-extrabold text-brand-navy">
              {t.values.title}
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.values.items.map((value, i) => {
              const Icon = valueIcons[i];
              const color = valueColors[i];
              return (
                <FadeIn
                  key={value.title}
                  delay={i * 0.08}
                  className="group rounded-2xl border border-brand-navy/5 bg-white p-8 transition-all hover:-translate-y-1.5 hover:shadow-lg"
                >
                  <motion.div
                    className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ background: `${color}15` }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon size={28} style={{ color }} />
                  </motion.div>
                  <h3 className="font-display text-lg font-bold text-brand-navy">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-brand-navy/60">{value.desc}</p>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <FadeIn className="order-2 space-y-6 lg:order-1">
              <span className="inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-blue">
                {t.leader.kicker}
              </span>
              <h2 className="font-display text-4xl font-extrabold text-brand-navy">Dr. Valère Bertrand BESSALA</h2>
              <p className="font-display text-base font-semibold text-brand-blue">{t.leader.role}</p>

              <div className="space-y-4 text-brand-navy/60" style={{ lineHeight: 1.8 }}>
                <p>{t.leader.bio1}</p>
                <p>{t.leader.bio2}</p>
              </div>

              <div className="rounded-2xl border-l-4 border-brand-blue bg-brand-blue/5 p-6">
                <p className="italic text-brand-navy/70" style={{ lineHeight: 1.8 }}>
                  &ldquo;{t.leader.quote}&rdquo;
                </p>
                <p className="mt-3 font-display text-sm font-bold text-brand-blue">— Dr. Valère Bertrand BESSALA</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="relative order-1 lg:order-2">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/brand/leader-2.jpeg"
                  alt="Dr. Valère Bertrand BESSALA"
                  width={800}
                  height={600}
                  className="h-[550px] w-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-2xl bg-brand-orange/10" />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn as="span" className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              {t.team.kicker}
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-4xl font-extrabold text-brand-navy">
              {t.team.title}
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.length === 0 && (
              <p className="col-span-3 text-center text-brand-navy/50">—</p>
            )}
            {team.map((member, i) => (
              <FadeIn
                key={member.id}
                delay={i * 0.12}
                className="group overflow-hidden rounded-2xl border border-brand-navy/5 bg-white transition-all hover:-translate-y-1.5 hover:shadow-xl"
              >
                <div className="relative h-72 overflow-hidden bg-brand-surface">
                  {member.photoUrl ? (
                    <Image src={member.photoUrl} alt={member.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-4xl font-bold text-brand-navy/30">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-brand-navy">{member.name}</h3>
                  <p className="mt-1 font-medium text-brand-blue">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
