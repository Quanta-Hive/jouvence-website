"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "./image-uploader";
import {
  createMember,
  updateMember,
  type ActionState,
} from "@/app/admin/(dashboard)/members/actions";
import { type PartyMemberInput } from "@/lib/validations/admin";

type Props = {
  memberId?: string;
  initial?: Partial<PartyMemberInput>;
};

export function MemberForm({ memberId, initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [name, setName] = useState(initial?.name ?? "");
  const [roleFr, setRoleFr] = useState(initial?.roleFr ?? "");
  const [roleEn, setRoleEn] = useState(initial?.roleEn ?? "");
  const [bioFr, setBioFr] = useState(initial?.bioFr ?? "");
  const [bioEn, setBioEn] = useState(initial?.bioEn ?? "");
  const [photoUrl, setPhotoUrl] = useState<string | null>(initial?.photoUrl ?? null);
  const [email, setEmail] = useState(initial?.email ?? "");
  const [facebookUrl, setFacebookUrl] = useState(initial?.facebookUrl ?? "");
  const [twitterUrl, setTwitterUrl] = useState(initial?.twitterUrl ?? "");
  const [linkedinUrl, setLinkedinUrl] = useState(initial?.linkedinUrl ?? "");
  const [isLeader, setIsLeader] = useState(initial?.isLeader ?? false);
  const [isPublished, setIsPublished] = useState(initial?.isPublished ?? true);
  const [order, setOrder] = useState(String(initial?.order ?? 0));

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: PartyMemberInput = {
      name,
      roleFr,
      roleEn,
      bioFr,
      bioEn,
      photoUrl,
      email: email || null,
      facebookUrl: facebookUrl || null,
      twitterUrl: twitterUrl || null,
      linkedinUrl: linkedinUrl || null,
      isLeader,
      isPublished,
      order: Number(order) || 0,
    };

    startTransition(async () => {
      let result: ActionState | undefined;
      try {
        result = memberId
          ? await updateMember(memberId, payload)
          : await createMember(payload);
      } catch {
        toast.success(memberId ? "Membre mis à jour" : "Membre créé");
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
            <Label>Nom complet</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Fonction (FR)</Label>
              <Input value={roleFr} onChange={(e) => setRoleFr(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Fonction (EN)</Label>
              <Input value={roleEn} onChange={(e) => setRoleEn(e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Biographie (FR)</Label>
              <Textarea value={bioFr} onChange={(e) => setBioFr(e.target.value)} rows={5} />
            </div>
            <div className="space-y-2">
              <Label>Biography (EN)</Label>
              <Textarea value={bioEn} onChange={(e) => setBioEn(e.target.value)} rows={5} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" value={email ?? ""} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input value={linkedinUrl ?? ""} onChange={(e) => setLinkedinUrl(e.target.value)} placeholder="https://…" />
            </div>
            <div className="space-y-2">
              <Label>Facebook</Label>
              <Input value={facebookUrl ?? ""} onChange={(e) => setFacebookUrl(e.target.value)} placeholder="https://…" />
            </div>
            <div className="space-y-2">
              <Label>Twitter / X</Label>
              <Input value={twitterUrl ?? ""} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="https://…" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
            <ImageUploader label="Photo" value={photoUrl} onChange={setPhotoUrl} />
          </div>

          <div className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
            <label className="flex items-center justify-between gap-3">
              <div>
                <div className="font-display text-sm font-semibold text-brand-navy">Visible sur le site</div>
                <p className="text-xs text-brand-navy/50">Publié sur la page À Propos.</p>
              </div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-5 w-5 accent-brand-blue"
              />
            </label>
            <label className="flex items-center justify-between gap-3">
              <div>
                <div className="font-display text-sm font-semibold text-brand-navy">Leader principal</div>
                <p className="text-xs text-brand-navy/50">Affiché en hero (un seul).</p>
              </div>
              <input
                type="checkbox"
                checked={isLeader}
                onChange={(e) => setIsLeader(e.target.checked)}
                className="h-5 w-5 accent-brand-blue"
              />
            </label>
            <div className="space-y-2">
              <Label>Ordre d&apos;affichage</Label>
              <Input type="number" min={0} value={order} onChange={(e) => setOrder(e.target.value)} />
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" disabled={pending} className="w-full" size="lg">
              {pending ? "Enregistrement…" : memberId ? "Mettre à jour" : "Ajouter le membre"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/admin/members")}>
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
