import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { DeleteTestimonialButton } from "@/components/admin/delete-testimonial-button";

export default async function TestimonialsListPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Témoignages"
        description="Collectez et publiez des témoignages de sympathisants."
        actions={
          <Button asChild>
            <Link href="/admin/testimonials/new">
              <Plus size={16} />
              Nouveau témoignage
            </Link>
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-navy/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Nom</th>
              <th className="px-5 py-3 font-semibold">Description</th>
              <th className="px-5 py-3 font-semibold">Citation</th>
              <th className="px-5 py-3 font-semibold">Statut</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5 text-sm">
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-brand-navy/50">Aucun témoignage.</td>
              </tr>
            )}
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-brand-surface/60">
                <td className="px-5 py-4 font-display font-semibold text-brand-navy">{item.name}</td>
                <td className="px-5 py-4 text-brand-navy/70">{item.roleFr}</td>
                <td className="px-5 py-4 max-w-md truncate text-brand-navy/60">{item.quoteFr}</td>
                <td className="px-5 py-4">
                  <Badge variant={item.isPublished ? "success" : "muted"}>
                    {item.isPublished ? "Publié" : "Masqué"}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/testimonials/${item.id}`}
                      className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteTestimonialButton id={item.id} />
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
