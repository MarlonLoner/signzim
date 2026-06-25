import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CheckCircle2, ImagePlus, TriangleAlert } from "lucide-react";
import { TrustBadgeExplainer } from "@/components/trust-badge-explainer";
import { createCompanySubmission } from "@/lib/actions";
import { cities, packageOptions, serviceCatalog } from "@/lib/data";

export const metadata: Metadata = {
  title: "List Your Signage Company | Sign Zim",
  description:
    "Submit a Zimbabwe signage company for review on Sign Zim, including services, city, contacts, portfolio links, and selected listing package."
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function paramValue(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function ListYourCompanyPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const success = paramValue(params, "success") === "1";
  const error = paramValue(params, "error");
  const claimSlug = paramValue(params, "claim");
  const listingIncludes = [
    "Company profile with city and contact person",
    "Services listed across Sign Zim service pages",
    "WhatsApp, email, website, and Facebook links",
    "Portfolio gallery for recent signage work",
    "Visibility in relevant service and city pages"
  ];
  const packageComparison = [
    {
      name: "Free Listing",
      price: "Coming soon",
      features: ["Company profile", "Services listed", "Contact details", "Portfolio gallery", "Appears in relevant service/city pages"]
    },
    {
      name: "Verified Listing",
      price: "Contact Sign Zim",
      features: ["Everything in Free", "Verified Provider badge", "Stronger trust positioning", "Better credibility on listing pages", "Admin-reviewed business/contact details"]
    },
    {
      name: "Featured Listing",
      price: "Contact Sign Zim",
      features: ["Everything in Verified", "Featured Provider badge", "Priority placement on homepage/directory/service pages", "Higher visibility", "More prominent CTAs", "Better chance of quote requests"]
    }
  ];

  return (
    <div className="page-shell grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Provider listing</p>
        <h1 className="mt-4 text-5xl font-black leading-tight text-white">List Your Company</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">
          Submit the company details, service categories, contact information, and portfolio links for review.
        </p>
        <Link href="/for-signage-companies" className="secondary-button mt-6 w-fit">
          Provider Sales Page
        </Link>
        <div className="mt-8 grid gap-3">
          {packageOptions.map((option) => (
            <div key={option.value} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <h2 className="text-sm font-black text-white">{option.label}</h2>
              <p className="mt-2 text-xs leading-5 text-zinc-400">{option.description}</p>
            </div>
          ))}
        </div>
        <div className="panel mt-8 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-amberglow text-black">
              <Building2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-black text-white">Approval queue</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Submitted listings are saved as pending until the owner reviews them in admin.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <section id="submit-listing" className="panel rounded-lg p-5 sm:p-8">
        {success ? (
          <div className="mb-6 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
            <span className="font-semibold text-white">Your company listing has been submitted for review.</span>
            <span className="mt-2 block">Approved listings appear on Sign Zim after verification.</span>
          </div>
        ) : null}
        {error ? (
          <div className="mb-6 rounded-md border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
            <TriangleAlert className="mr-2 inline h-4 w-4" aria-hidden="true" />
            Check the required fields and try again.
          </div>
        ) : null}
        {claimSlug ? (
          <div className="mb-6 rounded-md border border-amberglow/30 bg-amberglow/10 p-4 text-sm text-honey">
            You are requesting to claim or update an existing Sign Zim listing: <span className="font-bold text-white">{claimSlug}</span>.
            The claim context will be saved privately for admin review.
          </div>
        ) : null}

        <form action={createCompanySubmission} className="grid gap-5">
          {claimSlug ? <input type="hidden" name="claimSlug" value={claimSlug} /> : null}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">Company name</span>
              <input name="name" required minLength={2} className="input" placeholder="Company name" />
            </label>
            <label className="field">
              <span className="label">Contact person</span>
              <input name="contactPerson" required minLength={2} className="input" placeholder="Primary contact" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">WhatsApp number</span>
              <input name="whatsapp" required className="input" placeholder="+263..." />
            </label>
            <label className="field">
              <span className="label">Email</span>
              <input name="email" type="email" required className="input" placeholder="business@example.com" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">City</span>
              <select name="city" required className="input" defaultValue="">
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
            <label className="field">
              <span className="label">Address optional</span>
              <input name="address" className="input" placeholder="Street, suburb, building" />
            </label>
          </div>

          <fieldset className="field">
            <legend className="label">Services offered</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {serviceCatalog.map((service) => (
                <label key={service.slug} className="checkbox-card">
                  <input
                    type="checkbox"
                    name="services"
                    value={service.slug}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-amberglow focus:ring-amberglow"
                  />
                  <span>
                    <span className="block font-semibold text-white">{service.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-zinc-400">{service.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="field">
            <span className="label">Business description</span>
            <textarea
              name="description"
              required
              minLength={20}
              rows={5}
              className="input"
              placeholder="Describe your signage services, strengths, equipment, coverage area, and project types."
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">Website optional</span>
              <input name="website" className="input" placeholder="https://..." />
            </label>
            <label className="field">
              <span className="label">Facebook page optional</span>
              <input name="facebookUrl" className="input" placeholder="https://facebook.com/..." />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="field">
              <span className="label">Logo URL optional</span>
              <span className="relative block">
                <ImagePlus className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-amberglow" aria-hidden="true" />
                <input name="logoUrl" className="input pl-11" placeholder="https://..." />
              </span>
            </label>
            <label className="field">
              <span className="label">Cover image URL optional</span>
              <span className="relative block">
                <ImagePlus className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-amberglow" aria-hidden="true" />
                <input name="coverImageUrl" className="input pl-11" placeholder="https://..." />
              </span>
            </label>
          </div>

          <label className="field">
            <span className="label">Portfolio image URLs optional</span>
            <span className="block text-xs leading-5 text-zinc-400">
              Upload or paste links to clear photos of completed jobs. Strong portfolio images improve customer trust.
              Good categories include shopfront signs, vehicle branding, lightboxes, 3D signs, billboards, banners,
              reception signs, and before/after photos.
            </span>
            <textarea
              name="portfolioUrls"
              rows={4}
              className="input"
              placeholder="Add one image URL per line, or separate URLs with commas."
            />
          </label>

          <fieldset className="field">
            <legend className="label">Package selected</legend>
            <div className="grid gap-3 sm:grid-cols-3">
              {packageOptions.map((option) => (
                <label key={option.value} className="checkbox-card">
                  <input
                    type="radio"
                    name="packageType"
                    value={option.value}
                    defaultChecked={option.value === "FREE"}
                    className="mt-1 h-4 w-4 border-white/20 bg-black text-amberglow focus:ring-amberglow"
                  />
                  <span>
                    <span className="block font-semibold text-white">{option.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-zinc-400">{option.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="primary-button mt-2 w-full sm:w-fit">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            Submit Listing
          </button>
        </form>
      </section>

      <section className="lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Why list on Sign Zim?</p>
            <h2 className="mt-4 text-2xl font-black text-white">Put your signage work where buyers are searching.</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Sign Zim helps signage companies appear on service pages, city pages, and marketplace listings where
              customers can compare providers before sending a quote request.
            </p>
            <Link href="#submit-listing" className="primary-button mt-6 w-fit">
              Submit Listing
            </Link>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">What your listing can include</p>
            <div className="mt-5 grid gap-3">
              {listingIncludes.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amberglow" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="lg:col-span-2">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Package comparison</p>
          <h2 className="mt-3 text-2xl font-black text-white">Choose the visibility level that matches your business.</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {packageComparison.map((item) => (
            <div key={item.name} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
              <h3 className="text-xl font-black text-white">{item.name}</h3>
              <p className="mt-2 text-sm font-semibold text-honey">{item.price}</p>
              <div className="mt-5 grid gap-3">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amberglow" aria-hidden="true" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="lg:col-span-2">
        <TrustBadgeExplainer />
      </section>

      <section className="lg:col-span-2">
        <div className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">How approval works</p>
          <h2 className="mt-3 text-2xl font-black text-white">Submitted companies are reviewed before going public.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-300">
            Sign Zim reviews listing details, service fit, and contact information before approving public profiles.
            Verified and featured placement can then be applied from the owner dashboard.
          </p>
          <Link href="#submit-listing" className="primary-button mt-6 w-fit">
            Submit Listing
          </Link>
        </div>
      </section>
    </div>
  );
}
