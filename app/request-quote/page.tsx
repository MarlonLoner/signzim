import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ImagePlus, MessageCircle, TriangleAlert } from "lucide-react";
import { createLead } from "@/lib/actions";
import { appConfig } from "@/lib/config";
import { budgetRanges, cities, cityCatalog, serviceCatalog, timelines } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { leadWhatsAppMessage, whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Request a Signage Quote | Sign Zim",
  description:
    "Request signage quotes in Zimbabwe for shopfront signs, lightboxes, vehicle branding, billboards, banners, vinyl, 3D signs, and more."
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function paramValue(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

async function getPreferredCompany(slug: string) {
  if (!slug) {
    return null;
  }

  try {
    return await prisma.company.findFirst({
      where: {
        slug,
        status: "APPROVED"
      },
      select: {
        name: true,
        slug: true,
        city: true
      }
    });
  } catch (error) {
    console.error("Unable to load preferred company context", error);
    return null;
  }
}

export default async function RequestQuotePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const serviceParam = paramValue(params, "service");
  const cityParam = paramValue(params, "city");
  const companyParam = paramValue(params, "company");
  const preferredCompany = await getPreferredCompany(companyParam);
  const selectedService = serviceCatalog.find((service) => service.slug === serviceParam || service.name === serviceParam);
  const selectedCity = cityCatalog.find((city) => city.slug === cityParam || city.name === cityParam);
  const defaultService = selectedService?.name ?? "";
  const defaultCity = selectedCity?.name ?? "";
  const success = paramValue(params, "success") === "1";
  const error = paramValue(params, "error");
  const contextSources = [
    selectedService ? `service-page:${selectedService.slug}` : "",
    selectedCity ? `city-page:${selectedCity.slug}` : ""
  ].filter(Boolean);
  const leadSource = preferredCompany
    ? `company-profile:${preferredCompany.slug}`
    : contextSources.length
      ? contextSources.join(";")
      : "request-quote-page";
  const summary = {
    customerName: paramValue(params, "name"),
    phone: "",
    city: defaultCity || paramValue(params, "city"),
    serviceNeeded: defaultService || paramValue(params, "service"),
    budgetRange: paramValue(params, "budget"),
    timeline: paramValue(params, "timeline"),
    projectDescription: "Quote request submitted through Sign Zim."
  };
  const adminWhatsapp = appConfig.adminWhatsapp;
  const adminWhatsappHref =
    adminWhatsapp && success
      ? whatsappLink(
          adminWhatsapp,
          leadWhatsAppMessage({
            ...summary,
            phone: "Provided in Sign Zim admin",
            projectDescription: "Please review the new quote request in Sign Zim admin."
          })
        )
      : null;

  return (
    <div className="page-shell grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Customer lead</p>
        <h1 className="mt-4 text-5xl font-black leading-tight text-white">Request a Quote</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">
          Send one request with your project details, location, budget, and timeline so Sign Zim can help you reach
          relevant signage providers faster.
        </p>
        <div className="panel mt-8 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-amberglow text-black">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-black text-white">WhatsApp-first follow-up</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                New requests appear in admin with a ready-to-copy message for customer follow-up.
              </p>
            </div>
          </div>
        </div>
        <div className="panel mt-4 rounded-lg p-6">
          <h2 className="font-black text-white">Helpful project examples</h2>
          <div className="mt-4 grid gap-3 text-sm leading-6 text-zinc-400">
            <p>Example: I need a 3m x 1m lightbox for a pharmacy in Avondale.</p>
            <p>Example: I need vehicle branding for 3 delivery cars.</p>
          </div>
        </div>
      </aside>

      <section className="panel rounded-lg p-5 sm:p-8">
        {success ? (
          <div className="mb-6 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-5 text-sm text-emerald-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-black text-white">Your quote request has been received.</h2>
                <p className="mt-2 leading-6">
                  Sign Zim will connect your request with relevant signage providers.
                </p>
              </div>
            </div>
            <dl className="mt-5 grid gap-3 rounded-md border border-white/10 bg-black/25 p-4 text-zinc-200 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">Service</dt>
                <dd className="mt-1">{summary.serviceNeeded || "Signage project"}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">City</dt>
                <dd className="mt-1">{summary.city || "Zimbabwe"}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">Budget</dt>
                <dd className="mt-1">{summary.budgetRange || "To be confirmed"}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-200">Timeline</dt>
                <dd className="mt-1">{summary.timeline || "To be confirmed"}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/companies" className="primary-button">
                Browse Companies
              </Link>
              <Link href="/request-quote" className="secondary-button">
                Send Another Request
              </Link>
              {adminWhatsappHref ? (
                <a href={adminWhatsappHref} target="_blank" rel="noreferrer" className="secondary-button">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp Sign Zim
                </a>
              ) : null}
            </div>
          </div>
        ) : null}
        {error ? (
          <div className="mb-6 rounded-md border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
            <TriangleAlert className="mr-2 inline h-4 w-4" aria-hidden="true" />
            Check the required fields and try again.
          </div>
        ) : null}

        <form action={createLead} className="grid gap-5">
          <input type="hidden" name="leadSource" value={leadSource} />
          {preferredCompany ? (
            <div className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-4 text-sm text-zinc-200">
              <span className="font-bold text-white">Preferred provider:</span> {preferredCompany.name} in{" "}
              {preferredCompany.city}. This context is saved in admin as lead source `{leadSource}` while the lead
              schema stays intentionally lightweight.
            </div>
          ) : null}
          {!preferredCompany && (selectedService || selectedCity) ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-zinc-300">
              <span className="font-bold text-white">Request context:</span>{" "}
              {selectedService ? `${selectedService.name} quote` : "Signage quote"}
              {selectedCity ? ` in ${selectedCity.name}` : ""}. This context is saved in admin as lead source{" "}
              <span className="font-mono text-honey">{leadSource}</span>.
            </div>
          ) : null}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">Customer name</span>
              <input name="customerName" required minLength={2} className="input" placeholder="Full name" />
            </label>
            <label className="field">
              <span className="label">Phone/WhatsApp</span>
              <input name="phone" required className="input" placeholder="+263..." />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">Email optional</span>
              <input name="email" type="email" className="input" placeholder="name@example.com" />
            </label>
            <label className="field">
              <span className="label">City</span>
              <select name="city" required className="input" defaultValue={defaultCity}>
                <option value="" disabled>
                  Select city
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">Service needed</span>
              <select name="serviceNeeded" required className="input" defaultValue={defaultService}>
                <option value="" disabled>
                  Select service
                </option>
                {serviceCatalog.map((service) => (
                  <option key={service.slug} value={service.name}>
                    {service.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="label">Budget range</span>
              <select name="budgetRange" required className="input" defaultValue="">
                <option value="" disabled>
                  Select budget
                </option>
                {budgetRanges.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="field">
            <span className="label">Project description</span>
            <textarea
              name="projectDescription"
              required
              minLength={12}
              rows={5}
              className="input"
              placeholder="Example: I need a 3m x 1m lightbox for a pharmacy in Avondale, including design, production, and installation."
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">Timeline</span>
              <select name="timeline" required className="input" defaultValue="">
                <option value="" disabled>
                  Select timeline
                </option>
                {timelines.map((timeline) => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="label">Upload/reference image URL optional</span>
              <span className="relative block">
                <ImagePlus className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-amberglow" aria-hidden="true" />
                <input name="referenceImageUrl" className="input pl-11" placeholder="https://..." />
              </span>
            </label>
          </div>

          <button type="submit" className="primary-button mt-2 w-full sm:w-fit">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Submit Quote Request
          </button>
        </form>
      </section>
    </div>
  );
}
