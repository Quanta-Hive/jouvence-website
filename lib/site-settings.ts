import "server-only";
import { prisma } from "@/lib/db";
import {
  homeContentSchema,
  siteInfoSchema,
  type HomeContent,
  type SiteInfo,
} from "@/lib/validations/site-settings";

export const HOME_CONTENT_KEY = "home:content";
export const SITE_INFO_KEY = "site:info";

export const defaultHomeContent: HomeContent = {
  membersBadge: "15K+",
  stats: [
    {
      value: "21M",
      labelFr: "Jeunes -35 ans",
      labelEn: "Youth under 35",
      descFr: "75% de la population camerounaise",
      descEn: "75% of Cameroon's population",
    },
    {
      value: "29.9M",
      labelFr: "Population Totale",
      labelEn: "Total population",
      descFr: "Habitants au Cameroun",
      descEn: "Inhabitants of Cameroon",
    },
    {
      value: "2019",
      labelFr: "Parti Légal",
      labelEn: "Legal party",
      descFr: "Depuis le 22 Avril 2019",
      descEn: "Since April 22, 2019",
    },
    {
      value: "2035",
      labelFr: "Objectif Émergence",
      labelEn: "Emergence target",
      descFr: "Vision nationale",
      descEn: "National vision",
    },
  ],
  figures: [
    {
      value: "29.89M",
      labelFr: "Population",
      labelEn: "Population",
      sublabelFr: "Habitants",
      sublabelEn: "Inhabitants",
    },
    {
      value: "75%",
      labelFr: "Jeunes -35 ans",
      labelEn: "Youth under 35",
      sublabelFr: "21 millions de jeunes",
      sublabelEn: "21 million young people",
    },
    {
      value: "51.35Mds$",
      labelFr: "PIB 2025",
      labelEn: "2025 GDP",
      sublabelFr: "Produit Intérieur Brut",
      sublabelEn: "Gross domestic product",
    },
    {
      value: "6.44%",
      labelFr: "Chômage jeunes",
      labelEn: "Youth unemployment",
      sublabelFr: "Taux officiel",
      sublabelEn: "Official rate",
    },
    {
      value: "151/193",
      labelFr: "Classement IDH",
      labelEn: "HDI ranking",
      sublabelFr: "Indice Développement Humain",
      sublabelEn: "Human Development Index",
    },
    {
      value: "68%",
      labelFr: "Population rurale",
      labelEn: "Rural population",
      sublabelFr: "Zones rurales",
      sublabelEn: "Rural areas",
    },
    {
      value: "4-5M",
      labelFr: "Diaspora",
      labelEn: "Diaspora",
      sublabelFr: "Camerounais à l'étranger",
      sublabelEn: "Cameroonians abroad",
    },
    {
      value: "577Mds",
      labelFr: "Transferts diaspora",
      labelEn: "Diaspora transfers",
      sublabelFr: "FCFA par an",
      sublabelEn: "FCFA per year",
    },
  ],
};

export async function getHomeContent(): Promise<HomeContent> {
  const row = await prisma.siteSetting.findUnique({ where: { key: HOME_CONTENT_KEY } });
  if (!row) return defaultHomeContent;
  const parsed = homeContentSchema.safeParse(row.value);
  return parsed.success ? parsed.data : defaultHomeContent;
}

export async function saveHomeContent(input: HomeContent): Promise<void> {
  const parsed = homeContentSchema.parse(input);
  await prisma.siteSetting.upsert({
    where: { key: HOME_CONTENT_KEY },
    create: { key: HOME_CONTENT_KEY, value: parsed },
    update: { value: parsed },
  });
}

export const defaultSiteInfo: SiteInfo = {
  email: "jcp.jouvence237@gmail.com",
  phones: ["+237 670572377", "+49 1575424235"],
  address: {
    line1: "Obili",
    cityFr: "Yaoundé, Cameroun",
    cityEn: "Yaoundé, Cameroon",
  },
  socials: {
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    linkedinUrl: "",
    tiktokUrl: "",
  },
  hours: [
    { dayFr: "Lundi - Vendredi", dayEn: "Monday - Friday", valueFr: "8h00 - 17h00", valueEn: "8:00 AM - 5:00 PM" },
    { dayFr: "Samedi", dayEn: "Saturday", valueFr: "9h00 - 14h00", valueEn: "9:00 AM - 2:00 PM" },
    { dayFr: "Dimanche", dayEn: "Sunday", valueFr: "Fermé", valueEn: "Closed" },
  ],
};

export async function getSiteInfo(): Promise<SiteInfo> {
  const row = await prisma.siteSetting.findUnique({ where: { key: SITE_INFO_KEY } });
  if (!row) return defaultSiteInfo;
  const parsed = siteInfoSchema.safeParse(row.value);
  return parsed.success ? parsed.data : defaultSiteInfo;
}

export async function saveSiteInfo(input: SiteInfo): Promise<void> {
  const parsed = siteInfoSchema.parse(input);
  await prisma.siteSetting.upsert({
    where: { key: SITE_INFO_KEY },
    create: { key: SITE_INFO_KEY, value: parsed },
    update: { value: parsed },
  });
}
