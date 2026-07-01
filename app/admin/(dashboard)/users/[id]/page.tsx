import { notFound } from "next/navigation";
import { requireSection } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/page-header";
import { UserForm } from "@/components/admin/user-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditUserPage({ params }: Props) {
  const session = await requireSection("users");
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) notFound();

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Éditer l'utilisateur"
        description={user.email}
        backHref="/admin/users"
        backLabel="Tous les utilisateurs"
      />
      <UserForm
        userId={user.id}
        isSelf={session.user.id === user.id}
        initial={{
          name: user.name,
          email: user.email,
          role: user.role,
        }}
      />
    </div>
  );
}
