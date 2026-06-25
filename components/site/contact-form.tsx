"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { Dictionary } from "@/lib/i18n";

const inputClass =
  "w-full rounded-xl border border-brand-navy/10 bg-brand-surface px-4 py-3 text-sm text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition-all";

type Props = {
  dict: Dictionary;
};

export function ContactForm({ dict }: Props) {
  const t = dict.contact.form;
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success(dict.common.thankYouMessage);
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
          <label className="mb-2 block text-sm font-medium text-brand-navy/70">{t.firstName} *</label>
          <input name="firstName" type="text" required className={inputClass} placeholder={t.firstNamePlaceholder} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-brand-navy/70">{t.lastName} *</label>
          <input name="lastName" type="text" required className={inputClass} placeholder={t.lastNamePlaceholder} />
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-brand-navy/70">{t.email} *</label>
        <input name="email" type="email" required className={inputClass} placeholder="email@example.com" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-brand-navy/70">{t.phone}</label>
        <input name="phone" type="tel" className={inputClass} placeholder="+237 6XX XX XX XX" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-brand-navy/70">{t.subject} *</label>
        <select name="subject" required defaultValue="" className={inputClass}>
          <option value="" disabled>{t.subjectPlaceholder}</option>
          {t.subjects.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-brand-navy/70">{t.message} *</label>
        <textarea name="message" required rows={6} className={inputClass} placeholder={t.messagePlaceholder} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-gradient-to-r from-brand-blue via-brand-blue to-brand-blue-light py-4 font-display font-bold text-white shadow-lg shadow-brand-blue/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
      >
        {pending ? dict.common.submitting : t.submit}
      </button>
    </form>
  );
}
