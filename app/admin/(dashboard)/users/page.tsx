import Link from "next/link";
import { Plus, Pencil, ShieldCheck } from "lucide-react";
import { requireSection } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { DeleteUserButton } from "@/components/admin/delete-user-button";
import { ROLE_LABELS } from "@/lib/permissions";

const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default async function UsersListPage() {
  const session = await requireSection("users");
  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Utilisateurs"
        description="Gérez les comptes administrateurs et leurs rôles."
        actions={
          <Button asChild>
            <Link href="/admin/users/new">
              <Plus size={16} />
              Nouvel utilisateur
            </Link>
          </Button>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-navy/50">
            <tr>
              <th className="px-5 py-3 font-semibold">Utilisateur</th>
              <th className="px-5 py-3 font-semibold">Rôle</th>
              <th className="px-5 py-3 font-semibold">Créé le</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5">
            {users.map((u) => {
              const isSelf = u.id === session.user.id;
              return (
                <tr key={u.id} className="hover:bg-brand-surface/60">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-brand-navy">
                          {u.name}
                          {isSelf && (
                            <span className="ml-2 text-xs font-normal text-brand-blue">
                              (vous)
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-brand-navy/50">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={u.role === "ADMIN" ? "success" : "muted"}>
                      {ROLE_LABELS[u.role]}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-brand-navy/70">
                    {DATE_FORMATTER.format(u.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteUserButton id={u.id} disabled={isSelf} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
