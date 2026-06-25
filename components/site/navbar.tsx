"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { cn } from "@/lib/utils";
import type { Locale, Dictionary } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Navbar({ locale, dict }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMenu = () => setOpen(false);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/program`, label: dict.nav.program },
    { href: `/${locale}/news`, label: dict.nav.news },
    { href: `/${locale}/get-involved`, label: dict.nav.getInvolved },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  const isActive = (href: string) => {
    const base = `/${locale}`;
    if (href === base) return pathname === base;
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white shadow-sm",
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-24 lg:px-8">
        <Link href={`/${locale}`} className="flex items-center">
          <Image
            src="/brand/logo.png"
            alt="Parti Jouvence"
            width={120}
            height={120}
            priority
            className="h-16 w-auto md:h-20"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-md px-3 py-2 font-display text-sm transition-colors",
                isActive(link.href)
                  ? "font-bold text-brand-blue"
                  : "font-semibold text-brand-navy hover:text-brand-blue",
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full bg-brand-blue"
                />
              )}
            </Link>
          ))}

          <LanguageSwitcher currentLocale={locale} label={dict.common.switchLanguage} />

          <Link
            href={`/${locale}/get-involved`}
            className="ml-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-light px-5 py-2.5 font-display text-sm font-bold text-white shadow-md shadow-brand-orange/25 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            {dict.nav.join}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-brand-navy hover:bg-brand-navy/5 transition-colors lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="border-t border-brand-navy/5 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-4 py-3 font-display transition-colors",
                    isActive(link.href)
                      ? "bg-brand-blue/10 font-bold text-brand-blue"
                      : "font-semibold text-brand-navy hover:bg-brand-navy/5",
                  )}
                >
                  {link.label}
                  <ChevronRight size={16} />
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2">
                <LanguageSwitcher currentLocale={locale} label={dict.common.switchLanguage} />
                <Link
                  href={`/${locale}/get-involved`}
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-orange to-brand-orange-light px-5 py-2.5 font-display text-sm font-bold text-white shadow-md shadow-brand-orange/25"
                >
                  {dict.nav.join}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
