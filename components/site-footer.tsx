import Link from "next/link";
import { Building2 } from "lucide-react";

const quickLinks = [
  { href: "/companies", label: "Companies" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" }
];

const customerLinks = [
  { href: "/request-quote", label: "Request Quote" },
  { href: "/companies", label: "Browse Companies" },
  { href: "/services/vehicle-branding", label: "Vehicle Branding" },
  { href: "/services/lightboxes", label: "Lightboxes" }
];

const providerLinks = [
  { href: "/for-signage-companies", label: "For Signage Companies" },
  { href: "/list-your-company", label: "List Your Company" },
  { href: "/about", label: "Marketplace Trust" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/35">
      <div className="page-shell grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Sign Zim home">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amberglow text-black shadow-glow">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-base font-black text-white">Sign Zim</span>
              <span className="block text-xs font-medium text-zinc-400">Your next sign starts here.</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-zinc-400">
            Sign Zim helps Zimbabwean businesses discover signage providers, compare portfolios, and request quotes
            for shopfront signs, vehicle branding, billboards, lightboxes, banners, vinyl, and more.
          </p>
          <p className="mt-5 max-w-md text-xs leading-5 text-zinc-500">
            Sign Zim is a marketplace directory, not the installer or contracting party. Customers should confirm
            pricing, measurements, artwork, production timelines, warranties, and payment terms directly with each
            provider before work begins.
          </p>
          <p className="mt-3 max-w-md text-xs leading-5 text-zinc-500">
            Verified and featured badges are marketplace trust signals based on admin review and placement status; they
            do not replace customer checks before hiring.
          </p>
        </div>

        {[
          ["Quick links", quickLinks],
          ["Customer links", customerLinks],
          ["Provider links", providerLinks]
        ].map(([title, links]) => (
          <div key={title as string}>
            <h2 className="text-sm font-black text-white">{title as string}</h2>
            <div className="mt-4 grid gap-2 text-sm text-zinc-400">
              {(links as typeof quickLinks).map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
