import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Parti Jouvence — Jeunesse Camerounaise en Politique",
    template: "%s | Parti Jouvence",
  },
  description:
    "Parti Jouvence — JCP. Pour un Cameroun uni, discipliné et prospère. Émergence effective en 2035.",
  icons: {
    icon: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "Parti Jouvence",
    images: ["/brand/logo-text.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1b2a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-white text-brand-navy antialiased">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
