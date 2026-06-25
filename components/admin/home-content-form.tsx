"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Lightbulb, Shield, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { updateHomeContent } from "@/app/admin/(dashboard)/home/actions";
import type { HomeContent, HomeFigure, HomeStat } from "@/lib/validations/site-settings";

type Props = {
  initial: HomeContent;
};

type Lang = "fr" | "en";

const statIcons = [Users, TrendingUp, Shield, Lightbulb] as const;
const statColors = ["#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0"];
const statHints = [
  "Sous le hero — 1ère carte",
  "Sous le hero — 2ème carte",
  "Sous le hero — 3ème carte",
  "Sous le hero — 4ème carte",
];

const figureColors = ["#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0", "#ff700c", "#ffcb08", "#1d9bf0", "#ff700c"];
const figureHints = [
  "« Cameroun en chiffres » — rangée 1, tuile 1",
  "« Cameroun en chiffres » — rangée 1, tuile 2",
  "« Cameroun en chiffres » — rangée 1, tuile 3",
  "« Cameroun en chiffres » — rangée 1, tuile 4",
  "« Cameroun en chiffres » — rangée 2, tuile 1",
  "« Cameroun en chiffres » — rangée 2, tuile 2",
  "« Cameroun en chiffres » — rangée 2, tuile 3",
  "« Cameroun en chiffres » — rangée 2, tuile 4",
];

export function HomeContentForm({ initial }: Props) {
  const [pending, startTransition] = useTransition();
  const [lang, setLang] = useState<Lang>("fr");
  const [membersBadge, setMembersBadge] = useState(initial.membersBadge);
  const [stats, setStats] = useState<HomeStat[]>(initial.stats);
  const [figures, setFigures] = useState<HomeFigure[]>(initial.figures);

  function updateStat(index: number, field: keyof HomeStat, value: string) {
    setStats((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function updateFigure(index: number, field: keyof HomeFigure, value: string) {
    setFigures((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: HomeContent = { membersBadge, stats, figures };
    startTransition(async () => {
      const result = await updateHomeContent(payload);
      if (result.ok) {
        toast.success("Page d'accueil mise à jour");
      } else {
        toast.error(result.error ?? "Erreur");
      }
    });
  }

  const statLabelField = lang === "fr" ? "labelFr" : "labelEn";
  const statDescField = lang === "fr" ? "descFr" : "descEn";
  const figureLabelField = lang === "fr" ? "labelFr" : "labelEn";
  const figureSubField = lang === "fr" ? "sublabelFr" : "sublabelEn";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="sticky top-0 z-10 -mx-8 flex items-center justify-between gap-4 border-b border-brand-navy/5 bg-brand-surface/80 px-8 py-3 backdrop-blur">
        <p className="text-sm text-brand-navy/60">
          Langue éditée — les valeurs numériques sont partagées entre les deux langues.
        </p>
        <LangTabs lang={lang} onChange={setLang} />
      </div>

      <section className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
        <div>
          <h2 className="font-display text-lg font-bold text-brand-navy">Badge membres (hero)</h2>
          <p className="mt-1 text-sm text-brand-navy/60">
            Pastille bleue affichée en haut à droite du portrait du leader, dans le hero.
          </p>
        </div>
        <div className="max-w-xs space-y-2">
          <Label htmlFor="membersBadge">Valeur</Label>
          <Input
            id="membersBadge"
            value={membersBadge}
            onChange={(e) => setMembersBadge(e.target.value)}
            required
            maxLength={40}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
        <div>
          <h2 className="font-display text-lg font-bold text-brand-navy">Statistiques principales</h2>
          <p className="mt-1 text-sm text-brand-navy/60">
            Les 4 cartes affichées juste sous le hero. L&apos;icône et la couleur sont fixées par position.
          </p>
        </div>
        <div className="space-y-4">
          {stats.map((stat, i) => {
            const Icon = statIcons[i];
            const color = statColors[i];
            return (
              <div key={i} className="rounded-xl border border-brand-navy/5 bg-brand-surface/40 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${color}15` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-sm font-semibold text-brand-navy">Statistique {i + 1}</div>
                    <div className="text-xs text-brand-navy/50">{statHints[i]}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Valeur</Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => updateStat(i, "value", e.target.value)}
                      required
                      maxLength={40}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Libellé ({lang.toUpperCase()})</Label>
                    <Input
                      key={`${i}-label-${lang}`}
                      value={stat[statLabelField]}
                      onChange={(e) => updateStat(i, statLabelField, e.target.value)}
                      required
                      maxLength={120}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description ({lang.toUpperCase()})</Label>
                    <Input
                      key={`${i}-desc-${lang}`}
                      value={stat[statDescField]}
                      onChange={(e) => updateStat(i, statDescField, e.target.value)}
                      required
                      maxLength={200}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
        <div>
          <h2 className="font-display text-lg font-bold text-brand-navy">Chiffres clés (Cameroun)</h2>
          <p className="mt-1 text-sm text-brand-navy/60">
            Les 8 tuiles affichées dans la section « Le Cameroun en chiffres » (grille 4 colonnes sur desktop).
          </p>
        </div>
        <div className="space-y-4">
          {figures.map((figure, i) => {
            const color = figureColors[i];
            return (
              <div key={i} className="rounded-xl border border-brand-navy/5 bg-brand-surface/40 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg font-display text-sm font-bold text-white"
                    style={{ background: color }}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-sm font-semibold text-brand-navy">Chiffre {i + 1}</div>
                    <div className="text-xs text-brand-navy/50">{figureHints[i]}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Valeur</Label>
                    <Input
                      value={figure.value}
                      onChange={(e) => updateFigure(i, "value", e.target.value)}
                      required
                      maxLength={40}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Libellé ({lang.toUpperCase()})</Label>
                    <Input
                      key={`${i}-label-${lang}`}
                      value={figure[figureLabelField]}
                      onChange={(e) => updateFigure(i, figureLabelField, e.target.value)}
                      required
                      maxLength={120}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sous-libellé ({lang.toUpperCase()})</Label>
                    <Input
                      key={`${i}-sub-${lang}`}
                      value={figure[figureSubField]}
                      onChange={(e) => updateFigure(i, figureSubField, e.target.value)}
                      required
                      maxLength={200}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} size="lg">
          {pending ? "Enregistrement…" : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}

function LangTabs({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Langue éditée"
      className="inline-flex rounded-lg border border-brand-navy/10 bg-white p-1"
    >
      {(["fr", "en"] as const).map((value) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={lang === value}
          onClick={() => onChange(value)}
          className={cn(
            "rounded-md px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition",
            lang === value
              ? "bg-brand-navy text-white shadow-sm"
              : "text-brand-navy/50 hover:text-brand-navy",
          )}
        >
          {value === "fr" ? "Français" : "English"}
        </button>
      ))}
    </div>
  );
}
