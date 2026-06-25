"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  onDelete: () => Promise<void>;
  label?: string;
};

export function DeleteButton({ onDelete, label = "Supprimer" }: Props) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function handle() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      try {
        await onDelete();
        toast.success(label === "Supprimer" ? "Supprimé" : label);
      } catch {
        toast.error("Échec de la suppression");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={pending}
      className={`rounded-lg p-2 transition-colors ${
        confirming ? "bg-red-100 text-red-600" : "text-brand-navy/60 hover:bg-red-50 hover:text-red-600"
      }`}
      aria-label={confirming ? "Confirmer" : label}
      title={confirming ? "Confirmer" : label}
    >
      <Trash2 size={16} />
    </button>
  );
}
