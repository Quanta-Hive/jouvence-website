import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireSection } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/admin/page-header";
import { DeleteContributionButton } from "@/components/admin/delete-contribution-button";
import {
  CONTRIBUTION_TYPE_LABELS,
  CONTRIBUTOR_KIND_LABELS,
  PAYMENT_MODE_LABELS,
  REGION_LABELS,
  formatFcfa,
} from "@/lib/contributions";

type SearchParams = {
  year?: string;
  type?: string;
  mode?: string;
  kind?: string;
  region?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

const DATE_FORMATTER = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

function buildWhere(sp: SearchParams): Prisma.ContributionWhereInput {
  const where: Prisma.ContributionWhereInput = {};
  if (sp.year && /^\d{4}$/.test(sp.year)) {
    const y = Number(sp.year);
    where.date = {
      gte: new Date(Date.UTC(y, 0, 1)),
      lt: new Date(Date.UTC(y + 1, 0, 1)),
    };
  }
  if (sp.type && sp.type in CONTRIBUTION_TYPE_LABELS) {
    where.type = sp.type as keyof typeof CONTRIBUTION_TYPE_LABELS;
  }
  if (sp.mode && sp.mode in PAYMENT_MODE_LABELS) {
    where.paymentMode = sp.mode as keyof typeof PAYMENT_MODE_LABELS;
  }
  if (sp.kind && sp.kind in CONTRIBUTOR_KIND_LABELS) {
    where.contributorKind = sp.kind as keyof typeof CONTRIBUTOR_KIND_LABELS;
  }
  if (sp.region && sp.region in REGION_LABELS) {
    where.region = sp.region as keyof typeof REGION_LABELS;
  }
  return where;
}

export default async function ContributionsListPage({ searchParams }: Props) {
  await requireSection("contributions");
  const sp = await searchParams;
  const where = buildWhere(sp);

  const [contributions, availableYearsRaw] = await Promise.all([
    prisma.contribution.findMany({
      where,
      orderBy: { date: "desc" },
      take: 200,
    }),
    prisma.$queryRaw<{ year: number }[]>`
      SELECT DISTINCT EXTRACT(YEAR FROM "date")::int AS year
      FROM "Contribution"
      ORDER BY year DESC
    `,
  ]);

  const availableYears = availableYearsRaw.map((r) => r.year);
  const totalCash = contributions
    .filter((c) => c.type !== "DON_EN_NATURE")
    .reduce((sum, c) => sum + c.amount, 0);
  const totalInKind = contributions.reduce(
    (sum, c) => sum + (c.estimatedValue ?? 0),
    0,
  );

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Contributions"
        description="Enregistrement et suivi des cotisations et dons."
        actions={
          <Button asChild>
            <Link href="/admin/contributions/new">
              <Plus size={16} />
              Nouvelle contribution
            </Link>
          </Button>
        }
      />

      <form
        method="get"
        className="mb-6 flex flex-wrap items-end gap-3 rounded-2xl border border-brand-navy/5 bg-white p-4 shadow-sm"
      >
        <FilterSelect name="year" label="Année" value={sp.year}>
          <option value="">Toutes</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect name="type" label="Type" value={sp.type}>
          <option value="">Tous</option>
          {Object.entries(CONTRIBUTION_TYPE_LABELS).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect name="mode" label="Mode" value={sp.mode}>
          <option value="">Tous</option>
          {Object.entries(PAYMENT_MODE_LABELS).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect name="kind" label="Contributeur" value={sp.kind}>
          <option value="">Tous</option>
          {Object.entries(CONTRIBUTOR_KIND_LABELS).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect name="region" label="Région" value={sp.region}>
          <option value="">Toutes</option>
          {Object.entries(REGION_LABELS).map(([k, l]) => (
            <option key={k} value={k}>
              {l}
            </option>
          ))}
        </FilterSelect>
        <div className="flex gap-2">
          <Button type="submit" variant="outline" size="sm">
            Filtrer
          </Button>
          <Button type="button" variant="ghost" size="sm" asChild>
            <Link href="/admin/contributions">Réinitialiser</Link>
          </Button>
        </div>
      </form>

      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <StatCard label="Contributions affichées" value={String(contributions.length)} />
        <StatCard label="Total monétaire" value={formatFcfa(totalCash)} />
        <StatCard label="Dons en nature (valeur estimée)" value={formatFcfa(totalInKind)} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-navy/5 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-brand-surface text-left text-xs uppercase tracking-wide text-brand-navy/50">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Contributeur</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 text-right font-semibold">Montant</th>
              <th className="px-4 py-3 font-semibold">Mode</th>
              <th className="px-4 py-3 font-semibold">Région</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-navy/5">
            {contributions.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-brand-navy/50">
                  Aucune contribution.
                </td>
              </tr>
            )}
            {contributions.map((c) => {
              const isInKind = c.type === "DON_EN_NATURE";
              const value = isInKind ? c.estimatedValue ?? 0 : c.amount;
              return (
                <tr key={c.id} className="hover:bg-brand-surface/60">
                  <td className="px-4 py-3 whitespace-nowrap text-brand-navy/80">
                    {DATE_FORMATTER.format(c.date)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-display font-semibold text-brand-navy">
                      {c.contributorName}
                    </div>
                    <div className="text-xs text-brand-navy/50">
                      {CONTRIBUTOR_KIND_LABELS[c.contributorKind]}
                      {c.matricule ? ` · ${c.matricule}` : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={isInKind ? "muted" : "success"}>
                      {CONTRIBUTION_TYPE_LABELS[c.type]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums text-brand-navy">
                    {formatFcfa(value)}
                    {isInKind && (
                      <div className="text-[10px] uppercase tracking-wide text-brand-navy/40">
                        estimé
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-brand-navy/70">
                    {PAYMENT_MODE_LABELS[c.paymentMode]}
                  </td>
                  <td className="px-4 py-3 text-brand-navy/70">
                    {c.region ? REGION_LABELS[c.region] : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/contributions/${c.id}`}
                        className="rounded-lg p-2 text-brand-navy/60 transition-colors hover:bg-brand-blue/10 hover:text-brand-blue"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteContributionButton id={c.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {contributions.length === 200 && (
        <p className="mt-4 text-xs text-brand-navy/50">
          Affichage des 200 dernières contributions. Affinez les filtres pour voir d&apos;autres
          enregistrements.
        </p>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-brand-navy/5 bg-white p-5 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-brand-navy/50">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold text-brand-navy">{value}</div>
    </div>
  );
}

function FilterSelect({
  name,
  label,
  value,
  children,
}: {
  name: string;
  label: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs">
      <span className="font-medium text-brand-navy/60">{label}</span>
      <select
        name={name}
        defaultValue={value ?? ""}
        className="h-9 rounded-lg border border-brand-navy/10 bg-brand-surface px-2 text-sm text-brand-navy focus:border-brand-blue focus:bg-white focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}
