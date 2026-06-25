import { auth } from "@/lib/auth";
import { AdminSessionProvider } from "@/components/admin/session-provider";

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <AdminSessionProvider session={session}>
      {children}
    </AdminSessionProvider>
  );
}
