import { MemberForm } from "@/components/admin/member-form";
import { PageHeader } from "@/components/admin/page-header";

export default function NewMemberPage() {
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
