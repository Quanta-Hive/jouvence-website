import { prisma } from "@/lib/db";
import { requireSection } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/page-header";
import { SubscriberRowActions } from "@/components/admin/subscriber-row-actions";
import { formatDate } from "@/lib/utils";

export default async function NewsletterPage() {
  await requireSection("submissions");
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Abonnés newsletter"
        description={`${subscribers.length} abonné(s) au total.`}
      />

      <div className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-navy/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Email</th>
              <th className="px-5 py-3 font-semibold">Langue</th>
              <th className="px-5 py-3 font-semibold">Inscrit le</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5 text-sm">
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-brand-navy/50">Aucun abonné.</td>
              </tr>
            )}
            {subscribers.map((s) => (
              <tr key={s.id} className="hover:bg-brand-surface/60">
                <td className="px-5 py-4">
                  <a href={`mailto:${s.email}`} className="text-brand-blue hover:underline">{s.email}</a>
                </td>
                <td className="px-5 py-4">
                  <Badge variant="outline">{s.locale.toUpperCase()}</Badge>
                </td>
                <td className="px-5 py-4 text-brand-navy/60">{formatDate(s.createdAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <SubscriberRowActions id={s.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
