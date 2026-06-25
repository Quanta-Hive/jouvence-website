"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { FadeIn } from "./fade-in";
import { ContactForm } from "./contact-form";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, TikTok } from "./social-icons";
import type { Locale, Dictionary } from "@/lib/i18n";
import type { SiteInfo } from "@/lib/validations/site-settings";

const regions = [
  { region: "Littoral", city: "Douala", phone: "+237 670572377" },
  { region: "Ouest", city: "Bafoussam", phone: "+237 670572377" },
  { region: "Adamaoua", city: "Ngaoundéré", phone: "+237 670572377" },
  { region: "Nord", city: "Garoua", phone: "+237 670572377" },
  { region: "Extrême-Nord", city: "Maroua", phone: "+237 670572377" },
  { region: "Sud", city: "Ebolowa", phone: "+237 670572377" },
];

type Props = {
  locale: Locale;
  dict: Dictionary;
  siteInfo: SiteInfo;
};

export function ContactView({ locale, dict, siteInfo }: Props) {
  const t = dict.contact;

  const socialItems = [
    { href: siteInfo.socials.facebookUrl, Icon: Facebook, label: "Facebook", color: "#1877f2" },
    { href: siteInfo.socials.twitterUrl, Icon: Twitter, label: "Twitter / X", color: "#1d9bf0" },
    { href: siteInfo.socials.instagramUrl, Icon: Instagram, label: "Instagram", color: "#e4405f" },
    { href: siteInfo.socials.youtubeUrl, Icon: Youtube, label: "YouTube", color: "#ff0000" },
    { href: siteInfo.socials.linkedinUrl, Icon: Linkedin, label: "LinkedIn", color: "#0a66c2" },
    { href: siteInfo.socials.tiktokUrl, Icon: TikTok, label: "TikTok", color: "#000000" },
  ].filter((s) => s.href);

  const city = locale === "fr" ? siteInfo.address.cityFr : siteInfo.address.cityEn;

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
          className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
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
            <span className="text-brand-blue">{t.titleHighlight}</span>{t.titleSuffix}
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
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            <FadeIn className="lg:col-span-3">
              <h2 className="mb-2 font-display text-2xl font-bold text-brand-navy">{t.formTitle}</h2>
              <p className="mb-8 text-brand-navy/60">{t.formSubtitle}</p>
              <ContactForm dict={dict} />
            </FadeIn>

            <FadeIn delay={0.15} className="space-y-8 lg:col-span-2">
              <div>
                <h2 className="mb-2 font-display text-2xl font-bold text-brand-navy">{t.infoTitle}</h2>
                <p className="text-brand-navy/60">{t.infoSubtitle}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-blue/10">
                    <MapPin size={22} className="text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-brand-navy">{t.headquarters}</h3>
                    <p className="text-sm text-brand-navy/60">{siteInfo.address.line1}</p>
                    <p className="text-sm text-brand-navy/60">{city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-orange/10">
                    <Phone size={22} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-brand-navy">{t.phoneLabel}</h3>
                    {siteInfo.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="block text-sm text-brand-navy/60 transition-colors hover:text-brand-orange"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-yellow/15">
                    <Mail size={22} className="text-brand-yellow" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-brand-navy">{t.emailLabel}</h3>
                    <a href={`mailto:${siteInfo.email}`} className="text-sm text-brand-navy/60 transition-colors hover:text-brand-yellow">
                      {siteInfo.email}
                    </a>
                  </div>
                </div>
              </div>

              {socialItems.length > 0 && (
                <div>
                  <h3 className="mb-4 font-display text-base font-bold text-brand-navy">{t.social}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {socialItems.map(({ href, Icon, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-brand-navy/5 p-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <Icon size={20} style={{ color }} />
                        <span className="text-sm font-medium text-brand-navy/70 group-hover:text-brand-navy">{label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-brand-blue/10 bg-brand-blue/5 p-6">
                <h3 className="mb-4 font-display text-base font-bold text-brand-navy">{t.hours}</h3>
                <div className="space-y-2">
                  {siteInfo.hours.map((row, i) => {
                    const day = locale === "fr" ? row.dayFr : row.dayEn;
                    const value = locale === "fr" ? row.valueFr : row.valueEn;
                    return (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-brand-navy/60">{day}</span>
                        <span className="font-semibold text-brand-navy">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy">
        <div className="relative flex h-80 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-brand-blue/30 to-brand-orange/20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-brand-orange/10"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10 text-center text-white">
            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>
              <MapPin size={40} className="mx-auto mb-4 text-brand-yellow" />
            </motion.div>
            <p className="font-display text-lg font-bold">{t.mapTitle}</p>
            <p className="mt-1 text-white/50">{siteInfo.address.line1}, {city}</p>
          </div>
        </div>
      </section>

      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <FadeIn as="span" className="mb-4 inline-block font-display text-xs font-bold uppercase tracking-widest text-brand-orange">
              {t.regionsKicker}
            </FadeIn>
            <FadeIn as="h2" delay={0.1} className="font-display text-3xl font-extrabold text-brand-navy">
              {t.regionsTitle}
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((region, i) => (
              <FadeIn
                key={region.region}
                delay={i * 0.07}
                className="rounded-2xl border border-brand-navy/5 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="font-display text-base font-bold text-brand-navy">{region.region}</h3>
                <div className="mt-3 space-y-2 text-sm text-brand-navy/60">
                  <p className="flex items-center gap-2"><MapPin size={14} className="text-brand-blue" />{region.city}</p>
                  <a href={`tel:${region.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 transition-colors hover:text-brand-orange">
                    <Phone size={14} className="text-brand-orange" />
                    {region.phone}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
