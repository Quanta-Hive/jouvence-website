import { notFound } from "next/navigation";
import { ContributionForm } from "@/components/admin/contribution-form";
import { PageHeader } from "@/components/admin/page-header";
import { prisma } from "@/lib/db";
import { requireSection } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditContributionPage({ params }: Props) {
  await requireSection("contributions");
  const { id } = await params;
  const contribution = await prisma.contribution.findUnique({ where: { id } });
  if (!contribution) notFound();

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Éditer la contribution"
        description={contribution.contributorName}
        backHref="/admin/contributions"
        backLabel="Toutes les contributions"
      />
      <ContributionForm
        contributionId={contribution.id}
        initial={{
          date: contribution.date,
          contributorKind: contribution.contributorKind,
          matricule: contribution.matricule,
          contributorName: contribution.contributorName,
          type: contribution.type,
          amount: contribution.amount,
          estimatedValue: contribution.estimatedValue,
          description: contribution.description,
          paymentMode: contribution.paymentMode,
          collectedBy: contribution.collectedBy,
          receiptNumber: contribution.receiptNumber,
          region: contribution.region,
          comments: contribution.comments,
        }}
      />
    </div>
  );
}
