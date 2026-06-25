import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Eye, MessageCircle, ShieldCheck, Star } from "lucide-react";
import { FaqSection, providerFaqs } from "@/components/faq-section";
import { TrustBadgeExplainer } from "@/components/trust-badge-explainer";

export const metadata: Metadata = {
  title: "For Providers in Zimbabwe | Sign Zim",
  description:
    "Get discovered by Zimbabwean customers looking for signage, interior deco, branding, shop fitting, office fitting, displays and branded spaces."
};

const listingIncludes = [
  "Company profile with city, services, and contact person",
  "WhatsApp, email, website, and Facebook contact links",
  "Portfolio gallery for shopfront signs, vehicle branding, interiors, counters, shelves, displays, partitions, and wall branding",
  "Visibility across company, service, and city marketplace pages"
];

const providerTypes = [
  "Signage companies",
  "Print shops",
  "Vehicle branding teams",
  "Billboard suppliers",
  "Lightbox fabricators",
  "Vinyl installers",
  "Branding studios",
  "Event branding suppliers",
  "Interior deco providers",
  "Shop fitting teams",
  "Office fitting providers",
  "Retail display suppliers",
  "Counter and shelving fabricators",
  "Partition installers"
];

const packages = [
  {
    name: "Free Listing",
    icon: CheckCircle2,
    copy: "Company profile, services listed, contact details, portfolio gallery, and placement on relevant service or city pages.",
    price: "Coming soon"
  },
  {
    name: "Verified Listing",
    icon: ShieldCheck,
    copy: "Everything in Free plus a Verified Provider badge, stronger trust positioning, better listing-page credibility, and admin-reviewed business/contact details.",
    price: "Contact Sign Zim"
  },
  {
    name: "Featured Listing",
    icon: Star,
    copy: "Everything in Verified plus Featured Provider badge, priority placement on homepage, directory, and service pages, higher visibility, stronger CTAs, and better chance of quote requests.",
    price: "Contact Sign Zim"
  }
];

export default function ForSignageCompaniesPage() {
  return (
    <div>
      <section className="border-b border-white/10 bg-white/[0.025]">
        <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">For providers</p>
            <h1 className="mt-4 max-w-4xl text-5xl font-black leading-tight text-white">
              Get discovered by customers looking for signage, interiors and fitting in Zimbabwe.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-300">
              Sign Zim gives providers a marketplace profile customers can inspect before they request shopfront signs,
              vehicle branding, lightboxes, branded interiors, shop fitting, office fitting, displays, counters and
              installation work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/list-your-company#submit-listing" className="primary-button">
                List Your Company
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/companies" className="secondary-button">
                View Marketplace
              </Link>
            </div>
          </div>
          <div className="panel rounded-lg p-6">
            <Eye className="h-7 w-7 text-amberglow" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-black text-white">Built to prove visibility.</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Admin metrics track profile views and WhatsApp clicks so Sign Zim can show early evidence of customer
              attention for listed providers.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Who should list on Sign Zim?</p>
            <h2 className="mt-4 text-2xl font-black text-white">If customers hire you for visibility or branded spaces, you belong here.</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              You do not need your own website to start. A Sign Zim listing can give customers one public profile with
              your services, city, WhatsApp number, contact person, and portfolio links while your own site is still
              coming later.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {providerTypes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 text-sm font-semibold text-zinc-200">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amberglow" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">What your listing includes</p>
            <div className="mt-5 grid gap-3">
              {listingIncludes.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-300">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-amberglow" aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Why Sign Zim exists</p>
            <h2 className="mt-4 text-2xl font-black text-white">Customers need faster shortlists.</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              SMEs, pharmacies, restaurants, lodges, schools, churches, salons, clinics and growing businesses often
              need signage, branded interiors, counters, shelving, partitions or displays quickly. Sign Zim helps them
              compare providers by service, location, portfolio, and trust signals.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell pb-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
                <Icon className="h-6 w-6 text-amberglow" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-black text-white">{item.name}</h2>
                <p className="mt-2 text-sm font-semibold text-honey">{item.price}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="page-shell pb-12">
        <TrustBadgeExplainer />
      </section>

      <section className="page-shell pb-12">
        <div className="rounded-lg border border-amberglow/30 bg-amberglow/10 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">How approval works</p>
          <h2 className="mt-3 text-2xl font-black text-white">Submit once. Sign Zim reviews before publishing.</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-300">
            The owner reviews your business details, contacts, service categories, and portfolio links. Approved
            listings go public, and verified or featured placement can be applied from admin.
          </p>
          <Link href="/list-your-company#submit-listing" className="primary-button mt-6 w-fit">
            Submit Listing
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="page-shell pb-12">
        <FaqSection eyebrow="Provider FAQ" title="Questions from providers" items={providerFaqs} />
      </section>
    </div>
  );
}
