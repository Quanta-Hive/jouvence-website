import { requireSection } from "@/lib/auth";
import { PageHeader } from "@/components/admin/page-header";
import { UserForm } from "@/components/admin/user-form";

export default async function NewUserPage() {
  await requireSection("users");
  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Nouvel utilisateur"
        description="Créez un compte administrateur avec un rôle."
        backHref="/admin/users"
        backLabel="Tous les utilisateurs"
      />
      <UserForm />
    </div>
  );
}
