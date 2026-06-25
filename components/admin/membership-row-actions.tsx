"use client";

import { useTransition } from "react";
import { Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  setApplicationStatus,
  deleteApplication,
} from "@/app/admin/(dashboard)/submissions/membership/actions";

type Props = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export function MembershipRowActions({ id, status }: Props) {
  const [pending, startTransition] = useTransition();

  function set(next: "APPROVED" | "REJECTED") {
    startTransition(async () => {
      try {
        await setApplicationStatus(id, next);
        toast.success(next === "APPROVED" ? "Approuvée" : "Refusée");
      } catch {
        toast.error("Erreur");
      }
    });
  }

  function remove() {
    if (!confirm("Supprimer cette candidature ?")) return;
    startTransition(async () => {
      try {
        await deleteApplication(id);
        toast.success("Supprimée");
      } catch {
        toast.error("Erreur");
      }
    });
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {status !== "APPROVED" && (
        <button
          type="button"
          onClick={() => set("APPROVED")}
          disabled={pending}
          className="rounded-lg p-2 text-emerald-600 transition-colors hover:bg-emerald-50"
          title="Approuver"
        >
          <Check size={16} />
        </button>
      )}
      {status !== "REJECTED" && (
        <button
          type="button"
          onClick={() => set("REJECTED")}
          disabled={pending}
          className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-brand-navy/5"
          title="Refuser"
        >
          <X size={16} />
        </button>
      )}
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
