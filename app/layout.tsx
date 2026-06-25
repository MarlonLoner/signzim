import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { appConfig } from "@/lib/config";

const siteDescription =
  "Zimbabwe's marketplace for signage companies. Find trusted providers for billboards, lightboxes, vehicle branding, 3D signs, banners, vinyl, and more.";
const ogImage = "/images/sign-zim-hero.png";

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.appUrl),
  title: {
    default: "Sign Zim | Zimbabwe Signage Marketplace",
    template: "%s | Sign Zim"
  },
  description: siteDescription,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Sign Zim | Zimbabwe Signage Marketplace",
    description: siteDescription,
    url: appConfig.appUrl,
    siteName: appConfig.appName,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Sign Zim, Zimbabwe's marketplace for signage companies"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Zim | Zimbabwe Signage Marketplace",
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
