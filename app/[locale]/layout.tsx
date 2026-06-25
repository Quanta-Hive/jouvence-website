import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { getSiteInfo } from "@/lib/site-settings";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function SiteLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const siteInfo = await getSiteInfo();

  return (
    <div className="flex min-h-screen flex-col font-body">
      <div className="hidden bg-brand-navy text-xs text-white/80 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          <span>{dict.common.siteTagline}</span>
          <span>{dict.common.siteName} — JCP</span>
        </div>
      </div>
      <Navbar locale={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} dict={dict} siteInfo={siteInfo} />
    </div>
  );
}
