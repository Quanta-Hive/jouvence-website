import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Star } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { DeleteMemberButton } from "@/components/admin/delete-member-button";

export default async function MembersListPage() {
  const members = await prisma.partyMember.findMany({
    orderBy: [{ isLeader: "desc" }, { order: "asc" }],
  });

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Membres du parti"
        description="Ajoutez et organisez les membres affichés sur la page À Propos."
        actions={
          <Button asChild>
            <Link href="/admin/members/new">
              <Plus size={16} />
              Nouveau membre
            </Link>
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-navy/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Membre</th>
              <th className="px-5 py-3 font-semibold">Fonction</th>
              <th className="px-5 py-3 font-semibold">Ordre</th>
              <th className="px-5 py-3 font-semibold">Statut</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5 text-sm">
            {members.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-brand-navy/50">Aucun membre.</td>
              </tr>
            )}
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-brand-surface/60">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-brand-surface">
                      {m.photoUrl ? (
                        <Image src={m.photoUrl} alt="" width={40} height={40} className="h-10 w-10 object-cover" />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center font-display text-sm font-bold text-brand-navy/30">
                          {m.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-display font-semibold text-brand-navy">{m.name}</div>
                      {m.isLeader && (
                        <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-brand-blue">
                          <Star size={12} fill="currentColor" />
                          Leader
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-brand-navy/70">{m.roleFr}</td>
                <td className="px-5 py-4 text-brand-navy/70">{m.order}</td>
                <td className="px-5 py-4">
                  <Badge variant={m.isPublished ? "success" : "muted"}>
                    {m.isPublished ? "Publié" : "Masqué"}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/members/${m.id}`}
                      className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteMemberButton id={m.id} />
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
