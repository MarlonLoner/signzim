import Link from "next/link";
import { Building2, ListPlus, Menu, Search } from "lucide-react";

const navItems = [
  { href: "/companies", label: "Companies" },
  { href: "/services", label: "Services" },
  { href: "/launch", label: "Launch" },
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
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Sign Zim home">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amberglow text-black shadow-glow">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-base font-black tracking-wide text-white">Sign Zim</span>
            <span className="hidden text-xs font-medium text-zinc-400 sm:block">Your next branded space starts here.</span>
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
          <details className="group relative lg:hidden">
            <summary className="icon-button list-none cursor-pointer" aria-label="Open navigation menu">
              <Menu className="h-4 w-4" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-12 z-50 w-[min(88vw,22rem)] rounded-lg border border-white/10 bg-coal p-3 shadow-2xl shadow-black/50">
              <nav className="grid gap-1 text-sm font-semibold text-zinc-200">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-3 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

