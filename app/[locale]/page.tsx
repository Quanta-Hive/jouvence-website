import { HomeView } from "@/components/site/home-view";
import { prisma } from "@/lib/db";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { getHomeContent } from "@/lib/site-settings";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 3600;

export default async function HomePage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);

  const [leader, content] = await Promise.all([
    prisma.partyMember.findFirst({
      where: { isLeader: true, isPublished: true },
      orderBy: { order: "asc" },
    }),
    getHomeContent(),
  ]);

  const leaderProp = leader
    ? {
        name: leader.name,
        photoUrl: leader.photoUrl,
        role: locale === "fr" ? leader.roleFr : leader.roleEn,
      }
    : null;

  return <HomeView locale={locale} dict={dict} leader={leaderProp} content={content} />;
}
