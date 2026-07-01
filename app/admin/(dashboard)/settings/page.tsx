import { requireSection } from "@/lib/auth";
import { PageHeader } from "@/components/admin/page-header";
import { ProfileForm, PasswordForm } from "@/components/admin/settings-forms";

export default async function SettingsPage() {
  const session = await requireSection("settings");
  if (!session?.user?.email) return null;

  return (
    <div className="px-8 py-10">
      <PageHeader title="Paramètres" description="Gérez votre profil administrateur." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProfileForm defaultName={session.user.name ?? ""} defaultEmail={session.user.email} />
        <PasswordForm />
      </div>
    </div>
  );
}
