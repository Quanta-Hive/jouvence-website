"use client";

import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteBlogPost } from "@/app/admin/(dashboard)/blog/actions";

export function DeletePostButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  function onClick() {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      try {
        await deleteBlogPost(id);
        toast.success("Article supprimé");
      } catch {
        toast.error("Échec de la suppression");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className={`rounded-lg p-2 transition-colors ${
        confirming ? "bg-red-100 text-red-600" : "text-brand-navy/60 hover:bg-red-50 hover:text-red-600"
      }`}
      aria-label={confirming ? "Confirmer la suppression" : "Supprimer"}
      title={confirming ? "Confirmer" : "Supprimer"}
    >
      <Trash2 size={16} />
    </button>
  );
}
