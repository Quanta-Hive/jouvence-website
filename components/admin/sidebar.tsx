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
  Wallet,
  ShieldCheck,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import type { UserRole } from "@prisma/client";
import { cn } from "@/lib/utils";
import { ROLE_ACCESS, ROLE_LABELS, type Section } from "@/lib/permissions";

type NavLink = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  section: Section;
  exact?: boolean;
};

const LINKS: NavLink[] = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard, section: "dashboard", exact: true },
  { href: "/admin/home", label: "Page d'accueil", icon: Home, section: "home" },
  { href: "/admin/blog", label: "Articles", icon: Newspaper, section: "blog" },
  { href: "/admin/members", label: "Membres", icon: Users, section: "members" },
  { href: "/admin/contributions", label: "Contributions", icon: Wallet, section: "contributions" },
  { href: "/admin/testimonials", label: "Témoignages", icon: MessageSquareQuote, section: "testimonials" },
  { href: "/admin/submissions/contact", label: "Messages", icon: Mail, section: "submissions" },
  { href: "/admin/submissions/membership", label: "Adhésions", icon: Inbox, section: "submissions" },
  { href: "/admin/submissions/newsletter", label: "Newsletter", icon: Mail, section: "submissions" },
  { href: "/admin/site-info", label: "Coordonnées", icon: Building2, section: "siteInfo" },
  { href: "/admin/users", label: "Utilisateurs", icon: ShieldCheck, section: "users" },
  { href: "/admin/settings", label: "Paramètres", icon: Settings, section: "settings" },
];

type Props = {
  userName?: string | null;
  userEmail?: string | null;
  role: UserRole;
};

export function Sidebar({ userName, userEmail, role }: Props) {
  const pathname = usePathname();
  const visibleLinks = LINKS.filter((link) => ROLE_ACCESS[link.section].includes(role));
  const isActive = (link: NavLink) =>
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
        {visibleLinks.map((link) => {
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
          <div className="mt-1 inline-flex items-center rounded-full bg-brand-blue/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-blue">
            {ROLE_LABELS[role]}
          </div>
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
