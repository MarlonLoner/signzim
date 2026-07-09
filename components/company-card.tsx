import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/badge";
import { CompanyLogo } from "@/components/company-logo";
import type { CompanyWithServices } from "@/lib/types";
import { cn } from "@/lib/utils";

type CompanyCardProps = {
  company: CompanyWithServices;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const services = company.services.map((item) => item.service);
  const coverImage = company.coverImageUrl || company.portfolio[0]?.imageUrl || "/images/sign-zim-hero.png";
  const whatsapp = `/api/companies/${company.id}/whatsapp-click`;

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-lg border bg-white/[0.045] shadow-2xl shadow-black/30 transition hover:-translate-y-1 hover:border-amberglow/50",
        company.isVerified ? "border-emerald-300/25 shadow-emerald-950/20" : "border-white/10"
      )}
    >
      <div
        className="h-44 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.7)), url("${coverImage}")`
        }}
      />
      <div className="space-y-5 p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <CompanyLogo name={company.name} logoUrl={company.logoUrl} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="min-w-0 break-words text-lg font-black text-white">{company.name}</h3>
              {company.isVerified ? (
                <Badge tone="green">
                  <ShieldCheck className="mr-1 h-3 w-3" aria-hidden="true" />
                  Verified
                </Badge>
              ) : null}
              {company.foundingProvider ? (
                <Badge tone="blue">Founding</Badge>
              ) : null}
              {company.isFeatured ? (
                <Badge tone="amber">
                  <Star className="mr-1 h-3 w-3" aria-hidden="true" />
                  Featured Provider
                </Badge>
              ) : null}
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-zinc-400">
              <MapPin className="h-4 w-4 text-amberglow" aria-hidden="true" />
              {company.city}
            </p>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-zinc-300">{company.description}</p>

        <div className="flex flex-wrap gap-2">
          {services.slice(0, 4).map((service) => (
            <span key={service.id} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
              {service.name}
            </span>
          ))}
          {services.length > 4 ? (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400">
              +{services.length - 4} more
            </span>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="primary-button w-full px-3">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <Link href={`/companies/${company.slug}`} className="secondary-button w-full px-3">
            View Profile
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

