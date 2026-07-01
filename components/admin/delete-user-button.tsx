"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { deleteUser } from "@/app/admin/(dashboard)/users/actions";

export function DeleteUserButton({ id, disabled }: { id: string; disabled?: boolean }) {
  const [pending, startTransition] = useTransition();

  function onClick() {
    if (disabled) return;
    if (!confirm("Supprimer cet utilisateur ?")) return;
    startTransition(async () => {
      const result = await deleteUser(id);
      if (!result.ok) {
        toast.error(result.error ?? "Erreur");
      } else {
        toast.success("Utilisateur supprimé");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending || disabled}
      title={disabled ? "Action indisponible" : "Supprimer"}
      className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand-navy/60"
    >
      <Trash2 size={16} />
    </button>
  );
}
