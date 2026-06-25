import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { groupedServiceCatalog } from "@/lib/data";

export const metadata: Metadata = {
  title: "Signage, Deco & Fitting Services in Zimbabwe | Sign Zim",
  description:
    "Browse signage, branding, interior deco, shop fitting, office fitting, retail display, counter, shelving, partition, and event display services in Zimbabwe."
};

export default function ServicesPage() {
  return (
    <div className="page-shell py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Services"
          title="Business visibility and space transformation services."
          copy="Browse signage, branding, interiors, shop fitting, office fitting, and display services by category."
        />
        <Link href="/request-quote" className="primary-button w-fit">
          Request a Quote
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-10 grid gap-8">
        {groupedServiceCatalog.map(({ group, services }) => (
          <section key={group}>
            <h2 className="text-xl font-black text-white">{group}</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-amberglow/50"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-amberglow text-black">
                    <BadgeCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-honey">{service.group}</p>
                  <h3 className="mt-2 text-xl font-black text-white">{service.name}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-honey">
                    View service page
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
