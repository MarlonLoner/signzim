import Link from "next/link";
import { Building2, ListPlus, Search } from "lucide-react";

const navItems = [
  { href: "/companies", label: "Companies" },
  { href: "/services", label: "Services" },
  { href: "/request-quote", label: "Request Quote" },
  { href: "/list-your-company", label: "List Your Company" },
  { href: "/for-signage-companies", label: "For Providers" },
  { href: "/about", label: "About" },
  { href: "/admin", label: "Admin" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-coal/85 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Sign Zim home">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amberglow text-black shadow-glow">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-black tracking-wide text-white">Sign Zim</span>
            <span className="block text-xs font-medium text-zinc-400">Your next sign starts here.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-medium text-zinc-300 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/companies" className="icon-button md:hidden" aria-label="Search companies">
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/list-your-company" className="secondary-button hidden sm:inline-flex lg:hidden">
            <ListPlus className="h-4 w-4" aria-hidden="true" />
            List Your Company
          </Link>
        </div>
      </div>
    </header>
  );
}
