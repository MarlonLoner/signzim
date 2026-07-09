import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { appConfig } from "@/lib/config";

const siteDescription =
  "Find trusted providers, view real work and request quotes for signage, kitchens, partitions, aluminium works, exhibition booths, commercial interiors and fittings.";
const ogImage = "/images/sign-zim-hero.png";

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.appUrl),
  title: {
    default: "SignZim, Interior Deco & Fittings | Zimbabwe Marketplace",
    template: "%s | SignZim"
  },
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "SignZim, Interior Deco & Fittings | Zimbabwe Marketplace",
    description: siteDescription,
    url: appConfig.appUrl,
    siteName: appConfig.appName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "SignZim, Interior Deco & Fittings, Zimbabwe's marketplace for signage, deco and fitting providers"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "SignZim, Interior Deco & Fittings | Zimbabwe Marketplace",
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

