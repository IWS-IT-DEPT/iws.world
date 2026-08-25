import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/data";
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
    default: `${siteConfig.name} | Warehousing & Foreign Trade Zone Services`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "IWS provides full-service warehousing and Foreign Trade Zone services for industrial and manufacturing clients, with facilities in Mobile, AL, Pensacola, FL, and Houston, TX.",
  openGraph: {
    title: `${siteConfig.name} | Warehousing & Foreign Trade Zone Services`,
    description:
      "Full-service warehousing, Foreign Trade Zone services, and integrated logistics for industrial and manufacturing clients across the Gulf Coast.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-iws-cream font-sans text-iws-charcoal">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
