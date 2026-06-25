"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateSiteInfo } from "@/app/admin/(dashboard)/site-info/actions";
import type { HourRow, SiteInfo, Socials } from "@/lib/validations/site-settings";

type Props = {
  initial: SiteInfo;
};

const socialFields: Array<{ key: keyof Socials; label: string; placeholder: string }> = [
  { key: "facebookUrl", label: "Facebook", placeholder: "https://facebook.com/…" },
  { key: "twitterUrl", label: "Twitter / X", placeholder: "https://x.com/…" },
  { key: "instagramUrl", label: "Instagram", placeholder: "https://instagram.com/…" },
  { key: "youtubeUrl", label: "YouTube", placeholder: "https://youtube.com/@…" },
  { key: "linkedinUrl", label: "LinkedIn", placeholder: "https://linkedin.com/company/…" },
  { key: "tiktokUrl", label: "TikTok", placeholder: "https://tiktok.com/@…" },
];

const emptyHourRow: HourRow = { dayFr: "", dayEn: "", valueFr: "", valueEn: "" };

export function SiteInfoForm({ initial }: Props) {
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState(initial.email);
  const [phones, setPhones] = useState<string[]>(initial.phones);
  const [line1, setLine1] = useState(initial.address.line1);
  const [cityFr, setCityFr] = useState(initial.address.cityFr);
  const [cityEn, setCityEn] = useState(initial.address.cityEn);
  const [socials, setSocials] = useState<Socials>(initial.socials);
  const [hours, setHours] = useState<HourRow[]>(initial.hours);

  function updatePhone(i: number, value: string) {
    setPhones((prev) => prev.map((p, idx) => (idx === i ? value : p)));
  }
  function addPhone() {
    if (phones.length >= 5) return;
    setPhones((prev) => [...prev, ""]);
  }
  function removePhone(i: number) {
    if (phones.length <= 1) return;
    setPhones((prev) => prev.filter((_, idx) => idx !== i));
  }

  function updateSocial(key: keyof Socials, value: string) {
    setSocials((prev) => ({ ...prev, [key]: value }));
  }

  function updateHour(i: number, field: keyof HourRow, value: string) {
    setHours((prev) => prev.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));
  }
  function addHour() {
    if (hours.length >= 10) return;
    setHours((prev) => [...prev, emptyHourRow]);
  }
  function removeHour(i: number) {
    if (hours.length <= 1) return;
    setHours((prev) => prev.filter((_, idx) => idx !== i));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: SiteInfo = {
      email,
      phones: phones.map((p) => p.trim()).filter((p) => p.length > 0),
      address: { line1, cityFr, cityEn },
      socials,
      hours,
    };
    startTransition(async () => {
      const result = await updateSiteInfo(payload);
      if (result.ok) {
        toast.success("Coordonnées mises à jour");
      } else {
        toast.error(result.error ?? "Erreur");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-brand-navy">Adresse du siège</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="line1">Quartier / Rue</Label>
            <Input id="line1" value={line1} onChange={(e) => setLine1(e.target.value)} required maxLength={120} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cityFr">Ville, Pays (FR)</Label>
            <Input id="cityFr" value={cityFr} onChange={(e) => setCityFr(e.target.value)} required maxLength={120} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cityEn">City, Country (EN)</Label>
            <Input id="cityEn" value={cityEn} onChange={(e) => setCityEn(e.target.value)} required maxLength={120} />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-brand-navy">Email</h2>
        <div className="max-w-md space-y-2">
          <Label htmlFor="email">Email de contact</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength={160}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-brand-navy">Téléphones</h2>
          <Button type="button" variant="outline" size="sm" onClick={addPhone} disabled={phones.length >= 5}>
            <Plus size={14} />
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {phones.map((phone, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={phone}
                onChange={(e) => updatePhone(i, e.target.value)}
                placeholder="+237 6XX XX XX XX"
                required
                maxLength={40}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removePhone(i)}
                disabled={phones.length <= 1}
                aria-label="Supprimer"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
        <div>
          <h2 className="font-display text-lg font-bold text-brand-navy">Réseaux sociaux</h2>
          <p className="mt-1 text-sm text-brand-navy/60">
            Laissez vide les réseaux non utilisés — ils ne seront pas affichés.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {socialFields.map(({ key, label, placeholder }) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                value={socials[key]}
                onChange={(e) => updateSocial(key, e.target.value)}
                placeholder={placeholder}
                maxLength={500}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-brand-navy">Horaires d&apos;ouverture</h2>
          <Button type="button" variant="outline" size="sm" onClick={addHour} disabled={hours.length >= 10}>
            <Plus size={14} />
            Ajouter
          </Button>
        </div>
        <div className="space-y-4">
          {hours.map((row, i) => (
            <div key={i} className="rounded-xl border border-brand-navy/5 bg-brand-surface/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-brand-navy">Ligne {i + 1}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeHour(i)}
                  disabled={hours.length <= 1}
                  aria-label="Supprimer"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <div className="space-y-2">
                  <Label>Jour (FR)</Label>
                  <Input
                    value={row.dayFr}
                    onChange={(e) => updateHour(i, "dayFr", e.target.value)}
                    required
                    maxLength={80}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Day (EN)</Label>
                  <Input
                    value={row.dayEn}
                    onChange={(e) => updateHour(i, "dayEn", e.target.value)}
                    required
                    maxLength={80}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Horaire (FR)</Label>
                  <Input
                    value={row.valueFr}
                    onChange={(e) => updateHour(i, "valueFr", e.target.value)}
                    required
                    maxLength={80}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hours (EN)</Label>
                  <Input
                    value={row.valueEn}
                    onChange={(e) => updateHour(i, "valueEn", e.target.value)}
                    required
                    maxLength={80}
                  />
                </div>
              </div>
            </div>
          ))}
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
