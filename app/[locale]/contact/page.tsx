import { ContactView } from "@/components/site/contact-view";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { getSiteInfo } from "@/lib/site-settings";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);
  const siteInfo = await getSiteInfo();
  return <ContactView locale={locale} dict={dict} siteInfo={siteInfo} />;
}
