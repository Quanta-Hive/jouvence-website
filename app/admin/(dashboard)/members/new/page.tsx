import { MemberForm } from "@/components/admin/member-form";
import { PageHeader } from "@/components/admin/page-header";
import { requireSection } from "@/lib/auth";

export default async function NewMemberPage() {
  await requireSection("members");
  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Nouveau membre"
        description="Ajoutez un membre de l'équipe dirigeante."
        backHref="/admin/members"
        backLabel="Tous les membres"
      />
      <MemberForm />
    </div>
  );
}
