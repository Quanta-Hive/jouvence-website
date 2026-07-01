import { prisma } from "@/lib/db";
import { requireSection } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/page-header";
import { ContactRowActions } from "@/components/admin/contact-row-actions";
import { formatDate } from "@/lib/utils";

export default async function ContactInboxPage() {
  await requireSection("submissions");
  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ isRead: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Messages de contact"
        description={`${messages.filter((m) => !m.isRead).length} non lu(s) sur ${messages.length}`}
      />

      <div className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-navy/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Statut</th>
              <th className="px-5 py-3 font-semibold">Expéditeur</th>
              <th className="px-5 py-3 font-semibold">Sujet</th>
              <th className="px-5 py-3 font-semibold">Message</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5 text-sm">
            {messages.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-brand-navy/50">Boîte vide.</td>
              </tr>
            )}
            {messages.map((m) => (
              <tr key={m.id} className={`hover:bg-brand-surface/60 ${!m.isRead ? "bg-brand-blue/[0.02]" : ""}`}>
                <td className="px-5 py-4">
                  <Badge variant={m.isRead ? "muted" : "blue"}>{m.isRead ? "Lu" : "Nouveau"}</Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="font-display font-semibold text-brand-navy">{m.firstName} {m.lastName}</div>
                  <a href={`mailto:${m.email}`} className="text-xs text-brand-blue hover:underline">{m.email}</a>
                  {m.phone && <div className="text-xs text-brand-navy/50">{m.phone}</div>}
                </td>
                <td className="px-5 py-4 font-medium text-brand-navy">{m.subject}</td>
                <td className="px-5 py-4 max-w-md text-brand-navy/70">
                  <details>
                    <summary className="line-clamp-1 cursor-pointer">{m.message}</summary>
                    <p className="mt-2 whitespace-pre-line text-brand-navy/80">{m.message}</p>
                  </details>
                </td>
                <td className="px-5 py-4 text-brand-navy/60">{formatDate(m.createdAt)}</td>
                <td className="px-5 py-4">
                  <ContactRowActions id={m.id} isRead={m.isRead} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
