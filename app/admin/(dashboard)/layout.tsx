import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { hasAccess } from "@/lib/permissions";
import { Sidebar } from "@/components/admin/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }
  if (!hasAccess(session.user.role, "dashboard")) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-brand-surface">
      <Sidebar
        userName={session.user.name}
        userEmail={session.user.email}
        role={session.user.role}
      />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
