"use client";

import { useTransition } from "react";
import { CheckCircle2, Circle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { markContactRead, deleteContact } from "@/app/admin/(dashboard)/submissions/contact/actions";

type Props = {
  id: string;
  isRead: boolean;
};

export function ContactRowActions({ id, isRead }: Props) {
  const [pending, startTransition] = useTransition();

  function toggle() {
    startTransition(async () => {
      try {
        await markContactRead(id, !isRead);
      } catch {
        toast.error("Erreur");
      }
    });
  }

  function remove() {
    if (!confirm("Supprimer ce message ?")) return;
    startTransition(async () => {
      try {
        await deleteContact(id);
        toast.success("Message supprimé");
      } catch {
        toast.error("Erreur");
      }
    });
  }

  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
        title={isRead ? "Marquer non lu" : "Marquer lu"}
      >
        {isRead ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Circle size={16} />}
      </button>
      <button
        type="button"
        onClick={remove}
        disabled={pending}
        className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-red-50 hover:text-red-600"
        title="Supprimer"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
