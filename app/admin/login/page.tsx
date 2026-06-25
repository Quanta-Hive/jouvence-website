import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-navy via-brand-navy-soft to-brand-navy px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Image
            src="/brand/logo-white.png"
            alt="Parti Jouvence"
            width={88}
            height={88}
            className="mx-auto mb-4 h-20 w-auto"
          />
          <h1 className="font-display text-2xl font-extrabold text-white">Administration</h1>
          <p className="mt-2 text-sm text-white/60">Parti Jouvence — Espace de gestion</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
