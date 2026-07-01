import { ContributionForm } from "@/components/admin/contribution-form";
import { PageHeader } from "@/components/admin/page-header";
import { requireSection } from "@/lib/auth";

export default async function NewContributionPage() {
  await requireSection("contributions");
  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Nouvelle contribution"
        description="Enregistrez une cotisation, un don financier ou un don en nature."
        backHref="/admin/contributions"
        backLabel="Toutes les contributions"
      />
      <ContributionForm />
    </div>
  );
}
