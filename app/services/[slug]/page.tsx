import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, MessageCircle, Search } from "lucide-react";
import { CompanyCard } from "@/components/company-card";
import { SectionHeading } from "@/components/section-heading";
import { ShareActions } from "@/components/share-actions";
import { absoluteUrl } from "@/lib/config";
import { serviceCatalog } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { getServiceBySlug } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return serviceCatalog.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const title = service ? `${service.name} Companies in Zimbabwe | Sign Zim` : "Signage Services | Sign Zim";
  const description =
    service?.seoDescription ??
    "Find signage companies in Zimbabwe by service, compare portfolios, and request signage quotes through Sign Zim.";
  const url = absoluteUrl(service ? `/services/${service.slug}` : "/services");
  const image = "/images/sign-zim-hero.png";

  return {
    title,
    description,
    alternates: {
      canonical: service ? `/services/${service.slug}` : "/services"
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: "Sign Zim signage service directory" }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

async function getServiceCompanies(slug: string) {
  try {
    const companies = await prisma.company.findMany({
      where: {
        status: "APPROVED",
        services: {
          some: {
            service: { slug }
          }
        }
      },
      include: {
        services: { include: { service: true } },
        portfolio: true
      },
      orderBy: [{ isFeatured: "desc" }, { isVerified: "desc" }, { createdAt: "desc" }]
    });

    return { companies, error: false };
  } catch (error) {
    console.error("Unable to load service companies", error);
    return { companies: [], error: true };
  }
}

type CatalogService = (typeof serviceCatalog)[number];

const serviceUseCases: Record<string, string[]> = {
  "3d-signage": ["Shopfront lettering", "Reception wall logos", "Premium brand facades"],
  lightboxes: ["Night-visible shopfront signs", "Menu boards", "Retail display signs"],
  billboards: ["Roadside campaigns", "Construction hoardings", "Large-format outdoor panels"],
  "vehicle-branding": ["Fleet wraps", "Delivery vehicle graphics", "Partial wraps and decals"],
  "shopfront-signage": ["Fascia boards", "Mall storefronts", "Window graphics"],
  "event-branding": ["Stage backdrops", "Expo booths", "Branded tents and flags"],
  "vinyl-printing": ["Window decals", "Stickers and labels", "Promotional graphics"]
};

function getServiceSeoContent(service: CatalogService) {
  return {
    what: `${service.name} covers ${service.description.toLowerCase()} Customers usually compare providers by portfolio quality, material recommendations, installation ability, and how quickly the team can quote or visit the site.`,
    useCases: serviceUseCases[service.slug] ?? [
      "Retail and office branding",
      "Promotional campaigns",
      "Commercial site signage"
    ],
    questions: [
      "Can the provider help with artwork, measurements, production, and installation?",
      "Which materials are recommended for indoor use, outdoor weather, or high-traffic areas?",
      "What lead time, warranty, maintenance, and payment terms should be confirmed before work begins?"
    ]
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  const { companies, error } = service ? await getServiceCompanies(service.slug) : { companies: [], error: false };
  const relatedServices = serviceCatalog.filter((item) => item.slug !== slug).slice(0, 5);
  const quoteHref = service ? `/request-quote?service=${service.slug}` : "/request-quote";
  const pageUrl = absoluteUrl(service ? `/services/${service.slug}` : "/services");
  const seoContent = service ? getServiceSeoContent(service) : null;

  return (
    <div>
      <section className="border-b border-white/10 bg-white/[0.025]">
        <div className="page-shell py-12">
          <Link href="/services" className="secondary-button mb-8 w-fit">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Services
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
            <SectionHeading
              eyebrow="Service landing page"
              title={service ? `${service.name} companies in Zimbabwe` : "Signage service providers"}
              copy={
                service?.seoDescription ??
                "Browse approved Zimbabwean signage providers, compare portfolios, and request a quote."
              }
            />
            <div className="panel rounded-lg p-5">
              <p className="text-3xl font-black text-white">{companies.length}</p>
              <p className="mt-1 text-sm text-zinc-400">approved providers offering this service</p>
              <div className="mt-5 grid gap-3">
                <Link href={quoteHref} className="primary-button">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {service ? `Request a ${service.name} Quote` : "Request a Quote"}
                </Link>
                <Link href="/list-your-company" className="secondary-button">
                  <Building2 className="h-4 w-4" aria-hidden="true" />
                  List Your Company
                </Link>
              </div>
              {service ? (
                <div className="mt-4">
                  <ShareActions
                    url={pageUrl}
                    whatsappText={`Find ${service.name} companies in Zimbabwe on Sign Zim: ${pageUrl}`}
                    label="Share service page"
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
              {error ? "Provider data is loading." : "No approved providers for this service yet."}
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              {error
                ? "We're loading provider data. Please try again shortly."
                : "Sign Zim is still adding providers for this category. You can still request a quote and we will help connect you with relevant signage providers."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={quoteHref} className="primary-button">
                {service ? `Request a ${service.name} Quote` : "Request a Quote"}
              </Link>
              <Link href="/list-your-company" className="secondary-button">
                List Your Company
              </Link>
            </div>
          </div>
        )}
      </section>

      {service && seoContent ? (
        <section className="page-shell pb-12">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">What it is</p>
              <h2 className="mt-4 text-2xl font-black text-white">{service.name} for Zimbabwean businesses</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{seoContent.what}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Common use cases</p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-zinc-300">
                {seoContent.useCases.map((item) => (
                  <li key={item} className="rounded-md border border-white/10 bg-black/25 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-6">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Before hiring</p>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-zinc-300">
                {seoContent.questions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={quoteHref} className="primary-button mt-6 w-fit">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Request a {service.name} Quote
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-shell pb-12">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
          <h2 className="text-xl font-black text-white">Related signage services</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amberglow/50 hover:text-white"
              >
                {item.name}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
