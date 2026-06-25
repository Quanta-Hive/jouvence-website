import { GetInvolvedView } from "@/components/site/get-involved-view";
import { getDictionary, resolveLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function GetInvolvedPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);
  return <GetInvolvedView locale={locale} dict={dict} />;
}
