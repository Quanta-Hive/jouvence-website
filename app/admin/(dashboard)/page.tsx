import Link from "next/link";
import {
  Newspaper,
  Users,
  MessageSquareQuote,
  Inbox,
  Mail,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { requireSection } from "@/lib/auth";
import { hasAccess, type Section } from "@/lib/permissions";

export default async function AdminDashboardPage() {
  const session = await requireSection("dashboard");
  const role = session.user.role;

  const wantsContent = hasAccess(role, "blog");
  const wantsSubmissions = hasAccess(role, "submissions");
  const wantsContributions = hasAccess(role, "contributions");

  const [
    posts,
    publishedPosts,
    members,
    testimonials,
    contactsUnread,
    membershipPending,
    subscribers,
    contributionsThisYear,
    contributionsTotalAmount,
  ] = await Promise.all([
    wantsContent ? prisma.blogPost.count() : 0,
    wantsContent ? prisma.blogPost.count({ where: { status: "PUBLISHED" } }) : 0,
    wantsContent ? prisma.partyMember.count() : 0,
    wantsContent ? prisma.testimonial.count() : 0,
    wantsSubmissions
      ? prisma.contactMessage.count({ where: { isRead: false } })
      : 0,
    wantsSubmissions
      ? prisma.membershipApplication.count({ where: { status: "PENDING" } })
      : 0,
    wantsSubmissions ? prisma.newsletterSubscriber.count() : 0,
    wantsContributions
      ? prisma.contribution.count({
          where: {
            date: {
              gte: new Date(Date.UTC(new Date().getFullYear(), 0, 1)),
            },
          },
        })
      : 0,
    wantsContributions
      ? prisma.contribution.aggregate({
          where: {
            date: {
              gte: new Date(Date.UTC(new Date().getFullYear(), 0, 1)),
            },
            type: { not: "DON_EN_NATURE" },
          },
          _sum: { amount: true },
        })
      : null,
  ]);

  type Card = {
    label: string;
    value: string | number;
    icon: typeof Newspaper;
    color: string;
    iconColor: string;
    href: string;
    section: Section;
  };

  const cards: Card[] = [
    {
      label: "Articles publiés",
      value: `${publishedPosts}/${posts}`,
      icon: Newspaper,
      color: "from-brand-blue/10 to-brand-blue/5",
      iconColor: "#1d9bf0",
      href: "/admin/blog",
      section: "blog",
    },
    {
      label: "Membres du parti",
      value: members,
      icon: Users,
      color: "from-brand-orange/10 to-brand-orange/5",
      iconColor: "#ff700c",
      href: "/admin/members",
      section: "members",
    },
    {
      label: "Témoignages",
      value: testimonials,
      icon: MessageSquareQuote,
      color: "from-brand-yellow/15 to-brand-yellow/5",
      iconColor: "#caa206",
      href: "/admin/testimonials",
      section: "testimonials",
    },
    {
      label: "Messages non lus",
      value: contactsUnread,
      icon: Mail,
      color: "from-brand-blue/10 to-brand-blue/5",
      iconColor: "#1d9bf0",
      href: "/admin/submissions/contact",
      section: "submissions",
    },
    {
      label: "Adhésions en attente",
      value: membershipPending,
      icon: Inbox,
      color: "from-brand-orange/10 to-brand-orange/5",
      iconColor: "#ff700c",
      href: "/admin/submissions/membership",
      section: "submissions",
    },
    {
      label: "Abonnés newsletter",
      value: subscribers,
      icon: TrendingUp,
      color: "from-emerald-100 to-emerald-50",
      iconColor: "#10b981",
      href: "/admin/submissions/newsletter",
      section: "submissions",
    },
    {
      label: `Contributions ${new Date().getFullYear()}`,
      value: contributionsThisYear,
      icon: Wallet,
      color: "from-emerald-100 to-emerald-50",
      iconColor: "#10b981",
      href: "/admin/contributions",
      section: "contributions",
    },
    {
      label: "Total collecté (année)",
      value: new Intl.NumberFormat("fr-FR").format(
        contributionsTotalAmount?._sum.amount ?? 0,
      ) + " FCFA",
      icon: Wallet,
      color: "from-brand-blue/10 to-brand-blue/5",
      iconColor: "#1d9bf0",
      href: "/admin/contributions",
      section: "contributions",
    },
  ];

  const visible = cards.filter((c) => hasAccess(role, c.section));

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="font-display text-3xl font-extrabold text-brand-navy">Bienvenue</h1>
        <p className="text-brand-navy/60">Vue d&apos;ensemble de l&apos;activité du site.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group rounded-2xl border border-brand-navy/5 bg-gradient-to-br ${card.color} p-6 transition-all hover:-translate-y-0.5 hover:shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-brand-navy/60">{card.label}</div>
                <div className="mt-2 font-display text-3xl font-extrabold text-brand-navy">{card.value}</div>
              </div>
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm"
                style={{ color: card.iconColor }}
              >
                <card.icon size={22} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
