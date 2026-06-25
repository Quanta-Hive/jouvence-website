"use client";

import Image from "next/image";
import { UserPlus, HandHeart, DollarSign, Users, Megaphone, Calendar, CheckCircle2, Phone, Mail } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "./fade-in";
import { MembershipForm } from "./membership-form";
import { DonationSection } from "./donation-section";
import type { Locale, Dictionary } from "@/lib/i18n";

const optionConfig = [
  { Icon: UserPlus, color: "#1d9bf0" },
  { Icon: HandHeart, color: "#ff700c" },
  { Icon: DollarSign, color: "#ffcb08" },
] as const;

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function GetInvolvedView({ locale, dict }: Props) {
  const t = dict.getInvolved;

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-navy py-24 text-white">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 via-transparent to-brand-blue/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-brand-yellow/10 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
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
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {t.title} <span className="text-brand-blue">{t.titleHighlight}</span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {t.subtitle}
          </motion.p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.options.map((option, i) => {
              const { Icon, color } = optionConfig[i];
              return (
                <FadeIn
                  key={option.title}
                  delay={i * 0.12}
                  className="group relative overflow-hidden rounded-2xl border border-brand-navy/5 bg-brand-surface p-8 text-center transition-all hover:-translate-y-1.5 hover:shadow-xl"
                >
                  <div className="absolute left-0 top-0 h-1 w-full" style={{ background: color }} />
                  <motion.div
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl"
                    style={{ background: `${color}15` }}
                    whileHover={{ rotate: 8, scale: 1.1 }}
                  >
                    <Icon size={32} style={{ color }} />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-brand-navy">{option.title}</h3>
                  <p className="mt-3 leading-relaxed text-brand-navy/60">{option.desc}</p>
                  <a
                    href={`#${option.action}`}
                    className="mt-6 inline-block rounded-xl px-8 py-3 font-display text-sm font-bold text-white shadow-md transition-all hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                      boxShadow: `0 4px 14px ${color}40`,
                    }}
                  >
                    {t.optionsCta}
                  </a>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section id="join" className="bg-brand-surface py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-blue/10"
              whileHover={{ rotate: 10, scale: 1.1 }}
            >
              <UserPlus size={32} className="text-brand-blue" />
            </motion.div>
            <FadeIn as="h2" className="font-display text-3xl font-extrabold text-brand-navy">
              {t.joinTitle}
            </FadeIn>
            <FadeIn as="p" delay={0.1} className="mt-3 text-brand-navy/60">
              {t.joinSubtitle}
            </FadeIn>
          </div>

          <FadeIn delay={0.2} className="rounded-2xl border border-brand-navy/5 bg-white p-8 shadow-lg md:p-12">
            <MembershipForm locale={locale} dict={dict} />
          </FadeIn>
        </div>
      </section>

      <section id="volunteer" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <FadeIn className="space-y-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-orange/10">
                <HandHeart size={28} className="text-brand-orange" />
              </div>
              <h2 className="font-display text-3xl font-extrabold text-brand-navy">{t.options[1].title}</h2>
              <p className="leading-relaxed text-brand-navy/60">{t.options[1].desc}</p>
              <div className="space-y-4">
                {[Users, Megaphone, Calendar].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-orange/10">
                      <Icon size={20} className="text-brand-orange" />
                    </div>
                    <span className="font-medium text-brand-navy/70">
                      {locale === "fr"
                        ? ["Organisation d'événements locaux", "Campagnes de sensibilisation", "Formations et réunions"][i]
                        : ["Local event organization", "Awareness campaigns", "Trainings and meetings"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1682009562591-8d986af93b7b?auto=format&fit=crop&w=1080&q=80"
                  alt=""
                  width={800}
                  height={500}
                  className="h-[500px] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-brand-orange/10" />
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="donate" className="bg-brand-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-brand-yellow/15"
              whileHover={{ rotate: -10, scale: 1.1 }}
            >
              <DollarSign size={32} className="text-brand-yellow" />
            </motion.div>
            <FadeIn as="h2" className="font-display text-3xl font-extrabold text-brand-navy">
              {t.donateTitle}
            </FadeIn>
            <FadeIn as="p" delay={0.1} className="mx-auto mt-3 max-w-2xl text-brand-navy/60">
              {t.donateSubtitle}
            </FadeIn>
          </div>

          <DonationSection dict={dict} />

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FadeIn className="rounded-2xl border border-brand-blue/20 bg-gradient-to-br from-brand-blue/10 to-brand-orange/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white">
                  <CheckCircle2 size={20} className="text-brand-blue" />
                </div>
                <div>
                  <h4 className="mb-2 font-display text-base font-bold text-brand-navy">{t.transparency.title}</h4>
                  <p className="text-sm leading-relaxed text-brand-navy/70">{t.transparency.body}</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="rounded-2xl border-2 border-brand-yellow/20 bg-white p-6 shadow-lg">
              <h4 className="mb-4 font-display text-base font-bold text-brand-navy">{t.needHelp}</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-blue/10">
                    <Phone size={16} className="text-brand-blue" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-navy/50">Tel</div>
                    <a href="tel:+237670572377" className="font-display font-semibold text-brand-navy hover:text-brand-blue transition-colors">
                      +237 670572377
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                    <Mail size={16} className="text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-brand-navy/50">Email</div>
                    <a href="mailto:jcp.jouvence237@gmail.com" className="font-display font-semibold text-brand-navy hover:text-brand-orange transition-colors">
                      jcp.jouvence237@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
