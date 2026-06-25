"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  MessageSquareQuote,
  Inbox,
  Mail,
  Settings,
  LogOut,
  Home,
  Building2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, exact: true },
  { href: "/admin/home", label: "Page d'accueil", icon: Home },
  { href: "/admin/blog", label: "Articles", icon: Newspaper },
  { href: "/admin/members", label: "Membres", icon: Users },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquareQuote },
  { href: "/admin/submissions/contact", label: "Messages", icon: Mail },
  { href: "/admin/submissions/membership", label: "Adhésions", icon: Inbox },
  { href: "/admin/submissions/newsletter", label: "Newsletter", icon: Mail },
  { href: "/admin/site-info", label: "Coordonnées", icon: Building2 },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
];

type Props = {
  userName?: string | null;
  userEmail?: string | null;
};

export function Sidebar({ userName, userEmail }: Props) {
  const pathname = usePathname();
  const isActive = (link: (typeof links)[number]) =>
    link.exact ? pathname === link.href : pathname.startsWith(link.href);

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-brand-navy/5 bg-white">
      <div className="flex items-center gap-3 border-b border-brand-navy/5 px-5 py-5">
        <Image src="/brand/logo.png" alt="" width={36} height={36} className="h-9 w-auto" />
        <div>
          <div className="font-display text-sm font-bold text-brand-navy">Jouvence Admin</div>
          <div className="text-xs text-brand-navy/50">Espace de gestion</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-brand-navy/70 hover:bg-brand-navy/5 hover:text-brand-navy",
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-brand-navy/5 px-3 py-4">
        <div className="mb-3 px-3 text-xs">
          <div className="font-display font-semibold text-brand-navy">{userName ?? "—"}</div>
          <div className="truncate text-brand-navy/50">{userEmail}</div>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={18} />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
