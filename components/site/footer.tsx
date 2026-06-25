import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, TikTok } from "./social-icons";
import { NewsletterForm } from "./newsletter-form";
import type { Locale, Dictionary } from "@/lib/i18n";
import type { SiteInfo } from "@/lib/validations/site-settings";

type Props = {
  locale: Locale;
  dict: Dictionary;
  siteInfo: SiteInfo;
};

export function Footer({ locale, dict, siteInfo }: Props) {
  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/program`, label: dict.nav.program },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/get-involved`, label: dict.nav.getInvolved },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const socialLinks = [
    { href: siteInfo.socials.facebookUrl, Icon: Facebook, label: "Facebook" },
    { href: siteInfo.socials.twitterUrl, Icon: Twitter, label: "Twitter" },
    { href: siteInfo.socials.instagramUrl, Icon: Instagram, label: "Instagram" },
    { href: siteInfo.socials.youtubeUrl, Icon: Youtube, label: "YouTube" },
    { href: siteInfo.socials.linkedinUrl, Icon: Linkedin, label: "LinkedIn" },
    { href: siteInfo.socials.tiktokUrl, Icon: TikTok, label: "TikTok" },
  ].filter((s) => s.href);

  const city = locale === "fr" ? siteInfo.address.cityFr : siteInfo.address.cityEn;

  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/brand/logo-white.png"
              alt="Parti Jouvence"
              width={120}
              height={120}
              className="mb-6 h-16 w-auto"
            />
            <p className="mb-6 text-sm leading-relaxed text-white/60">{dict.footer.tagline}</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all hover:scale-110 hover:bg-brand-blue"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
              {dict.footer.navigation}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                  >
                    <ChevronRight size={14} className="text-brand-orange transition-transform group-hover:translate-x-1" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
              {dict.footer.contact}
            </h3>
            <div className="space-y-3 text-sm text-white/60">
              <p>{siteInfo.address.line1}</p>
              <p>{city}</p>
              {siteInfo.phones.map((phone) => (
                <p key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                </p>
              ))}
              <p>
                <a href={`mailto:${siteInfo.email}`} className="hover:text-white transition-colors">
                  {siteInfo.email}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-6 font-display text-xs font-bold uppercase tracking-widest text-brand-yellow">
              {dict.footer.newsletter}
            </h3>
            <p className="mb-4 text-sm text-white/60">{dict.footer.newsletterDescription}</p>
            <NewsletterForm
              locale={locale}
              placeholder={dict.footer.newsletterEmailPlaceholder}
              buttonLabel={dict.footer.subscribe}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-white/40 sm:px-6 md:flex-row lg:px-8">
          <p>{dict.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">{dict.footer.legal}</a>
            <a href="#" className="hover:text-white transition-colors">{dict.footer.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
