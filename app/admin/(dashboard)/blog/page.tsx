import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/admin/page-header";
import { Button } from "@/components/ui/button";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { formatDate } from "@/lib/utils";

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
    include: { author: { select: { name: true } } },
  });

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Articles"
        description="Gérez les articles du blog en français et en anglais."
        actions={
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus size={16} />
              Nouvel article
            </Link>
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-navy/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Titre</th>
              <th className="px-5 py-3 font-semibold">Catégorie</th>
              <th className="px-5 py-3 font-semibold">Statut</th>
              <th className="px-5 py-3 font-semibold">Auteur</th>
              <th className="px-5 py-3 font-semibold">Mis à jour</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5 text-sm">
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-brand-navy/50">
                  Aucun article. Créez le premier.
                </td>
              </tr>
            )}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-brand-surface/60">
                <td className="px-5 py-4">
                  <div className="font-display font-semibold text-brand-navy">{post.titleFr}</div>
                  <div className="text-xs text-brand-navy/50">/{post.slugFr}</div>
                </td>
                <td className="px-5 py-4 text-brand-navy/70">{post.category}</td>
                <td className="px-5 py-4">
                  <Badge variant={post.status === "PUBLISHED" ? "success" : "muted"}>
                    {post.status === "PUBLISHED" ? "Publié" : "Brouillon"}
                  </Badge>
                </td>
                <td className="px-5 py-4 text-brand-navy/70">{post.author.name}</td>
                <td className="px-5 py-4 text-brand-navy/60">{formatDate(post.updatedAt)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
                      aria-label="Éditer"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeletePostButton id={post.id} />
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
