import { requireSection } from "@/lib/auth";
import { PageHeader } from "@/components/admin/page-header";
import { HomeContentForm } from "@/components/admin/home-content-form";
import { getHomeContent } from "@/lib/site-settings";

export default async function HomeContentPage() {
  await requireSection("home");
  const content = await getHomeContent();

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Page d'accueil"
        description="Modifiez le badge membres, les statistiques et les chiffres clés affichés sur la page d'accueil."
      />
      <HomeContentForm initial={content} />
    </div>
  );
}
