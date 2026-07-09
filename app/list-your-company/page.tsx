import type { Metadata } from "next";
import Link from "next/link";
import { Building2, CheckCircle2, ImagePlus, ShieldCheck, TriangleAlert } from "lucide-react";
import { TrustBadgeExplainer } from "@/components/trust-badge-explainer";
import { createCompanySubmission } from "@/lib/actions";
import { appConfig } from "@/lib/config";
import { cities, groupedServiceCatalog, packageOptions } from "@/lib/data";

export const metadata: Metadata = {
  title: "List Your Company | SignZim, Interior Deco & Fittings",
  description:
    "Join SignZim as a founding provider for signage, kitchens, partitions, aluminium works, exhibition booths, interior deco and fittings."
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
    "Portfolio gallery for recent signage, branding, deco, fitting, or display work",
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
        <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">Join SignZim as a Founding Provider</h1>
        <p className="mt-5 text-lg leading-8 text-zinc-300">
          SignZim is opening its marketplace to the first 1,000 signage, interior deco and fitting providers. Approved businesses receive complimentary marketplace access during our three-month launch period.
        </p>
        <Link href="/for-signage-companies" className="secondary-button mt-6 w-fit">
          Provider Sales Page
        </Link>
        <div className="mt-8 grid gap-3">
          {packageOptions.map((option) => (
            <div key={option.value} className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
              <h2 className="text-sm font-black text-white">{option.value === "FREE" ? "Complimentary Launch Access" : option.label}</h2>
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
            <span className="font-semibold text-white">Your SignZim provider profile has been submitted for review.</span>
            <span className="mt-2 block">Our team will check your business details and proof of work before approving the listing.</span>
            <span className="mt-2 block">You are joining during SignZim&apos;s complimentary launch period. Approved providers receive marketplace access at no cost during the first three months.</span>
          </div>
        ) : null}
        {error ? (
          <div className="mb-6 rounded-md border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
            <TriangleAlert className="mr-2 inline h-4 w-4" aria-hidden="true" />
            Check the required fields, WhatsApp number, terms acceptance, and proof images, then try again.
          </div>
        ) : null}
        {claimSlug ? (
          <div className="mb-6 rounded-md border border-amberglow/30 bg-amberglow/10 p-4 text-sm text-honey">
            You are requesting to claim or update an existing Sign Zim listing: <span className="font-bold text-white">{claimSlug}</span>.
            The claim context will be saved privately for admin review.
          </div>
        ) : null}

        <form action={createCompanySubmission} className="grid gap-6" encType="multipart/form-data">
          {claimSlug ? <input type="hidden" name="claimSlug" value={claimSlug} /> : null}

          <section className="rounded-lg border border-white/10 bg-black/20 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amberglow">
              <Building2 className="h-4 w-4" aria-hidden="true" />
              Section 1: Business Details
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="field">
                <span className="label">Company name required</span>
                <input name="name" required minLength={2} className="input" placeholder="Company name" />
              </label>
              <label className="field">
                <span className="label">Contact person required</span>
                <input name="contactPerson" required minLength={2} className="input" placeholder="Primary contact" />
              </label>
              <label className="field">
                <span className="label">Business WhatsApp Number required</span>
                <span className="block text-xs leading-5 text-zinc-400">This is the primary number customers will use to contact your business. Use 0772123456, +263772123456, or 263772123456.</span>
                <input name="whatsapp" required className="input" placeholder="263772123456" inputMode="tel" />
              </label>
              <label className="field">
                <span className="label">Alternative phone number optional</span>
                <input name="alternativePhone" className="input" placeholder="0772123456" inputMode="tel" />
              </label>
              <label className="field">
                <span className="label">Company email optional</span>
                <input name="email" type="email" className="input" placeholder="business@example.com" />
              </label>
              <label className="field">
                <span className="label">City required</span>
                <select name="city" required className="input" defaultValue="">
                  <option value="" disabled>Select city</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </label>
              <label className="field sm:col-span-2">
                <span className="label">Physical business address required</span>
                <span className="block text-xs leading-5 text-zinc-400">Customers may use this information to understand where your business operates. Exact job arrangements remain between you and the customer.</span>
                <input name="address" required minLength={8} className="input" placeholder="12 Kaguvi Street, Harare CBD" />
              </label>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-black/20 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amberglow">
              <ImagePlus className="h-4 w-4" aria-hidden="true" />
              Section 2: Services and Proof
            </p>
            <fieldset className="field mt-5">
              <legend className="label">Services offered required</legend>
              <div className="grid max-h-[34rem] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                {groupedServiceCatalog.map(({ group, services }) => (
                  <div key={group} className="grid gap-3 sm:col-span-2">
                    <h3 className="text-sm font-black text-honey">{group}</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {services.map((service) => (
                        <label key={service.slug} className="checkbox-card">
                          <input type="checkbox" name="services" value={service.slug} className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-amberglow focus:ring-amberglow" />
                          <span>
                            <span className="block font-semibold text-white">{service.name}</span>
                            <span className="mt-1 block text-xs leading-5 text-zinc-400">{service.description}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>
            <label className="field mt-5">
              <span className="label">Short business description required</span>
              <textarea name="description" required minLength={20} rows={5} className="input" placeholder="Describe your signage, kitchens, partitions, aluminium works, interior deco, fitting, print, display or branded space services." />
            </label>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="field">
                <span className="label">Business logo upload optional</span>
                <span className="block text-xs leading-5 text-zinc-400">JPEG, PNG or WebP. Recommended square image. Maximum 5 MB.</span>
                <input name="logoFile" type="file" accept="image/jpeg,image/png,image/webp" className="input file:mr-3 file:rounded-md file:border-0 file:bg-amberglow file:px-3 file:py-2 file:text-sm file:font-bold file:text-black" />
              </label>
              <label className="field">
                <span className="label">Website/Facebook/Instagram link optional</span>
                <input name="website" className="input" placeholder="https://..." />
              </label>
            </div>
            <label className="field mt-5">
              <span className="label">Service/product proof image uploads required</span>
              <span className="block text-xs leading-5 text-zinc-400">Upload 1 to 10 JPEG, PNG or WebP images. Recommended 3 to 8 images. Maximum 5 MB each. Show completed signs, kitchens, partitions, aluminium work, booths, counters, shelves, branded interiors or products.</span>
              <input name="proofImages" type="file" multiple required accept="image/jpeg,image/png,image/webp" className="input file:mr-3 file:rounded-md file:border-0 file:bg-amberglow file:px-3 file:py-2 file:text-sm file:font-bold file:text-black" />
            </label>
            <label className="field mt-5">
              <span className="label">Existing proof image URLs optional</span>
              <textarea name="portfolioUrls" rows={3} className="input" placeholder="Optional backup: add one image URL per line, or separate URLs with commas." />
            </label>
            <input type="hidden" name="packageType" value="FREE" />
          </section>

          <section className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amberglow">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Section 3: Review and Submit
            </p>
            <h2 className="mt-4 text-2xl font-black text-white">Complimentary Launch Access</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Join the first {appConfig.foundingProviderTarget.toLocaleString()} providers. Approved signage, interior deco and fitting businesses receive premium marketplace access at no cost during launch, from 10 July 2026 to 10 October 2026. Subscription plans will be communicated before paid plans begin, and there is no automatic billing after launch.
            </p>
            <div className="mt-5 grid gap-3">
              <label className="checkbox-card">
                <input name="termsAccepted" type="checkbox" required className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-amberglow focus:ring-amberglow" />
                <span className="text-sm leading-6 text-zinc-200">
                  I confirm that the submitted information is accurate and I agree to the SignZim <Link href="/terms" className="text-honey underline">Terms and Conditions</Link> and <Link href="/privacy" className="text-honey underline">Privacy Policy</Link>.
                </span>
              </label>
              <label className="checkbox-card">
                <input name="whatsappMarketingConsent" type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-amberglow focus:ring-amberglow" />
                <span className="text-sm leading-6 text-zinc-200">I agree to receive provider news, launch updates and promotional announcements from SignZim on WhatsApp.</span>
              </label>
            </div>
          </section>
          <button type="submit" className="primary-button mt-2 w-full sm:w-fit">
            <Building2 className="h-4 w-4" aria-hidden="true" />
            Submit Provider Profile
          </button>
        </form>
      </section>

      <section className="lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Why list on Sign Zim?</p>
            <h2 className="mt-4 text-2xl font-black text-white">Put your visible work where buyers are searching.</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Sign Zim helps signage, deco, fitting, print and display providers appear on service pages, city pages,
              and marketplace listings where customers can compare providers before sending a quote request.
            </p>
            <Link href="#submit-listing" className="primary-button mt-6 w-fit">
              Submit Provider Profile
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
            Submit Provider Profile
          </Link>
        </div>
      </section>
    </div>
  );
}

