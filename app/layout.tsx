import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ochir — Хүргэлт, вэб сайт, AI автоматжуулалт",
    template: "%s | Ochir",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ["хүргэлт", "онлайн дэлгүүр", "вэб сайт", "чатбот", "Улаанбаатар", "QPay", "автоматжуулалт"],
  openGraph: {
    type: "website",
    locale: "mn_MN",
    siteName: SITE_NAME,
    url: "/",
    title: "Ochir — Онлайн бизнесийн бүх хэрэгцээ нэг дор",
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/brand/apple-touch-icon-180.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#fffffe",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={inter.variable}>
      <body className="min-h-dvh font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Үндсэн агуулга руу шилжих
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
