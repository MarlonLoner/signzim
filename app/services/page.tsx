import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { serviceCatalog } from "@/lib/data";

export const metadata: Metadata = {
  title: "Signage Services in Zimbabwe | Sign Zim",
  description:
    "Browse signage services in Zimbabwe including 3D signage, lightboxes, vehicle branding, billboards, vinyl printing, banners, shopfront signage, and event branding."
};

export default function ServicesPage() {
  return (
    <div className="page-shell py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Services"
          title="Signage categories customers search for most."
          copy="Each service opens the directory with the matching provider filter already applied."
        />
        <Link href="/request-quote" className="primary-button w-fit">
          Request a Quote
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {serviceCatalog.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group rounded-lg border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-amberglow/50"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-amberglow text-black">
              <BadgeCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="text-xl font-black text-white">{service.name}</h2>
            <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">{service.description}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-honey">
              View service page
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
