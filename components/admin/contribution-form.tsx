"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createContribution,
  updateContribution,
  type ActionState,
} from "@/app/admin/(dashboard)/contributions/actions";
import { type ContributionInput } from "@/lib/validations/admin";
import {
  CONTRIBUTION_TYPE_LABELS,
  PAYMENT_MODE_LABELS,
  CONTRIBUTOR_KIND_LABELS,
  REGION_LABELS,
} from "@/lib/contributions";

type Props = {
  contributionId?: string;
  initial?: Partial<ContributionInput>;
};

function todayIso() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function toDateInput(value: unknown): string {
  if (!value) return todayIso();
  const d = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(d.getTime())) return todayIso();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function ContributionForm({ contributionId, initial }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const [date, setDate] = useState(toDateInput(initial?.date));
  const [contributorKind, setContributorKind] = useState<
    ContributionInput["contributorKind"]
  >(initial?.contributorKind ?? "MEMBRE");
  const [matricule, setMatricule] = useState(initial?.matricule ?? "");
  const [contributorName, setContributorName] = useState(initial?.contributorName ?? "");
  const [type, setType] = useState<ContributionInput["type"]>(
    initial?.type ?? "COTISATION",
  );
  const [amount, setAmount] = useState(String(initial?.amount ?? ""));
  const [estimatedValue, setEstimatedValue] = useState(
    initial?.estimatedValue != null ? String(initial.estimatedValue) : "",
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [paymentMode, setPaymentMode] = useState<ContributionInput["paymentMode"]>(
    initial?.paymentMode ?? "ESPECES",
  );
  const [collectedBy, setCollectedBy] = useState(initial?.collectedBy ?? "");
  const [receiptNumber, setReceiptNumber] = useState(initial?.receiptNumber ?? "");
  const [region, setRegion] = useState<string>(initial?.region ?? "");
  const [comments, setComments] = useState(initial?.comments ?? "");

  const isInKind = type === "DON_EN_NATURE";
  const isMember = contributorKind === "MEMBRE";

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: ContributionInput = {
      date: new Date(date),
      contributorKind,
      matricule: matricule.trim() || null,
      contributorName: contributorName.trim(),
      type,
      amount: isInKind ? 0 : Number(amount) || 0,
      estimatedValue: isInKind ? Number(estimatedValue) || 0 : null,
      description,
      paymentMode,
      collectedBy,
      receiptNumber: receiptNumber.trim() || null,
      region: region ? (region as ContributionInput["region"]) : null,
      comments,
    };

    startTransition(async () => {
      let result: ActionState | undefined;
      try {
        result = contributionId
          ? await updateContribution(contributionId, payload)
          : await createContribution(payload);
      } catch {
        toast.success(contributionId ? "Contribution mise à jour" : "Contribution enregistrée");
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Date de la contribution</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Statut du contributeur</Label>
              <Select
                value={contributorKind}
                onValueChange={(v) =>
                  setContributorKind(v as ContributionInput["contributorKind"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CONTRIBUTOR_KIND_LABELS).map(([k, l]) => (
                    <SelectItem key={k} value={k}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>
                Matricule {isMember && <span className="text-red-500">*</span>}
              </Label>
              <Input
                value={matricule}
                onChange={(e) => setMatricule(e.target.value)}
                placeholder={isMember ? "Obligatoire" : "—"}
                disabled={!isMember}
                required={isMember}
              />
            </div>
            <div className="space-y-2">
              <Label>Noms &amp; Prénoms</Label>
              <Input
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Type de contribution</Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as ContributionInput["type"])}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CONTRIBUTION_TYPE_LABELS).map(([k, l]) => (
                    <SelectItem key={k} value={k}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Mode de paiement</Label>
              <Select
                value={paymentMode}
                onValueChange={(v) =>
                  setPaymentMode(v as ContributionInput["paymentMode"])
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PAYMENT_MODE_LABELS).map(([k, l]) => (
                    <SelectItem key={k} value={k}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {!isInKind && (
              <div className="space-y-2">
                <Label>Montant (FCFA)</Label>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            )}
            {isInKind && (
              <div className="space-y-2">
                <Label>Valeur estimée (FCFA)</Label>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>N° reçu</Label>
              <Input
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
                placeholder="Optionnel"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Description {isInKind && <span className="text-brand-navy/40">(nature du don)</span>}
            </Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder={isInKind ? "Ex. 50 sacs de riz, matériel informatique…" : "Optionnel"}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <Label>Collecté par</Label>
              <Input
                value={collectedBy}
                onChange={(e) => setCollectedBy(e.target.value)}
                placeholder="Nom de l'agent collecteur"
              />
            </div>
            <div className="space-y-2">
              <Label>Région / Section</Label>
              <Select
                value={region || "NONE"}
                onValueChange={(v) => setRegion(v === "NONE" ? "" : v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="—" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NONE">—</SelectItem>
                  {Object.entries(REGION_LABELS).map(([k, l]) => (
                    <SelectItem key={k} value={k}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Commentaires</Label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" disabled={pending} className="w-full" size="lg">
              {pending
                ? "Enregistrement…"
                : contributionId
                ? "Mettre à jour"
                : "Enregistrer la contribution"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/admin/contributions")}
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
