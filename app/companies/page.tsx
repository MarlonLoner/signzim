import type { Metadata } from "next";
import Link from "next/link";
import { Filter, Search, X } from "lucide-react";
import { CompanyCard } from "@/components/company-card";
import { SectionHeading } from "@/components/section-heading";
import { TrustBadgeExplainer } from "@/components/trust-badge-explainer";
import { cities, serviceCatalog } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { getServiceBySlug } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Signage Companies in Zimbabwe | Sign Zim",
  description:
    "Browse approved signage companies in Zimbabwe by city, service, verification status, and portfolio quality. Request quotes for shopfront signs, vehicle branding, lightboxes, billboards, vinyl, banners, and more."
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function paramValue(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

async function getCompanies(params: Record<string, string | string[] | undefined>) {
  const search = paramValue(params, "search").trim();
  const city = paramValue(params, "city").trim();
  const service = paramValue(params, "service").trim();
  const verifiedOnly = paramValue(params, "verified") === "true";
  const sort = paramValue(params, "sort") || "featured";

  const where: Prisma.CompanyWhereInput = {
    status: "APPROVED"
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { city: { contains: search, mode: "insensitive" } }
    ];
  }

  if (city) {
    where.city = city;
  }

  if (service) {
    where.services = {
      some: {
        service: {
          slug: service
        }
      }
    };
  }

  if (verifiedOnly) {
    where.isVerified = true;
  }

  try {
    const companies = await prisma.company.findMany({
      where,
      include: {
        services: { include: { service: true } },
        portfolio: true
      },
      orderBy:
        sort === "newest"
          ? [{ createdAt: "desc" }]
          : [{ isFeatured: "desc" }, { isVerified: "desc" }, { createdAt: "desc" }]
    });

    return { companies, error: false };
  } catch (error) {
    console.error("Unable to load companies", error);
    return { companies: [], error: true };
  }
}

export default async function CompaniesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const { companies, error } = await getCompanies(params);
  const search = paramValue(params, "search");
  const city = paramValue(params, "city");
  const service = paramValue(params, "service");
  const sort = paramValue(params, "sort") || "featured";
  const verifiedOnly = paramValue(params, "verified") === "true";
  const activeFilters = [
    search ? `Search: ${search}` : "",
    city ? `City: ${city}` : "",
    service ? `Service: ${getServiceBySlug(service)?.name ?? service}` : "",
    verifiedOnly ? "Verified only" : ""
  ].filter(Boolean);

  return (
    <div className="page-shell py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Directory"
          title="Approved signage companies across Zimbabwe."
          copy="Filter by service, city, company name, or verification status."
        />
        <div className="rounded-lg border border-white/10 bg-white/[0.045] px-5 py-4 text-sm text-zinc-300">
          <span className="text-2xl font-black text-white">{companies.length}</span> matching companies
        </div>
      </div>

      <form className="panel mt-10 rounded-lg p-4" action="/companies">
        <div className="grid gap-3 lg:grid-cols-[1.3fr_0.8fr_0.9fr_0.8fr_auto]">
          <label className="sr-only" htmlFor="search">
            Search by company name
          </label>
          <input
            id="search"
            name="search"
            defaultValue={search}
            placeholder="Search by company name"
            className="input"
          />
          <label className="sr-only" htmlFor="city">
            City
          </label>
          <select id="city" name="city" defaultValue={city} className="input">
            <option value="">All cities</option>
            {cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="service">
            Service
          </label>
          <select id="service" name="service" defaultValue={service} className="input">
            <option value="">All services</option>
            {serviceCatalog.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="sort">
            Sort companies
          </label>
          <select id="sort" name="sort" defaultValue={sort} className="input">
            <option value="featured">Featured first</option>
            <option value="newest">Newest first</option>
          </select>
          <button type="submit" className="primary-button">
            <Search className="h-4 w-4" aria-hidden="true" />
            Apply
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex items-center gap-3 text-sm font-medium text-zinc-300">
            <input
              type="checkbox"
              name="verified"
              value="true"
              defaultChecked={verifiedOnly}
              className="h-4 w-4 rounded border-white/20 bg-black text-amberglow focus:ring-amberglow"
            />
            Verified only
          </label>
          {activeFilters.length ? (
            <Link href="/companies" className="secondary-button w-fit px-3 py-2">
              <X className="h-4 w-4" aria-hidden="true" />
              Clear Filters
            </Link>
          ) : null}
        </div>
      </form>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
        <span className="font-semibold text-zinc-200">Active filters:</span>
        {activeFilters.length ? (
          activeFilters.map((filter) => (
            <span key={filter} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
              {filter}
            </span>
          ))
        ) : (
          <span>No filters applied</span>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      {!companies.length ? (
        <div className="panel mt-8 rounded-lg p-8 text-center">
          <Filter className="mx-auto h-8 w-8 text-amberglow" aria-hidden="true" />
          <h2 className="mt-4 text-xl font-black text-white">
            {error ? "Provider data is loading." : "No companies match those filters."}
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            {error
              ? "We're loading provider data. Please try again shortly."
              : "Sign Zim is still onboarding providers in this category. Submit a quote request and we will help connect you with relevant signage companies."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/companies" className="primary-button">
              Clear Filters
            </Link>
            <Link href="/request-quote" className="secondary-button">
              Request a Quote
            </Link>
            <Link href="/list-your-company" className="secondary-button">
              List Your Company
            </Link>
          </div>
        </div>
      ) : null}

      <div className="mt-12">
        <TrustBadgeExplainer />
      </div>
    </div>
  );
}
