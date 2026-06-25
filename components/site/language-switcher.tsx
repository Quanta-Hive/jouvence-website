"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type Props = {
  currentLocale: Locale;
  variant?: "navbar" | "footer";
  label?: string;
};

export function LanguageSwitcher({ currentLocale, variant = "navbar", label }: Props) {
  const pathname = usePathname();
  const target: Locale = currentLocale === "fr" ? "en" : "fr";

  const stripped = pathname.replace(/^\/(fr|en)/, "") || "/";
  const href = `/${target}${stripped === "/" ? "" : stripped}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-label={label ?? "Switch language"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all",
        variant === "navbar"
          ? "border border-brand-navy/15 text-brand-navy hover:border-brand-blue hover:text-brand-blue"
          : "text-white/70 hover:text-white",
      )}
    >
      <Globe size={14} />
      {target.toUpperCase()}
    </Link>
  );
}
