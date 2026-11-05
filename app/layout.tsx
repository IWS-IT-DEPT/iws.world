import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/lib/data";
import { organizationJsonLd } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `International Warehouse & Shipping (IWS) | Industrial Warehousing Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "International Warehouse & Shipping (IWS) provides industrial and manufacturing warehousing services, Foreign Trade Zone storage, and port logistics from facilities in Mobile, AL, Pensacola, FL, and Houston, TX.",
  keywords: [
    "international warehouse",
    "International Warehouse & Shipping",
    "warehousing services",
    "manufacturing warehousing",
    "warehousing",
    "Foreign Trade Zone",
    "FTZ services",
    "industrial warehousing",
    "contract warehousing",
    "Mobile Alabama warehouse",
    "Pensacola Florida warehouse",
    "Houston Texas warehouse",
    "manufacturing logistics",
    "port logistics",
    "drayage",
    "third party logistics",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `International Warehouse & Shipping (IWS) | Industrial Warehousing Services`,
    description:
      "Full-service warehousing, Foreign Trade Zone services, and integrated logistics for industrial and manufacturing clients across the Gulf Coast.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `International Warehouse & Shipping (IWS) | Industrial Warehousing Services`,
    description:
      "Full-service warehousing, Foreign Trade Zone services, and integrated logistics for industrial and manufacturing clients across the Gulf Coast.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-iws-cream font-sans text-iws-charcoal">
        <StructuredData data={organizationJsonLd()} />
        <Header />
        <main className="flex-1">
          {/* Soft crossfade between pages; styled by .page in globals.css */}
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-DDQPSFM1Q0" />
    </html>
  );
}
