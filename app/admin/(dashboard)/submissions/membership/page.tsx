import { prisma } from "@/lib/db";
import { requireSection } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/page-header";
import { MembershipRowActions } from "@/components/admin/membership-row-actions";
import { formatDate } from "@/lib/utils";

const STATUS_LABELS: Record<string, string> = {
  PENDING: "En attente",
  APPROVED: "Approuvée",
  REJECTED: "Refusée",
};

const STATUS_VARIANT: Record<string, "muted" | "success" | "orange"> = {
  PENDING: "orange",
  APPROVED: "success",
  REJECTED: "muted",
};

export default async function MembershipInboxPage() {
  await requireSection("submissions");
  const applications = await prisma.membershipApplication.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Demandes d'adhésion"
        description={`${applications.filter((a) => a.status === "PENDING").length} en attente sur ${applications.length}`}
      />

      <div className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-navy/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Statut</th>
              <th className="px-5 py-3 font-semibold">Candidat</th>
              <th className="px-5 py-3 font-semibold">Contact</th>
              <th className="px-5 py-3 font-semibold">Localisation</th>
              <th className="px-5 py-3 font-semibold">Motivation</th>
              <th className="px-5 py-3 font-semibold">Reçue</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5 text-sm">
            {applications.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-brand-navy/50">Aucune candidature.</td>
              </tr>
            )}
            {applications.map((a) => (
              <tr key={a.id} className="hover:bg-brand-surface/60">
                <td className="px-5 py-4">
                  <Badge variant={STATUS_VARIANT[a.status]}>{STATUS_LABELS[a.status]}</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="font-display font-semibold text-brand-navy">{a.fullName}</div>
                  <div className="text-xs text-brand-navy/50">{a.profession ?? "—"}</div>
                </td>
                <td className="px-5 py-4">
                  <a href={`mailto:${a.email}`} className="block text-brand-blue hover:underline">{a.email}</a>
                  <a href={`tel:${a.phone}`} className="block text-xs text-brand-navy/60 hover:text-brand-navy">{a.phone}</a>
                </td>
                <td className="px-5 py-4 text-brand-navy/70">{a.city}, {a.region}</td>
                <td className="px-5 py-4 max-w-sm text-brand-navy/60">
                  {a.motivation ? (
                    <details>
                      <summary className="line-clamp-2 cursor-pointer">{a.motivation}</summary>
                      <p className="mt-2 whitespace-pre-line">{a.motivation}</p>
                    </details>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-5 py-4 text-brand-navy/60">{formatDate(a.createdAt)}</td>
                <td className="px-5 py-4">
                  <MembershipRowActions id={a.id} status={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
