import { ProgramView } from "@/components/site/program-view";
import { getProgram } from "@/lib/program-data";
import { getDictionary, resolveLocale } from "@/lib/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ProgramPage({ params }: Props) {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);
  const chantiers = getProgram(locale);
  return <ProgramView locale={locale} dict={dict} chantiers={chantiers} />;
}
