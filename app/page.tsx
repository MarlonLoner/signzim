import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ClipboardCheck,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { CompanyCard } from "@/components/company-card";
import { FaqSection, customerFaqs } from "@/components/faq-section";
import { SectionHeading } from "@/components/section-heading";
import { cityCatalog, cities, groupedServiceCatalog, serviceCatalog } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "SignZim, Interior Deco & Fittings | Zimbabwe Marketplace",
  description:
    "Find signage companies, interior deco providers, shop fitters, office fitters and branding suppliers in Zimbabwe. Compare portfolios and request quotes."
};

async function getFeaturedCompanies() {
  try {
    const companies = await prisma.company.findMany({
      where: { status: "APPROVED" },
      include: {
        services: { include: { service: true } },
        portfolio: true
      },
      orderBy: [{ isFeatured: "desc" }, { isVerified: "desc" }, { createdAt: "desc" }],
      take: 3
    });

    return { companies, error: false };
  } catch (error) {
    console.error("Unable to load featured companies", error);
    return { companies: [], error: true };
  }
}

export default async function HomePage() {
  const { companies, error: featuredError } = await getFeaturedCompanies();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: 'url("/images/sign-zim-hero.png")' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" aria-hidden="true" />
        <div className="page-shell relative grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amberglow/40 bg-amberglow/10 px-4 py-2 text-sm font-semibold text-honey">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Zimbabwe&apos;s marketplace for signage, interior deco and fittings.
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Find trusted providers for signage, kitchens, partitions, aluminium works and fittings in Zimbabwe.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Find trusted providers, view real work and request quotes for shopfront signs, vehicle branding, lightboxes,
              interior deco, shop fitting, office fitting, reception branding, wall branding, displays, counters and more.
            </p>

            <form action="/companies" className="mt-10 rounded-lg border border-white/10 bg-black/65 p-3 shadow-glow backdrop-blur">
              <div className="grid gap-3 lg:grid-cols-[1.25fr_0.8fr_0.8fr_auto]">
                <label className="sr-only" htmlFor="home-search">
                  Search companies
                </label>
                <input
                  id="home-search"
                  name="search"
                  placeholder="Search company or project type"
                  className="input"
                />
                <label className="sr-only" htmlFor="home-city">
                  City
                </label>
                <select id="home-city" name="city" className="input">
                  <option value="">All cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <label className="sr-only" htmlFor="home-service">
                  Service
                </label>
                <select id="home-service" name="service" className="input">
                  <option value="">All services</option>
                  {groupedServiceCatalog.map(({ group, services }) => (
                    <optgroup key={group} label={group}>
                      {services.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <button className="primary-button" type="submit">
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Search
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-quote" className="primary-button">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Request a Quote
              </Link>
              <Link href="/companies" className="secondary-button">
                <Search className="h-4 w-4" aria-hidden="true" />
                Browse Companies
              </Link>
              <Link href="/list-your-company" className="secondary-button">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                List Your Company
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {cityCatalog.map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:border-amberglow/50 hover:text-white"
                >
                  <MapPin className="h-3.5 w-3.5 text-amberglow" aria-hidden="true" />
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-amberglow/10">
        <div className="page-shell flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Launch update</p>
            <h2 className="mt-1 text-2xl font-black text-white">Founding Provider Launch: Join the first 1,000 providers.</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-300">Approved signage, interior deco and fitting businesses receive complimentary premium marketplace access until 10 October 2026.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/list-your-company#submit-listing" className="primary-button">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              List Your Company
            </Link>
            <Link href="/request-quote" className="secondary-button">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Popular services"
            title="From signs outside to customer experience inside."
            copy="Start with the service you need, then compare approved providers by city, portfolio quality, badges, and contact availability."
          />
          <Link href="/services" className="secondary-button w-fit">
            View Services
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCatalog.slice(0, 12).map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:-translate-y-1 hover:border-amberglow/50 hover:bg-amberglow/10"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-amberglow text-black">
                <BadgeCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-black text-white">{service.name}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-honey">{service.group}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{service.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-16">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Why use Sign Zim?"
            title="A faster way to shortlist visibility and space providers."
            copy="Sign Zim is built around the questions customers ask before investing in signs, branded interiors, displays, counters or fitting: who can do the work, where are they based, what have they produced, and how quickly can I reach them?"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Trust signals first",
                copy: "Verified and featured badges help customers spot stronger listings before they open a profile."
              },
              {
                icon: ClipboardCheck,
                title: "Portfolio-led comparison",
                copy: "Company cards and profile pages put completed work, service mix, and contact channels up front."
              },
              {
                icon: MessageCircle,
                title: "WhatsApp-ready leads",
                copy: "Customers can message providers directly or submit one quote request for admin follow-up."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
                  <Icon className="h-6 w-6 text-amberglow" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-shell">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Featured companies"
              title="Portfolio-first providers ready for commercial jobs."
              copy="Featured providers receive priority placement. If no featured listings are available, Sign Zim falls back to verified and recently approved providers."
            />
            <Link href="/companies" className="secondary-button w-fit">
              Browse Directory
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {companies.length ? (
              companies.map((company) => <CompanyCard key={company.id} company={company} />)
            ) : (
              <div className="panel rounded-lg p-8 text-zinc-300 lg:col-span-3">
                {featuredError
                  ? "We're loading provider data. Please try again shortly."
                  : "Sign Zim is onboarding featured providers for this space."}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <SectionHeading eyebrow="How it works" title="From search to quote request in minutes." />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Search", "Filter providers by city, service, portfolio strength, and verification."],
            ["Compare", "Open profiles, inspect galleries, and check contact details before reaching out."],
            ["Request", "Send a quote request or message a company directly through WhatsApp."]
          ].map(([title, copy], index) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amberglow text-sm font-black text-black">
                {index + 1}
              </span>
              <h3 className="mt-6 text-xl font-black text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">About Sign Zim</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black text-white">
              A Zimbabwean marketplace for business visibility and branded spaces.
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-zinc-300">
              Sign Zim helps businesses find signage, branding, interior deco and fitting providers faster. From
              shopfront signs and vehicle branding to branded interiors, counters, shelving, displays and reception
              spaces, the platform helps customers compare providers and request quotes in one place.
            </p>
          </div>
          <Link href="/about" className="secondary-button w-fit">
            Learn More
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-7">
            <Building2 className="h-7 w-7 text-amberglow" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-black text-white">For providers</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Create a profile that shows your services, city, contact person, WhatsApp number, and portfolio links for
              signage, deco, fitting, print, display, or branded space work.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/for-signage-companies" className="primary-button">
                For Providers
              </Link>
              <Link href="/list-your-company" className="secondary-button">
                List Your Company
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-7">
            <Users className="h-7 w-7 text-amberglow" aria-hidden="true" />
            <h2 className="mt-5 text-3xl font-black text-white">Request one quote, reach relevant providers</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Customers submit service, city, budget, timeline, and project details once. The admin dashboard turns
              each lead into a WhatsApp-ready message for quick routing and follow-up.
            </p>
            <div className="mt-6">
              <Link href="/request-quote" className="primary-button">
                Request a Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <FaqSection eyebrow="Customer FAQ" title="Before you request a project quote" items={customerFaqs} />
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <h2 className="text-2xl font-black text-white">Questions from providers?</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Providers can see package positioning, approval rules, and provider-specific FAQ on the launch
              sales page.
            </p>
            <Link href="/for-signage-companies" className="primary-button mt-6 w-fit">
              Provider Page
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell pb-16">
        <div className="grid gap-4 rounded-lg border border-amberglow/30 bg-amberglow/10 p-6 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-black text-white">Ready to start a signage, deco or fitting project?</h2>
            <p className="mt-2 text-sm text-zinc-300">Send the job details once and manage the lead from the admin dashboard.</p>
          </div>
          <Link href="/request-quote" className="primary-button">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Request a Quote
          </Link>
          <Link href="/list-your-company" className="secondary-button">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            List Your Company
          </Link>
        </div>
      </section>
    </div>
  );
}


