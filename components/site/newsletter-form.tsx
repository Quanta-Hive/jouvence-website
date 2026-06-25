"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  placeholder: string;
  buttonLabel: string;
  variant?: "footer" | "section";
  className?: string;
};

export function NewsletterForm({ locale, placeholder, buttonLabel, variant = "footer", className }: Props) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setPending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(locale === "fr" ? "Merci pour votre inscription !" : "Thanks for subscribing!");
      setEmail("");
    } catch {
      toast.error(locale === "fr" ? "Une erreur est survenue, veuillez réessayer." : "Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        variant === "footer"
          ? "flex flex-col gap-3"
          : "mx-auto flex max-w-xl flex-col gap-4 sm:flex-row",
        className,
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex-1 rounded-xl px-4 py-3 text-sm outline-none transition-all",
          variant === "footer"
            ? "border border-white/10 bg-white/10 text-white placeholder:text-white/40 focus:border-brand-blue"
            : "bg-white text-brand-navy placeholder:text-brand-navy/40 focus:ring-4 focus:ring-brand-yellow/30",
        )}
      />
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "rounded-xl px-5 py-3 font-display text-sm font-bold text-white transition-all disabled:opacity-60",
          variant === "footer"
            ? "bg-gradient-to-r from-brand-blue to-brand-blue-light shadow-md shadow-brand-blue/25 hover:-translate-y-0.5 hover:shadow-lg"
            : "bg-gradient-to-r from-brand-orange to-brand-orange-light shadow-md shadow-brand-orange/25 hover:-translate-y-0.5 hover:shadow-lg",
        )}
      >
        {pending ? "…" : buttonLabel}
      </button>
    </form>
  );
}
