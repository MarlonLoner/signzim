import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { appConfig } from "@/lib/config";

const siteDescription =
  "Find signage, interior deco, branding and fitting providers in Zimbabwe. Compare portfolios and request quotes for shopfront signs, branded spaces, displays, counters and more.";
const ogImage = "/images/sign-zim-hero.png";

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.appUrl),
  title: {
    default: "Sign Zim | Signage, Interior Deco & Fitting Providers in Zimbabwe",
    template: "%s | Sign Zim"
  },
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Sign Zim | Signage, Interior Deco & Fitting Providers in Zimbabwe",
    description: siteDescription,
    url: appConfig.appUrl,
    siteName: appConfig.appName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Sign Zim, Zimbabwe's marketplace for signage, deco and fitting providers"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Zim | Signage, Interior Deco & Fitting Providers in Zimbabwe",
    description: siteDescription,
    images: [ogImage]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
