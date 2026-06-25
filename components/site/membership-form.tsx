"use client";

import { useState } from "react";
import { toast } from "sonner";
import { REGIONS } from "@/lib/validations/forms";
import type { Locale, Dictionary } from "@/lib/i18n";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const inputClass =
  "w-full rounded-xl border border-brand-navy/10 bg-brand-surface px-4 py-3 text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all";

export function MembershipForm({ locale, dict }: Props) {
  const t = dict.getInvolved.form;
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(locale === "fr" ? "Candidature envoyée !" : "Application sent!");
      form.reset();
    } catch {
      toast.error(dict.common.errorOccurred);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-brand-navy/70">
            {t.fullName} {t.required}
          </label>
          <input name="fullName" type="text" required className={inputClass} placeholder={t.fullNamePlaceholder} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-brand-navy/70">
            {t.birthDate} {t.required}
          </label>
          <input name="birthDate" type="date" required className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-brand-navy/70">
            {t.email} {t.required}
          </label>
          <input name="email" type="email" required className={inputClass} placeholder={t.emailPlaceholder} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-brand-navy/70">
            {t.phone} {t.required}
          </label>
          <input name="phone" type="tel" required className={inputClass} placeholder={t.phonePlaceholder} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-brand-navy/70">
            {t.region} {t.required}
          </label>
          <select name="region" required defaultValue="" className={inputClass}>
            <option value="" disabled>{t.regionPlaceholder}</option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-brand-navy/70">
            {t.city} {t.required}
          </label>
          <input name="city" type="text" required className={inputClass} placeholder={t.cityPlaceholder} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-brand-navy/70">{t.profession}</label>
        <input name="profession" type="text" className={inputClass} placeholder={t.professionPlaceholder} />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-brand-navy/70">{t.motivation}</label>
        <textarea name="motivation" rows={4} className={inputClass} placeholder={t.motivationPlaceholder} />
      </div>
      <div className="flex items-start gap-3">
        <input type="checkbox" required id="terms" className="mt-1 h-4 w-4 accent-brand-blue" />
        <label htmlFor="terms" className="text-sm text-brand-navy/60">{t.terms}</label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-brand-blue to-brand-blue-light py-4 font-display font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60"
      >
        {pending ? dict.common.submitting : t.submit}
      </button>
    </form>
  );
}
