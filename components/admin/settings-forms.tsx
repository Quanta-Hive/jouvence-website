"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProfile, updatePassword } from "@/app/admin/(dashboard)/settings/actions";

type ProfileProps = {
  defaultName: string;
  defaultEmail: string;
};

export function ProfileForm({ defaultName, defaultEmail }: ProfileProps) {
  const [pending, start] = useTransition();
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    start(async () => {
      const result = await updateProfile(data);
      if (result.ok) toast.success("Profil mis à jour");
      else toast.error(result.error ?? "Erreur");
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-bold text-brand-navy">Profil</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Nom</Label>
        <Input id="name" name="name" defaultValue={defaultName} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" value={defaultEmail} disabled />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : "Mettre à jour"}
      </Button>
    </form>
  );
}

export function PasswordForm() {
  const [pending, start] = useTransition();
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    start(async () => {
      const result = await updatePassword(data);
      if (result.ok) {
        toast.success("Mot de passe mis à jour");
        form.reset();
      } else {
        toast.error(result.error ?? "Erreur");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-brand-navy/5 bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-bold text-brand-navy">Mot de passe</h2>
      <div className="space-y-2">
        <Label htmlFor="currentPassword">Mot de passe actuel</Label>
        <Input id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="newPassword">Nouveau mot de passe</Label>
        <Input id="newPassword" name="newPassword" type="password" required minLength={8} autoComplete="new-password" />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Mise à jour…" : "Changer le mot de passe"}
      </Button>
    </form>
  );
}
