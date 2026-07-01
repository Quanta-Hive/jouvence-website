import { requireSection } from "@/lib/auth";
import { PageHeader } from "@/components/admin/page-header";
import { SiteInfoForm } from "@/components/admin/site-info-form";
import { getSiteInfo } from "@/lib/site-settings";

export default async function SiteInfoPage() {
  await requireSection("siteInfo");
  const siteInfo = await getSiteInfo();

  return (
    <div className="px-8 py-10">
      <PageHeader
        title="Coordonnées du site"
        description="Adresse, téléphones, email, réseaux sociaux et horaires affichés dans le pied de page et la page contact."
      />
      <SiteInfoForm initial={siteInfo} />
    </div>
  );
}
