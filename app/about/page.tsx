import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, MessageCircle, Search, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About Sign Zim | Zimbabwe Visibility and Fitting Marketplace",
  description:
    "Learn how Sign Zim helps Zimbabwean businesses find signage, branding, interior deco and fitting providers, compare portfolios, and request quotes."
};

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-white/10 bg-white/[0.025]">
        <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1fr_360px] lg:items-end">
          <SectionHeading
            eyebrow="About Sign Zim"
            title="A Zimbabwean marketplace helping businesses find visibility and space providers faster."
            copy="From shopfront signs and vehicle branding to branded interiors, retail displays, counters, shelving and office fit-outs, Sign Zim helps customers compare providers and request quotes in one place."
          />
          <div className="panel rounded-lg p-6">
            <Building2 className="h-7 w-7 text-amberglow" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black text-white">Built for launch visibility.</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              The platform gives providers a public profile, service pages, city pages, portfolio space, and
              tracked WhatsApp interest.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Search,
              title: "Find providers faster",
              copy: "Customers can filter by city, service, portfolio strength, featured placement, and verification."
            },
            {
              icon: ShieldCheck,
              title: "Build trust before contact",
              copy: "Profiles show badges, services, portfolio images, contact channels, and company context before a lead is sent."
            },
            {
              icon: MessageCircle,
              title: "Turn attention into leads",
              copy: "WhatsApp clicks and quote requests give Sign Zim a simple way to show marketplace value."
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
                <Icon className="h-6 w-6 text-amberglow" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-black text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="page-shell pb-12">
        <div className="grid gap-6 rounded-lg border border-amberglow/30 bg-amberglow/10 p-6 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amberglow/40 bg-black/25 px-3 py-1 text-xs font-semibold text-honey">
              <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Zimbabwe-focused visibility marketplace
            </div>
            <h2 className="text-2xl font-black text-white">Ready to compare providers?</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Browse companies or submit one quote request with service, city, budget, and timeline.
            </p>
          </div>
          <Link href="/companies" className="primary-button">
            Browse Companies
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/request-quote" className="secondary-button">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
