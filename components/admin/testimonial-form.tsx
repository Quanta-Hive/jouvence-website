"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "./image-uploader";
import { type TestimonialInput } from "@/lib/validations/admin";
import {
  createTestimonial,
  updateTestimonial,
  type ActionState,
} from "@/app/admin/(dashboard)/testimonials/actions";

type Props = {
  testimonialId?: string;
  initial?: Partial<TestimonialInput>;
};

export function TestimonialForm({ testimonialId, initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [name, setName] = useState(initial?.name ?? "");
  const [roleFr, setRoleFr] = useState(initial?.roleFr ?? "");
  const [roleEn, setRoleEn] = useState(initial?.roleEn ?? "");
  const [quoteFr, setQuoteFr] = useState(initial?.quoteFr ?? "");
  const [quoteEn, setQuoteEn] = useState(initial?.quoteEn ?? "");
  const [photoUrl, setPhotoUrl] = useState<string | null>(initial?.photoUrl ?? null);
  const [isPublished, setIsPublished] = useState(initial?.isPublished ?? true);
  const [order, setOrder] = useState(String(initial?.order ?? 0));

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: TestimonialInput = {
      name,
      roleFr,
      roleEn,
      quoteFr,
      quoteEn,
      photoUrl,
      isPublished,
      order: Number(order) || 0,
    };
    startTransition(async () => {
      let result: ActionState | undefined;
      try {
        result = testimonialId
          ? await updateTestimonial(testimonialId, payload)
          : await createTestimonial(payload);
      } catch {
        toast.success(testimonialId ? "Témoignage mis à jour" : "Témoignage créé");
        return;
      }
      if (result && !result.ok) {
        toast.error(result.error ?? "Erreur");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <Label>Nom</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Description (FR)</Label>
              <Input value={roleFr} onChange={(e) => setRoleFr(e.target.value)} required placeholder="Ex. Étudiante à Yaoundé" />
            </div>
            <div className="space-y-2">
              <Label>Description (EN)</Label>
              <Input value={roleEn} onChange={(e) => setRoleEn(e.target.value)} required placeholder="E.g. Student in Yaoundé" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Citation (FR)</Label>
              <Textarea value={quoteFr} onChange={(e) => setQuoteFr(e.target.value)} rows={5} required />
            </div>
            <div className="space-y-2">
              <Label>Quote (EN)</Label>
              <Textarea value={quoteEn} onChange={(e) => setQuoteEn(e.target.value)} rows={5} required />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
            <ImageUploader label="Photo (facultatif)" value={photoUrl} onChange={setPhotoUrl} />
          </div>
          <div className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
            <label className="flex items-center justify-between gap-3">
              <div className="font-display text-sm font-semibold text-brand-navy">Visible sur le site</div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-5 w-5 accent-brand-blue"
              />
            </label>
            <div className="space-y-2">
              <Label>Ordre</Label>
              <Input type="number" min={0} value={order} onChange={(e) => setOrder(e.target.value)} />
            </div>
          </div>
          <div className="space-y-3">
            <Button type="submit" disabled={pending} className="w-full" size="lg">
              {pending ? "Enregistrement…" : testimonialId ? "Mettre à jour" : "Ajouter"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/admin/testimonials")}>
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
