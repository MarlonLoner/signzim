"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Menu, Search, X } from "lucide-react";

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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-coal/85 backdrop-blur-xl">
      <div className="page-shell flex h-16 min-w-0 items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3" aria-label="SignZim home" onClick={() => setMenuOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amberglow text-black shadow-glow">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-base font-black tracking-wide text-white">SignZim</span>
            <span className="hidden truncate text-xs font-medium text-zinc-400 md:block">Interior Deco & Fittings</span>
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-4 text-sm font-medium text-zinc-300 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link href="/companies" className="icon-button md:hidden" aria-label="Search companies" onClick={() => setMenuOpen(false)}>
            <Search className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="icon-button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-navigation" className="border-t border-white/10 bg-coal shadow-2xl shadow-black/40 lg:hidden">
          <nav className="page-shell grid gap-1 py-3 text-sm font-semibold text-zinc-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-w-0 rounded-md px-3 py-3 transition hover:bg-white/5 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
