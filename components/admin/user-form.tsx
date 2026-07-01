"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { UserRole } from "@prisma/client";
import { Input } from "@/components/ui/input";
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
  createUser,
  updateUser,
  type ActionState,
} from "@/app/admin/(dashboard)/users/actions";
import { ROLE_LABELS } from "@/lib/permissions";

type Props = {
  userId?: string;
  initial?: {
    name?: string;
    email?: string;
    role?: UserRole;
  };
  isSelf?: boolean;
};

export function UserForm({ userId, initial, isSelf = false }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(initial?.role ?? "COMMUNITY_MANAGER");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      let result: ActionState | undefined;
      try {
        if (userId) {
          result = await updateUser(userId, { name, role, password: password || "" });
        } else {
          result = await createUser({ email, name, password, role });
        }
      } catch {
        toast.success(userId ? "Utilisateur mis à jour" : "Utilisateur créé");
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
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={Boolean(userId)}
              required={!userId}
              placeholder="email@parti-jouvence.cm"
            />
            {userId && (
              <p className="text-xs text-brand-navy/40">
                L&apos;email ne peut pas être modifié.
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label>
              Mot de passe
              {!userId && <span className="text-red-500"> *</span>}
            </Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!userId}
              placeholder={userId ? "Laisser vide pour ne pas changer" : "Minimum 8 caractères"}
              autoComplete="new-password"
            />
            <p className="text-xs text-brand-navy/40">8 caractères minimum.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <Label>Rôle</Label>
              <Select
                value={role}
                onValueChange={(v) => setRole(v as UserRole)}
                disabled={isSelf}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_LABELS).map(([k, l]) => (
                    <SelectItem key={k} value={k}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {isSelf && (
                <p className="text-xs text-amber-700">
                  Vous ne pouvez pas modifier votre propre rôle.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Button type="submit" disabled={pending} className="w-full" size="lg">
              {pending
                ? "Enregistrement…"
                : userId
                ? "Mettre à jour"
                : "Créer l'utilisateur"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.push("/admin/users")}
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
