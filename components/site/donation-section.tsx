"use client";

import { useState } from "react";
import { Smartphone, Building2, Copy, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import type { Dictionary } from "@/lib/i18n";

type Account = {
  id: string;
  name: string;
  numberLabel: string;
  number: string;
  copyValue: string;
  holder: string;
  badge: string;
  badgeBg: string;
  isBank?: boolean;
};

type Props = {
  dict: Dictionary;
};

export function DonationSection({ dict }: Props) {
  const t = dict.getInvolved;
  const [copied, setCopied] = useState<string | null>(null);

  function copy(text: string, key: string) {
    if (typeof navigator === "undefined") return;
    void navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  const mobileAccounts: Account[] = [
    {
      id: "mtn-z",
      name: "MTN Mobile Money",
      numberLabel: t.accountNumber,
      number: "+237 698835859",
      copyValue: "+237698835859",
      holder: "JOUVENCE LA JEUNESSE CAMEROUNAISE EN POLITIQUE",
      badge: "Z",
      badgeBg: "#ffcb08",
    },
    {
      id: "taptap",
      name: "Taptap Send",
      numberLabel: t.accountNumber,
      number: "+237 698835859",
      copyValue: "+237698835859",
      holder: "KANGA FOTSO LEOMELA SORELLE",
      badge: "T",
      badgeBg: "#16a34a",
    },
    {
      id: "mtn-2",
      name: "MTN Mobile Money",
      numberLabel: t.accountNumber,
      number: "+237 653427530",
      copyValue: "+237653427530",
      holder: "JOUVENCE-JCPVCP — KANGA FOTSO LEOMELA SORELLE",
      badge: "M",
      badgeBg: "#ffcb08",
    },
  ];

  const bankAccounts: Account[] = [
    {
      id: "afriland",
      name: "Afriland First Bank",
      numberLabel: t.accountIban,
      number: "CM21 10005 00001 10325811101-48",
      copyValue: "CM21100050000110325811101-48",
      holder: "JOUVENCE LA JEUNESSE CAMEROUNAISE EN POLITIQUE",
      badge: "AF",
      badgeBg: "#1d9bf0",
      isBank: true,
    },
    {
      id: "afg",
      name: "AFG",
      numberLabel: t.accountIban,
      number: "CM21 10034 00050 00076460801-75",
      copyValue: "CM21100340005000076460801-75",
      holder: "JOUVENCE-JCPVCP",
      badge: "AFG",
      badgeBg: "#16a34a",
      isBank: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border-2 border-brand-orange/20 bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10">
            <Smartphone size={24} className="text-brand-orange" />
          </div>
          <h3 className="font-display text-xl font-bold text-brand-navy">{t.mobileMoney}</h3>
        </div>

        <div className="space-y-6">
          {mobileAccounts.map((acc) => (
            <div key={acc.id} className="rounded-xl border border-brand-yellow/20 bg-brand-yellow/5 p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-xs font-bold text-white" style={{ background: acc.badgeBg }}>
                  {acc.badge}
                </div>
                <span className="font-display font-bold text-brand-navy">{acc.name}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-brand-navy/60">{acc.numberLabel}:</span>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-brand-navy">{acc.number}</span>
                  <motion.button
                    type="button"
                    onClick={() => copy(acc.copyValue, acc.id)}
                    className="rounded-lg p-1.5 transition-colors hover:bg-brand-navy/5"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={t.copy}
                  >
                    {copied === acc.id ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Copy size={16} className="text-brand-navy/40" />}
                  </motion.button>
                </div>
              </div>
              <div className="mt-2 border-t border-brand-yellow/20 pt-2 text-xs text-brand-navy/50">{acc.holder}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border-2 border-brand-blue/20 bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10">
            <Building2 size={24} className="text-brand-blue" />
          </div>
          <h3 className="font-display text-xl font-bold text-brand-navy">{t.bankTransfer}</h3>
        </div>

        <div className="space-y-6">
          {bankAccounts.map((acc) => (
            <div key={acc.id} className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg font-display text-xs font-bold text-white" style={{ background: acc.badgeBg }}>
                  <Building2 size={18} />
                </div>
                <span className="font-display text-base font-bold text-brand-navy">{acc.name}</span>
              </div>
              <div className="text-xs text-brand-navy/50">{acc.numberLabel}:</div>
              <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-brand-blue/20 bg-white p-3">
                <span className="font-display text-sm font-semibold text-brand-navy">{acc.number}</span>
                <motion.button
                  type="button"
                  onClick={() => copy(acc.copyValue, acc.id)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-brand-navy/5"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={t.copy}
                >
                  {copied === acc.id ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Copy size={16} className="text-brand-navy/40" />}
                </motion.button>
              </div>
              <div className="mt-2 border-t border-brand-blue/20 pt-2 text-xs text-brand-navy/50">
                {t.accountHolder}: {acc.holder}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
