import Link from "next/link";
import {
  Newspaper,
  Users,
  MessageSquareQuote,
  Inbox,
  Mail,
  TrendingUp,
} from "lucide-react";
import { prisma } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [
    posts,
    publishedPosts,
    members,
    testimonials,
    contactsUnread,
    membershipPending,
    subscribers,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.partyMember.count(),
    prisma.testimonial.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.membershipApplication.count({ where: { status: "PENDING" } }),
    prisma.newsletterSubscriber.count(),
  ]);

  const cards = [
    {
      label: "Articles publiés",
      value: `${publishedPosts}/${posts}`,
      icon: Newspaper,
      color: "from-brand-blue/10 to-brand-blue/5",
      iconColor: "#1d9bf0",
      href: "/admin/blog",
    },
    {
      label: "Membres du parti",
      value: members,
      icon: Users,
      color: "from-brand-orange/10 to-brand-orange/5",
      iconColor: "#ff700c",
      href: "/admin/members",
    },
    {
      label: "Témoignages",
      value: testimonials,
      icon: MessageSquareQuote,
      color: "from-brand-yellow/15 to-brand-yellow/5",
      iconColor: "#caa206",
      href: "/admin/testimonials",
    },
    {
      label: "Messages non lus",
      value: contactsUnread,
      icon: Mail,
      color: "from-brand-blue/10 to-brand-blue/5",
      iconColor: "#1d9bf0",
      href: "/admin/submissions/contact",
    },
    {
      label: "Adhésions en attente",
      value: membershipPending,
      icon: Inbox,
      color: "from-brand-orange/10 to-brand-orange/5",
      iconColor: "#ff700c",
      href: "/admin/submissions/membership",
    },
    {
      label: "Abonnés newsletter",
      value: subscribers,
      icon: TrendingUp,
      color: "from-emerald-100 to-emerald-50",
      iconColor: "#10b981",
      href: "/admin/submissions/newsletter",
    },
  ];

  return (
    <div className="px-8 py-10">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="font-display text-3xl font-extrabold text-brand-navy">Bienvenue</h1>
        <p className="text-brand-navy/60">Vue d&apos;ensemble de l&apos;activité du site.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
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
