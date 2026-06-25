import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { Badge } from "@/components/badge";
import type { CompanyWithServices } from "@/lib/types";
import { cn, initials } from "@/lib/utils";

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
      <div className="space-y-5 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-black text-lg font-black text-amberglow">
            {company.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={company.logoUrl} alt="" className="h-full w-full object-cover" />
            ) : (
              initials(company.name)
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-black text-white">{company.name}</h3>
              {company.isVerified ? (
                <Badge tone="green">
                  <ShieldCheck className="mr-1 h-3 w-3" aria-hidden="true" />
                  Verified
                </Badge>
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

        <div className="grid grid-cols-2 gap-3">
          <a href={whatsapp} target="_blank" rel="noreferrer" className="primary-button px-3">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </a>
          <Link href={`/companies/${company.slug}`} className="secondary-button px-3">
            View Profile
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
