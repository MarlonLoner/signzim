import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Search } from "lucide-react";
import { CompanyCard } from "@/components/company-card";
import { SectionHeading } from "@/components/section-heading";
import { ShareActions } from "@/components/share-actions";
import { absoluteUrl } from "@/lib/config";
import { cityCatalog, serviceCatalog } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { getCityBySlug } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ citySlug: string }>;

export function generateStaticParams() {
  return cityCatalog.map((city) => ({ citySlug: city.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  const title = city ? `Signage Companies in ${city.name} | Sign Zim` : "Signage Companies by City | Sign Zim";
  const description = city
    ? `Find signage companies in ${city.name}, compare portfolios, and request quotes for shopfront signs, lightboxes, vehicle branding, billboards, vinyl, banners, and 3D signs.`
    : "Find Zimbabwean signage companies by city and request quotes through Sign Zim.";
  const url = absoluteUrl(city ? `/cities/${city.slug}` : "/companies");
  const image = "/images/sign-zim-hero.png";

  return {
    title,
    description,
    alternates: {
      canonical: city ? `/cities/${city.slug}` : "/companies"
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: "Sign Zim city signage directory" }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

async function getCityCompanies(city: string) {
  try {
    const companies = await prisma.company.findMany({
      where: {
        status: "APPROVED",
        city
      },
      include: {
        services: { include: { service: true } },
        portfolio: true
      },
      orderBy: [{ isFeatured: "desc" }, { isVerified: "desc" }, { createdAt: "desc" }]
    });

    return { companies, error: false };
  } catch (error) {
    console.error("Unable to load city companies", error);
    return { companies: [], error: true };
  }
}

function getCitySeoContent(cityName: string) {
  return {
    needs: [
      "Shopfront signs for retail, restaurants, pharmacies, schools, and offices",
      "Vehicle branding and decals for delivery teams, fleets, and service businesses",
      "Outdoor visibility through billboards, banners, lightboxes, and event branding"
    ],
    questions: [
      `Can the provider visit or install in ${cityName}?`,
      "Can they share recent portfolio work for similar signage jobs?",
      "Are artwork, measurements, production, transport, and installation included in the quote?"
    ]
  };
}

export default async function CityPage({ params }: { params: Params }) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  const { companies, error } = city ? await getCityCompanies(city.name) : { companies: [], error: false };
  const quoteHref = city ? `/request-quote?city=${city.slug}` : "/request-quote";
  const pageUrl = absoluteUrl(city ? `/cities/${city.slug}` : "/companies");
  const cityContent = getCitySeoContent(city?.name ?? "Zimbabwe");

  return (
    <div>
      <section className="border-b border-white/10 bg-white/[0.025]">
        <div className="page-shell py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
            <SectionHeading
              eyebrow="City directory"
              title={city ? `Signage companies in ${city.name}` : "Signage companies by city"}
              copy={
                city
                  ? `Compare approved signage providers in ${city.name}, inspect portfolios, and request quotes for commercial signs, branding, print, and installation.`
                  : "Browse Zimbabwean signage providers by city."
              }
            />
            <div className="panel rounded-lg p-5">
              <MapPin className="h-6 w-6 text-amberglow" aria-hidden="true" />
              <p className="mt-4 text-3xl font-black text-white">{companies.length}</p>
              <p className="mt-1 text-sm text-zinc-400">approved providers in this city</p>
              <Link href={quoteHref} className="primary-button mt-5 w-full">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Request a Quote
              </Link>
              {city ? (
                <div className="mt-4">
                  <ShareActions
                    url={pageUrl}
                    whatsappText={`Find signage companies in ${city.name} on Sign Zim: ${pageUrl}`}
                    label="Share city page"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        {companies.length ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        ) : (
          <div className="panel rounded-lg p-8 text-center">
            <Search className="mx-auto h-8 w-8 text-amberglow" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-black text-white">
              {error ? "Provider data is loading." : "No approved providers listed here yet."}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              {error
                ? "We're loading provider data. Please try again shortly."
                : "Sign Zim is still adding providers for this city. You can still request a quote and we will help connect you with relevant signage providers."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={quoteHref} className="primary-button">
                Request a Quote
              </Link>
              <Link href="/list-your-company" className="secondary-button">
                List Your Company
              </Link>
            </div>
          </div>
        )}
      </section>

      {city ? (
        <section className="page-shell pb-12">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6 lg:col-span-2">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Signage needs in {city.name}</p>
              <h2 className="mt-4 text-2xl font-black text-white">Compare local providers before you request a quote.</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {cityContent.needs.map((item) => (
                  <div key={item} className="rounded-md border border-white/10 bg-black/25 p-4 text-sm leading-6 text-zinc-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Before hiring</p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-zinc-300">
                {cityContent.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={quoteHref} className="primary-button mt-6 w-fit">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Request a {city.name} Quote
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-shell pb-12">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-black text-white">Popular services in {city?.name ?? "Zimbabwe"}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {serviceCatalog.slice(0, 8).map((service) => (
              <Link
                key={service.slug}
                href={`/companies?city=${encodeURIComponent(city?.name ?? "")}&service=${service.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amberglow/50 hover:text-white"
              >
                {service.name}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
