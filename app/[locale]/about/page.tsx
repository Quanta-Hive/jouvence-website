import { AboutView } from "@/components/site/about-view";
import { prisma } from "@/lib/db";
import { getDictionary, resolveLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);

  const members = await prisma.partyMember.findMany({
    where: { isPublished: true, isLeader: false },
    orderBy: { order: "asc" },
  });

  const team = members.map((m) => ({
    id: m.id,
    name: m.name,
    photoUrl: m.photoUrl,
    role: locale === "fr" ? m.roleFr : m.roleEn,
  }));

  return <AboutView locale={locale} dict={dict} team={team} />;
}
