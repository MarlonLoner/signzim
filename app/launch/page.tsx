import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Lightbulb,
  MessageCircle,
  Search,
  Sparkles,
  Store,
  Users
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Launch SignZim, Interior Deco & Fittings | Find Providers in Zimbabwe",
  description:
    "SignZim helps Zimbabwean businesses find signage, branding, interior deco and fitting providers, compare portfolios and request quotes."
};

const customerSegments = [
  {
    name: "Pharmacies",
    copy: "Build a clean, trusted retail environment with practical visibility and fit-out support.",
    services: ["Lightboxes", "Counters", "Shelving", "Wall branding", "Directional signs"]
  },
  {
    name: "Restaurants",
    copy: "Make the shopfront visible and the inside memorable for walk-ins, diners and delivery customers.",
    services: ["Shopfront signs", "Interior ambience", "Wall finishes", "Menus/display boards", "Lighting"]
  },
  {
    name: "Salons & beauty businesses",
    copy: "Shape a polished customer experience from first impression to reception and treatment areas.",
    services: ["Interior deco", "Wall branding", "Reception counters", "Mirrors/display areas", "Signage"]
  },
  {
    name: "Lodges & hospitality",
    copy: "Help guests navigate, feel welcomed and remember the brand across the whole property.",
    services: ["Directional signs", "Reception branding", "Room signs", "Ambience lighting", "Display boards"]
  },
  {
    name: "Schools & churches",
    copy: "Improve wayfinding, communication and presentation for busy community spaces.",
    services: ["Directional signs", "Notice boards", "Safety signs", "Wall branding", "Event displays"]
  },
  {
    name: "Offices & retail shops",
    copy: "Create functional branded spaces for staff, customers, displays and front desks.",
    services: ["Office fitting", "Partitions", "Reception signs", "Retail displays", "Custom counters"]
  }
];

const customerRequests = [
  "Shopfront signage, 3D signs, lightboxes and LED signs",
  "Vehicle branding, vinyl printing, window frosting and wall graphics",
  "Interior deco, wall finishes, reception branding and ambience lighting",
  "Shop fitting, office fitting, counters, shelving and partitions",
  "Display stands, exhibition stands, POP displays and event branding"
];

const providerTypes = [
  "Signage companies",
  "Interior deco providers",
  "Shop and office fitting teams",
  "Print, branding and vinyl suppliers",
  "Retail display and event branding providers"
];

export default function LaunchPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url("/images/sign-zim-hero.png")' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/45" aria-hidden="true" />
        <div className="page-shell relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amberglow/40 bg-amberglow/10 px-4 py-2 text-sm font-semibold text-honey">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Launching for Zimbabwean businesses and providers
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              From the sign outside to the customer experience inside.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              SignZim, Interior Deco & Fittings helps businesses find trusted providers, view real work and request quotes for signage, kitchens, partitions, aluminium works, exhibition booths, commercial interiors and fittings.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/request-quote" className="primary-button">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Request a Quote
              </Link>
              <Link href="/list-your-company" className="secondary-button">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                Join as a Founding Provider
              </Link>
              <Link href="/companies" className="secondary-button">
                <Search className="h-4 w-4" aria-hidden="true" />
                Browse Companies
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            {
              icon: Store,
              title: "What Sign Zim is",
              copy: "A Zimbabwe-focused marketplace for signage, branding, interior deco, shop fitting, office fitting, displays, counters, shelving, partitions and branded commercial spaces."
            },
            {
              icon: Users,
              title: "Who it helps",
              copy: "Business owners can find suitable providers faster, while providers get a focused place to present their services, portfolios and contact details."
            },
            {
              icon: ClipboardCheck,
              title: "How requests work",
              copy: "Customers submit one clear quote request with city, service, budget, timeline and project details so Sign Zim can help route the lead."
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
                <Icon className="h-6 w-6 text-amberglow" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-black text-white">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.copy}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] py-16">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Customer segments"
            title="Launch use cases for real Zimbabwean businesses."
            copy="Sign Zim is built for the practical combinations businesses often need: visibility, branded interiors, customer flow, fixtures and finishing details."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {customerSegments.map((segment) => (
              <article key={segment.name} className="rounded-lg border border-white/10 bg-white/[0.045] p-6">
                <h3 className="text-xl font-black text-white">{segment.name}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{segment.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {segment.services.map((service) => (
                    <span key={service} className="rounded-full bg-amberglow/10 px-3 py-1 text-xs font-semibold text-honey">
                      {service}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="For customers"
              title="What customers can request"
              copy="Whether the project starts with a sign, a reception counter, a display stand, or a full shop refresh, Sign Zim helps turn the need into a clear provider shortlist."
            />
            <div className="mt-8 grid gap-3">
              {customerRequests.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-white/10 bg-black/25 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
                  <p className="text-sm leading-6 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="For providers"
              title="Who should list early"
              copy="Early providers can claim a stronger first impression while the marketplace is being introduced to customers, operators and referral partners."
            />
            <div className="mt-8 grid gap-3">
              {providerTypes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-md border border-white/10 bg-black/25 p-4">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-amberglow" aria-hidden="true" />
                  <p className="text-sm leading-6 text-zinc-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-amberglow/10 py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Why join early</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black text-white sm:text-4xl">
              Early listings shape the first provider shortlist customers see.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-300">
              Providers that join during launch can build a profile, show core services, add portfolio links, test customer follow-up, and prepare for featured or verified placement before the directory gets noisier.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/25 p-6">
            <Lightbulb className="h-6 w-6 text-amberglow" aria-hidden="true" />
            <h3 className="mt-5 text-2xl font-black text-white">Commercial, not generic.</h3>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Sign Zim focuses on the providers that help businesses look visible, credible and ready for customers across Zimbabwe.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.045] p-6 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-black text-white">Ready for launch conversations?</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Customers can request quotes now. Providers can submit listings for admin review.
            </p>
          </div>
          <Link href="/request-quote" className="primary-button">
            Request a Quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/list-your-company" className="secondary-button">
            Join as a Founding Provider
          </Link>
          <Link href="/companies" className="secondary-button">
            Browse Companies
          </Link>
        </div>
      </section>
    </div>
  );
}

