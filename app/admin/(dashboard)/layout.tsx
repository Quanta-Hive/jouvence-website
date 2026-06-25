import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
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

  return (
    <div className="flex min-h-screen bg-brand-surface">
      <Sidebar userName={session.user.name} userEmail={session.user.email} />
      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
