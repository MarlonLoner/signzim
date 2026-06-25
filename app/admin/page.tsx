import type { Metadata } from "next";
import {
  Archive,
  BarChart3,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  Edit3,
  Eye,
  Images,
  KeyRound,
  Link as LinkIcon,
  LogOut,
  MessageCircle,
  Send,
  Star,
  StickyNote,
  TriangleAlert,
  XCircle
} from "lucide-react";
import { Badge } from "@/components/badge";
import { CopyButton } from "@/components/copy-button";
import {
  logoutAdmin,
  toggleCompanyFlag,
  updateCompanyNotes,
  updateCompanyDetails,
  updateCompanyPayment,
  updateCompanyStatus,
  updateLeadNotes,
  updateLeadStatus,
  unlockAdmin
} from "@/lib/actions";
import { hasAdminAccess, isAdminKeyConfigured } from "@/lib/admin-auth";
import { appConfig, getServerConfigStatus } from "@/lib/config";
import { cities, companyStatuses, leadStatuses, packageOptions, paymentStatuses, serviceCatalog } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import type { CompanyWithServices } from "@/lib/types";
import { formatDate, leadWhatsAppMessage } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign Zim Admin",
  description: "Manage Sign Zim company submissions, trust badges, featured listings, and customer signage quote leads."
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function paramValue(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

async function getAdminData() {
  try {
    const [pendingCompanies, approvedCompanies, archivedCompanies, leads] = await prisma.$transaction([
      prisma.company.findMany({
        where: { status: "PENDING" },
        include: { services: { include: { service: true } }, portfolio: true },
        orderBy: { createdAt: "desc" }
      }),
      prisma.company.findMany({
        where: { status: "APPROVED" },
        include: { services: { include: { service: true } }, portfolio: true },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }]
      }),
      prisma.company.findMany({
        where: { status: { in: ["REJECTED", "ARCHIVED"] } },
        include: { services: { include: { service: true } }, portfolio: true },
        orderBy: { updatedAt: "desc" }
      }),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 50
      })
    ]);

    return {
      pendingCompanies,
      approvedCompanies,
      archivedCompanies,
      leads,
      error: false
    };
  } catch (error) {
    console.error("Unable to load admin dashboard", error);
    return {
      pendingCompanies: [],
      approvedCompanies: [],
      archivedCompanies: [],
      leads: [],
      error: true
    };
  }
}

function statusTone(status: string) {
  if (status === "APPROVED" || status === "CLOSED") return "green";
  if (status === "PENDING" || status === "NEW") return "amber";
  if (status === "REJECTED" || status === "LOST") return "red";
  if (status === "CONTACTED" || status === "SENT_TO_COMPANIES") return "blue";
  return "muted";
}

function paymentTone(status: string) {
  if (status === "PAID") return "green";
  if (status === "PENDING_PAYMENT") return "amber";
  if (status === "EXPIRED") return "red";
  return "muted";
}

function dateInputValue(value: Date | null) {
  if (!value) {
    return "";
  }

  return value.toISOString().slice(0, 10);
}

function AdminSetupWarning() {
  return (
    <div className="page-shell py-12">
      <div className="panel max-w-3xl rounded-lg p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-amberglow text-black">
            <KeyRound className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Admin setup required</p>
            <h1 className="mt-3 text-3xl font-black text-white">Set `SIGN_ZIM_ADMIN_KEY` before using admin.</h1>
            <p className="mt-4 text-sm leading-6 text-zinc-300">
              Add an admin key to your environment, restart the app, then return to this page. This keeps the owner
              dashboard private without adding full authentication yet.
            </p>
            <div className="mt-5 rounded-md border border-white/10 bg-black/40 p-4 font-mono text-sm text-zinc-200">
              SIGN_ZIM_ADMIN_KEY=&quot;change-this-admin-key&quot;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminLogin({ error }: { error: string }) {
  return (
    <div className="page-shell flex min-h-[calc(100vh-4rem)] items-center py-12">
      <section className="panel w-full max-w-xl rounded-lg p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-amberglow text-black">
            <KeyRound className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Protected admin</p>
            <h1 className="mt-3 text-3xl font-black text-white">Enter the Sign Zim admin key.</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Access is stored in a secure cookie for this browser session.
            </p>
          </div>
        </div>

        {error === "admin-key" || error === "auth" ? (
          <div className="mt-6 rounded-md border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
            <TriangleAlert className="mr-2 inline h-4 w-4" aria-hidden="true" />
            Enter the configured admin key to continue.
          </div>
        ) : null}

        <form action={unlockAdmin} className="mt-6 grid gap-4">
          <label className="field">
            <span className="label">Admin key</span>
            <input name="adminKey" type="password" required className="input" placeholder="Enter admin key" />
          </label>
          <button type="submit" className="primary-button w-fit">
            <KeyRound className="h-4 w-4" aria-hidden="true" />
            Unlock Admin
          </button>
        </form>
      </section>
    </div>
  );
}

function CompanyStatusButtons({ company }: { company: CompanyWithServices }) {
  return (
    <div className="flex flex-wrap gap-2">
      {companyStatuses.map((status) => (
        <form key={status} action={updateCompanyStatus}>
          <input type="hidden" name="companyId" value={company.id} />
          <input type="hidden" name="status" value={status} />
          <button
            type="submit"
            className={company.status === status ? "primary-button px-3 py-2" : "secondary-button px-3 py-2"}
          >
            {status === "APPROVED" ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : null}
            {status === "REJECTED" ? <XCircle className="h-4 w-4" aria-hidden="true" /> : null}
            {status === "ARCHIVED" ? <Archive className="h-4 w-4" aria-hidden="true" /> : null}
            {status === "PENDING" ? <Clock className="h-4 w-4" aria-hidden="true" /> : null}
            {status}
          </button>
        </form>
      ))}
    </div>
  );
}

function CompanyFlagButtons({ company }: { company: CompanyWithServices }) {
  return (
    <div className="flex flex-wrap gap-2">
      <form action={toggleCompanyFlag}>
        <input type="hidden" name="companyId" value={company.id} />
        <input type="hidden" name="flag" value="isVerified" />
        <button type="submit" className={company.isVerified ? "primary-button px-3 py-2" : "secondary-button px-3 py-2"}>
          <BadgeCheck className="h-4 w-4" aria-hidden="true" />
          {company.isVerified ? "Verified" : "Mark Verified"}
        </button>
      </form>
      <form action={toggleCompanyFlag}>
        <input type="hidden" name="companyId" value={company.id} />
        <input type="hidden" name="flag" value="isFeatured" />
        <button type="submit" className={company.isFeatured ? "primary-button px-3 py-2" : "secondary-button px-3 py-2"}>
          <Star className="h-4 w-4" aria-hidden="true" />
          {company.isFeatured ? "Featured" : "Mark Featured"}
        </button>
      </form>
    </div>
  );
}

function CompanyPaymentControls({ company }: { company: CompanyWithServices }) {
  return (
    <details className="rounded-lg border border-white/10 bg-black/25 p-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-honey">
        <CreditCard className="h-4 w-4" aria-hidden="true" />
        Payment readiness
      </summary>
      <div className="mt-4 flex flex-wrap gap-2">
        {["PENDING_PAYMENT", "PAID"].map((status) => (
          <form key={status} action={updateCompanyPayment}>
            <input type="hidden" name="companyId" value={company.id} />
            <input type="hidden" name="paymentStatus" value={status} />
            <input type="hidden" name="paymentReference" value={company.paymentReference ?? ""} />
            <input type="hidden" name="paidUntil" value={dateInputValue(company.paidUntil)} />
            <button type="submit" className="secondary-button px-3 py-2">
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              {status === "PAID" ? "Mark Paid" : "Mark Payment Pending"}
            </button>
          </form>
        ))}
      </div>
      <form action={updateCompanyPayment} className="mt-5 grid gap-4 md:grid-cols-3">
        <input type="hidden" name="companyId" value={company.id} />
        <label className="field">
          <span className="label">Payment status</span>
          <select name="paymentStatus" defaultValue={company.paymentStatus} className="input">
            {paymentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="label">Payment reference</span>
          <input name="paymentReference" className="input" defaultValue={company.paymentReference ?? ""} placeholder="EcoCash, invoice, receipt" />
        </label>
        <label className="field">
          <span className="label">Paid until</span>
          <input name="paidUntil" type="date" className="input" defaultValue={dateInputValue(company.paidUntil)} />
        </label>
        <button type="submit" className="primary-button w-fit md:col-span-3">
          <CreditCard className="h-4 w-4" aria-hidden="true" />
          Save Payment
        </button>
      </form>
    </details>
  );
}

function CompanyNotesForm({ company }: { company: CompanyWithServices }) {
  return (
    <details className="rounded-lg border border-white/10 bg-black/25 p-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-honey">
        <StickyNote className="h-4 w-4" aria-hidden="true" />
        Admin notes
      </summary>
      <form action={updateCompanyNotes} className="mt-5 grid gap-4">
        <input type="hidden" name="companyId" value={company.id} />
        <textarea
          name="adminNotes"
          rows={4}
          className="input"
          defaultValue={company.adminNotes ?? ""}
          placeholder="Called owner, wants featured after launch. Needs better portfolio images. Payment received via EcoCash."
        />
        <button type="submit" className="primary-button w-fit">
          <StickyNote className="h-4 w-4" aria-hidden="true" />
          Save Notes
        </button>
      </form>
    </details>
  );
}

function CompanyEditor({ company }: { company: CompanyWithServices }) {
  const serviceSlugs = new Set(company.services.map((item) => item.service.slug));

  return (
    <details className="rounded-lg border border-white/10 bg-black/25 p-4">
      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-honey">
        <Edit3 className="h-4 w-4" aria-hidden="true" />
        Edit details
      </summary>
      <form action={updateCompanyDetails} className="mt-5 grid gap-4">
        <input type="hidden" name="companyId" value={company.id} />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="field">
            <span className="label">Company name</span>
            <input name="name" required className="input" defaultValue={company.name} />
          </label>
          <label className="field">
            <span className="label">Contact person</span>
            <input name="contactPerson" required className="input" defaultValue={company.contactPerson} />
          </label>
          <label className="field">
            <span className="label">WhatsApp</span>
            <input name="whatsapp" required className="input" defaultValue={company.whatsapp} />
          </label>
          <label className="field">
            <span className="label">Email</span>
            <input name="email" type="email" required className="input" defaultValue={company.email} />
          </label>
          <label className="field">
            <span className="label">City</span>
            <select name="city" required className="input" defaultValue={company.city}>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span className="label">Package</span>
            <select name="packageType" required className="input" defaultValue={company.packageType}>
              {packageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="field md:col-span-2">
            <span className="label">Address optional</span>
            <input name="address" className="input" defaultValue={company.address ?? ""} />
          </label>
          <label className="field">
            <span className="label">Website optional</span>
            <input name="website" className="input" defaultValue={company.website ?? ""} />
          </label>
          <label className="field">
            <span className="label">Facebook optional</span>
            <input name="facebookUrl" className="input" defaultValue={company.facebookUrl ?? ""} />
          </label>
          <label className="field">
            <span className="label">Logo URL optional</span>
            <input name="logoUrl" className="input" defaultValue={company.logoUrl ?? ""} />
          </label>
          <label className="field">
            <span className="label">Cover image URL optional</span>
            <input name="coverImageUrl" className="input" defaultValue={company.coverImageUrl ?? ""} />
          </label>
        </div>

        <label className="field">
          <span className="label">Business description</span>
          <textarea name="description" rows={4} required className="input" defaultValue={company.description} />
        </label>

        <fieldset className="field">
          <legend className="label">Services</legend>
          <div className="grid gap-2 md:grid-cols-2">
            {serviceCatalog.map((service) => (
              <label key={service.slug} className="checkbox-card">
                <input
                  type="checkbox"
                  name="services"
                  value={service.slug}
                  defaultChecked={serviceSlugs.has(service.slug)}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-black text-amberglow focus:ring-amberglow"
                />
                <span className="font-semibold text-white">{service.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="primary-button w-fit">
          <Edit3 className="h-4 w-4" aria-hidden="true" />
          Save Details
        </button>
      </form>
    </details>
  );
}

function AdminCompanyCard({ company }: { company: CompanyWithServices }) {
  return (
    <article className="panel rounded-lg p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-black text-white">{company.name}</h3>
            <Badge tone={statusTone(company.status)}>{company.status}</Badge>
            <Badge tone={paymentTone(company.paymentStatus)}>{company.paymentStatus}</Badge>
            {company.isVerified ? <Badge tone="green">Verified</Badge> : null}
            {company.isFeatured ? <Badge tone="amber">Featured</Badge> : null}
          </div>
          <p className="mt-2 text-sm text-zinc-400">
            {company.city} - {company.packageType} - submitted {formatDate(company.createdAt)}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">{company.description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
            <span className="rounded-full bg-white/5 px-3 py-1">Contact: {company.contactPerson}</span>
            <span className="rounded-full bg-white/5 px-3 py-1">WhatsApp: {company.whatsapp}</span>
            <span className="rounded-full bg-white/5 px-3 py-1">Email: {company.email}</span>
            {company.paymentReference ? (
              <span className="rounded-full bg-white/5 px-3 py-1">Payment ref: {company.paymentReference}</span>
            ) : null}
            {company.paidUntil ? (
              <span className="rounded-full bg-white/5 px-3 py-1">Paid until: {formatDate(company.paidUntil)}</span>
            ) : null}
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <CompanyFlagButtons company={company} />
          <CompanyStatusButtons company={company} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {company.services.map((item) => (
          <span key={item.id} className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
            {item.service.name}
          </span>
        ))}
      </div>
      {company.packageType === "FEATURED" ? (
        <div className="mt-5 rounded-md border border-amberglow/40 bg-amberglow/10 p-4 text-sm leading-6 text-honey">
          <TriangleAlert className="mr-2 inline h-4 w-4" aria-hidden="true" />
          This company selected Featured. Confirm payment or manual approval before featuring publicly.
        </div>
      ) : null}
      {company.portfolio.length ? (
        <details className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-honey">
            <Images className="h-4 w-4" aria-hidden="true" />
            Portfolio images
          </summary>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {company.portfolio.map((image) => (
              <figure key={image.id} className="overflow-hidden rounded-md border border-white/10 bg-black/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.imageUrl} alt={image.caption ?? `${company.name} portfolio`} className="h-32 w-full object-cover" />
                {image.caption ? <figcaption className="px-3 py-2 text-xs text-zinc-400">{image.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </details>
      ) : null}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-black/25 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amberglow">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Profile views
          </p>
          <p className="mt-2 text-2xl font-black text-white">{company.profileViewCount}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/25 px-4 py-3">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amberglow">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            WhatsApp clicks
          </p>
          <p className="mt-2 text-2xl font-black text-white">{company.whatsappClickCount}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-4">
        <CompanyPaymentControls company={company} />
        <CompanyNotesForm company={company} />
        <CompanyEditor company={company} />
      </div>
    </article>
  );
}

function OutreachCopySection({ companies }: { companies: CompanyWithServices[] }) {
  const listUrl = `${appConfig.appUrl}/list-your-company`;
  const providerUrl = `${appConfig.appUrl}/for-signage-companies`;
  const claimUrlFormat = `${appConfig.appUrl}/list-your-company?claim=company-slug`;
  const copyCards = [
    {
      title: "Invite a signage company to list",
      text: `Hi [Company Name], we're building Sign Zim, a Zimbabwean marketplace where customers can find signage companies, view portfolios, and request quotes. You can submit your company listing here: ${listUrl}`
    },
    {
      title: "Pitch a verified listing",
      text: `Hi [Company Name], Sign Zim verified listings are designed to help customers trust your provider profile before they contact you. A verified profile can show reviewed business details, services, contact channels, and portfolio links. Learn more here: ${providerUrl}`
    },
    {
      title: "Pitch a featured listing",
      text: `Hi [Company Name], Sign Zim featured listings receive higher visibility on marketplace pages, helping your signage work appear ahead of standard listings. Featured placement is built for providers who want more customer attention and quote requests. Learn more here: ${providerUrl}`
    },
    {
      title: "Follow up after a company submits",
      text: "Hi [Company Name], thanks for submitting your Sign Zim listing. We are reviewing your services, contact details, and portfolio information. Once approved, your profile can appear on Sign Zim for customers looking for signage providers in Zimbabwe."
    },
    {
      title: "Claim listing URL format",
      text: claimUrlFormat
    }
  ];

  return (
    <section className="mt-12">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Sales launch kit</p>
          <h2 className="mt-3 text-2xl font-black text-white">Outreach Copy</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Quick copy blocks for recruiting providers and explaining verified or featured listing value.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="panel rounded-lg p-5 lg:col-span-2">
          <h3 className="flex items-center gap-2 text-lg font-black text-white">
            <LinkIcon className="h-4 w-4 text-amberglow" aria-hidden="true" />
            Provider invite URLs
          </h3>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            {[
              ["List your company URL", listUrl],
              ["Featured listing pitch URL", providerUrl],
              ["Claim listing URL format", claimUrlFormat]
            ].map(([label, url]) => (
              <div key={label} className="rounded-md border border-white/10 bg-black/25 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-honey">{label}</p>
                <p className="mt-2 break-all text-sm leading-6 text-zinc-300">{url}</p>
                <div className="mt-3">
                  <CopyButton text={url} label="Copy URL" />
                </div>
              </div>
            ))}
          </div>
          {companies.length ? (
            <div className="mt-5">
              <p className="text-sm font-bold text-white">Claim links for approved companies</p>
              <div className="mt-3 grid gap-3 lg:grid-cols-2">
                {companies.slice(0, 6).map((company) => {
                  const claimUrl = `${appConfig.appUrl}/list-your-company?claim=${company.slug}`;
                  return (
                    <div key={company.id} className="rounded-md border border-white/10 bg-black/25 p-4">
                      <p className="text-sm font-semibold text-white">{company.name}</p>
                      <p className="mt-2 break-all text-xs leading-5 text-zinc-400">{claimUrl}</p>
                      <div className="mt-3">
                        <CopyButton text={claimUrl} label="Copy Claim Link" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
        {copyCards.map((card) => (
          <div key={card.title} className="panel rounded-lg p-5">
            <h3 className="text-lg font-black text-white">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{card.text}</p>
            <div className="mt-4">
              <CopyButton text={card.text} label="Copy Outreach" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function LaunchSnapshotSection({
  approvedCompanies,
  pendingCompanies,
  featuredCompanies,
  verifiedCompanies,
  leads,
  newLeads,
  totalProfileViews,
  totalWhatsappClicks,
  topByWhatsapp,
  topByViews
}: {
  approvedCompanies: CompanyWithServices[];
  pendingCompanies: CompanyWithServices[];
  featuredCompanies: CompanyWithServices[];
  verifiedCompanies: CompanyWithServices[];
  leads: Awaited<ReturnType<typeof getAdminData>>["leads"];
  newLeads: Awaited<ReturnType<typeof getAdminData>>["leads"];
  totalProfileViews: number;
  totalWhatsappClicks: number;
  topByWhatsapp?: CompanyWithServices;
  topByViews?: CompanyWithServices;
}) {
  const snapshot = [
    ["Total approved companies", approvedCompanies.length],
    ["Pending companies", pendingCompanies.length],
    ["Featured companies", featuredCompanies.length],
    ["Verified companies", verifiedCompanies.length],
    ["Total quote requests", leads.length],
    ["New quote requests", newLeads.length],
    ["Total profile views", totalProfileViews],
    ["Total WhatsApp clicks", totalWhatsappClicks]
  ];

  return (
    <section className="mt-12 rounded-lg border border-amberglow/30 bg-amberglow/10 p-6">
      <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-amberglow">
        <BarChart3 className="h-4 w-4" aria-hidden="true" />
        Launch Snapshot
      </p>
      <h2 className="mt-3 text-2xl font-black text-white">Early marketplace traction.</h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {snapshot.map(([label, value]) => (
          <div key={label} className="rounded-md border border-white/10 bg-black/25 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-honey">{label}</p>
            <p className="mt-2 text-2xl font-black text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-honey">Top company by WhatsApp clicks</p>
          <p className="mt-2 text-lg font-black text-white">{topByWhatsapp?.name ?? "No clicks yet"}</p>
          <p className="mt-1 text-sm text-zinc-400">{topByWhatsapp ? `${topByWhatsapp.whatsappClickCount} clicks` : "Start routing provider clicks through Sign Zim."}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-honey">Top company by profile views</p>
          <p className="mt-2 text-lg font-black text-white">{topByViews?.name ?? "No views yet"}</p>
          <p className="mt-1 text-sm text-zinc-400">{topByViews ? `${topByViews.profileViewCount} views` : "Publish and share provider profiles to generate views."}</p>
        </div>
      </div>
    </section>
  );
}

function AppStatusSection({
  databaseConnected,
  checkedAt,
  configStatus
}: {
  databaseConnected: boolean;
  checkedAt: Date;
  configStatus: ReturnType<typeof getServerConfigStatus>;
}) {
  const items = [
    ["Environment", appConfig.environment, true],
    ["App URL configured", configStatus.appUrlConfigured ? "Configured" : "Missing", configStatus.appUrlConfigured],
    [
      "Admin WhatsApp configured",
      configStatus.adminWhatsAppConfigured ? "Configured" : "Missing",
      configStatus.adminWhatsAppConfigured
    ],
    ["Database", databaseConnected ? "Connected" : "Unavailable", databaseConnected]
  ] as const;

  return (
    <section className="mt-12 rounded-lg border border-white/10 bg-white/[0.045] p-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">System status</p>
          <h2 className="mt-3 text-2xl font-black text-white">Database and app readiness.</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Safe deployment signals for owner review. Private environment values are not shown.
          </p>
        </div>
        <p className="text-xs font-semibold text-zinc-500">Last checked {checkedAt.toISOString()}</p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([label, value, ok]) => (
          <div key={label} className="rounded-md border border-white/10 bg-black/25 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-honey">{label}</p>
            <p className="mt-2 flex items-center gap-2 text-sm font-bold text-white">
              {ok ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              ) : (
                <TriangleAlert className="h-4 w-4 text-amberglow" aria-hidden="true" />
              )}
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

type LaunchChecklistItem = {
  label: string;
  complete: boolean;
  note: string;
};

function LaunchChecklistSection({ items }: { items: LaunchChecklistItem[] }) {
  const completeCount = items.filter((item) => item.complete).length;

  return (
    <section className="mt-12 rounded-lg border border-white/10 bg-white/[0.045] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Launch readiness</p>
          <h2 className="mt-3 text-2xl font-black text-white">Admin Launch Checklist</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Owner-facing checks for public launch, provider recruitment, and first lead routing.
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/25 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-honey">Completed</p>
          <p className="mt-1 text-2xl font-black text-white">
            {completeCount}/{items.length}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3 rounded-md border border-white/10 bg-black/25 p-4">
            {item.complete ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
            ) : (
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-amberglow" aria-hidden="true" />
            )}
            <div>
              <p className="text-sm font-bold text-white">{item.label}</p>
              <p className="mt-1 text-xs leading-5 text-zinc-400">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const updated = paramValue(params, "updated");
  const hasError = Boolean(paramValue(params, "error"));

  if (!isAdminKeyConfigured()) {
    return <AdminSetupWarning />;
  }

  if (!(await hasAdminAccess())) {
    return <AdminLogin error={paramValue(params, "error")} />;
  }

  const { pendingCompanies, approvedCompanies, archivedCompanies, leads, error } = await getAdminData();
  const allCompanies = [...pendingCompanies, ...approvedCompanies, ...archivedCompanies];
  const featuredCompanies = approvedCompanies.filter((company) => company.isFeatured);
  const verifiedCompanies = approvedCompanies.filter((company) => company.isVerified);
  const newLeads = leads.filter((lead) => lead.status === "NEW");
  const contactedLeads = leads.filter((lead) => lead.status === "CONTACTED");
  const closedLeads = leads.filter((lead) => lead.status === "CLOSED");
  const totalProfileViews = allCompanies.reduce((total, company) => total + company.profileViewCount, 0);
  const totalWhatsappClicks = allCompanies.reduce((total, company) => total + company.whatsappClickCount, 0);
  const topByWhatsapp = [...allCompanies].sort((a, b) => b.whatsappClickCount - a.whatsappClickCount)[0];
  const topByViews = [...allCompanies].sort((a, b) => b.profileViewCount - a.profileViewCount)[0];
  const configStatus = getServerConfigStatus();
  const checkedAt = new Date();
  const databaseConnected = !error;
  const launchChecklist: LaunchChecklistItem[] = [
    {
      label: "Database URL configured",
      complete: configStatus.databaseUrlConfigured,
      note: configStatus.databaseUrlConfigured ? "DATABASE_URL is present." : "Add DATABASE_URL before deployment."
    },
    {
      label: "Admin key configured",
      complete: configStatus.adminKeyConfigured,
      note: configStatus.adminKeyConfigured ? "SIGN_ZIM_ADMIN_KEY is present." : "Add SIGN_ZIM_ADMIN_KEY before launch."
    },
    {
      label: "Admin WhatsApp configured",
      complete: configStatus.adminWhatsAppConfigured,
      note: configStatus.adminWhatsAppConfigured
        ? "Admin WhatsApp routing is configured."
        : "Add NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP."
    },
    {
      label: "App URL configured",
      complete: configStatus.appUrlConfigured,
      note: `Public URL resolves to ${appConfig.appUrl}.`
    },
    {
      label: "Add at least 5 approved companies",
      complete: approvedCompanies.length >= 5,
      note: `${approvedCompanies.length} approved compan${approvedCompanies.length === 1 ? "y" : "ies"} ready.`
    },
    {
      label: "Add at least 3 verified companies",
      complete: verifiedCompanies.length >= 3,
      note: `${verifiedCompanies.length} verified compan${verifiedCompanies.length === 1 ? "y" : "ies"} ready.`
    },
    {
      label: "Add at least 1 featured company",
      complete: featuredCompanies.length >= 1,
      note: `${featuredCompanies.length} featured compan${featuredCompanies.length === 1 ? "y" : "ies"} ready.`
    },
    {
      label: "Capture at least 1 quote request",
      complete: leads.length > 0,
      note: `${leads.length} quote request${leads.length === 1 ? "" : "s"} found in admin.`
    },
    {
      label: "Sitemap available",
      complete: true,
      note: "/sitemap.xml is generated from app routes."
    },
    {
      label: "Robots available",
      complete: true,
      note: "/robots.txt is generated from app routes."
    },
    {
      label: "Share metadata configured",
      complete: configStatus.appUrlConfigured,
      note: "OG/Twitter metadata uses the public app URL and Sign Zim hero image."
    }
  ];

  const stats = [
    { label: "Pending companies", value: pendingCompanies.length, icon: Clock },
    { label: "Approved companies", value: approvedCompanies.length, icon: Building2 },
    { label: "Featured companies", value: featuredCompanies.length, icon: Star },
    { label: "Verified companies", value: verifiedCompanies.length, icon: BadgeCheck },
    { label: "New leads", value: newLeads.length, icon: MessageCircle },
    { label: "Contacted leads", value: contactedLeads.length, icon: Send },
    { label: "Closed leads", value: closedLeads.length, icon: CheckCircle2 },
    { label: "Profile views", value: totalProfileViews, icon: Eye },
    { label: "WhatsApp clicks", value: totalWhatsappClicks, icon: MessageCircle }
  ];

  return (
    <div className="page-shell py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-amberglow">Owner dashboard</p>
          <h1 className="mt-4 text-5xl font-black text-white">Admin</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-300">
            Approve listings, maintain trust badges, manage featured placements, and move customer leads through the
            pipeline.
          </p>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" className="secondary-button">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Lock Admin
          </button>
        </form>
      </div>

      {updated ? (
        <div className="mt-8 rounded-md border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
          <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
          Dashboard updated.
        </div>
      ) : null}
      {hasError || error ? (
        <div className="mt-8 rounded-md border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-100">
          <TriangleAlert className="mr-2 inline h-4 w-4" aria-hidden="true" />
          {error ? "Admin data is not available. Check the database connection." : "The requested update could not be completed."}
        </div>
      ) : null}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-9">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="panel rounded-lg p-5">
              <Icon className="h-5 w-5 text-amberglow" aria-hidden="true" />
              <p className="mt-4 text-3xl font-black text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <LaunchSnapshotSection
        approvedCompanies={approvedCompanies}
        pendingCompanies={pendingCompanies}
        featuredCompanies={featuredCompanies}
        verifiedCompanies={verifiedCompanies}
        leads={leads}
        newLeads={newLeads}
        totalProfileViews={totalProfileViews}
        totalWhatsappClicks={totalWhatsappClicks}
        topByWhatsapp={topByWhatsapp}
        topByViews={topByViews}
      />

      <AppStatusSection databaseConnected={databaseConnected} checkedAt={checkedAt} configStatus={configStatus} />

      <LaunchChecklistSection items={launchChecklist} />

      <OutreachCopySection companies={approvedCompanies} />

      <section className="mt-12">
        <h2 className="text-2xl font-black text-white">Pending company submissions</h2>
        <div className="mt-5 grid gap-5">
          {pendingCompanies.length ? (
            pendingCompanies.map((company) => <AdminCompanyCard key={company.id} company={company} />)
          ) : (
            <div className="panel rounded-lg p-6 text-sm text-zinc-400">No pending submissions.</div>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-white">Approved companies</h2>
        {archivedCompanies.length ? (
          <p className="mt-2 text-sm text-zinc-400">
            {archivedCompanies.length} rejected or archived listing{archivedCompanies.length === 1 ? "" : "s"} are
            hidden from the public directory.
          </p>
        ) : null}
        <div className="mt-5 grid gap-5">
          {approvedCompanies.length ? (
            approvedCompanies.map((company) => <AdminCompanyCard key={company.id} company={company} />)
          ) : (
            <div className="panel rounded-lg p-6 text-sm text-zinc-400">No approved companies yet.</div>
          )}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black text-white">Quote requests and leads</h2>
        <div className="mt-5 grid gap-5">
          {leads.length ? (
            leads.map((lead) => {
              const leadMessage = leadWhatsAppMessage(lead);
              return (
                <article key={lead.id} className="panel rounded-lg p-5">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-black text-white">{lead.customerName}</h3>
                        <Badge tone={statusTone(lead.status)}>{lead.status}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-zinc-400">
                        {lead.city} - {lead.serviceNeeded} - {formatDate(lead.createdAt)}
                      </p>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">{lead.projectDescription}</p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-300">
                        <span className="rounded-full bg-white/5 px-3 py-1">Budget: {lead.budgetRange}</span>
                        <span className="rounded-full bg-white/5 px-3 py-1">Timeline: {lead.timeline}</span>
                        <span className="rounded-full bg-white/5 px-3 py-1">Phone: {lead.phone}</span>
                        {lead.email ? <span className="rounded-full bg-white/5 px-3 py-1">Email: {lead.email}</span> : null}
                        {lead.leadSource ? <span className="rounded-full bg-white/5 px-3 py-1">Source: {lead.leadSource}</span> : null}
                        {lead.referenceImageUrl ? (
                          <a
                            href={lead.referenceImageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-white/5 px-3 py-1 transition hover:text-white"
                          >
                            Reference image
                          </a>
                        ) : null}
                      </div>
                    </div>
                    <form action={updateLeadStatus} className="flex shrink-0 gap-2">
                      <input type="hidden" name="leadId" value={lead.id} />
                      <select name="status" defaultValue={lead.status} className="input min-w-48">
                        {leadStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button type="submit" className="primary-button px-3">
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Update
                      </button>
                    </form>
                  </div>
                  <div className="mt-5 rounded-lg border border-white/10 bg-black/30 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-amberglow">WhatsApp message</p>
                    <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-6 text-zinc-300">{leadMessage}</pre>
                    <div className="mt-4">
                      <CopyButton text={leadMessage} label="Copy Message" />
                    </div>
                  </div>
                  <details className="mt-5 rounded-lg border border-white/10 bg-black/25 p-4">
                    <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-bold text-honey">
                      <StickyNote className="h-4 w-4" aria-hidden="true" />
                      Lead admin notes
                    </summary>
                    <form action={updateLeadNotes} className="mt-5 grid gap-4">
                      <input type="hidden" name="leadId" value={lead.id} />
                      <textarea
                        name="adminNotes"
                        rows={4}
                        className="input"
                        defaultValue={lead.adminNotes ?? ""}
                        placeholder="Follow up Friday. Customer needs measurements. Routed to two vehicle branding providers."
                      />
                      <button type="submit" className="primary-button w-fit">
                        <StickyNote className="h-4 w-4" aria-hidden="true" />
                        Save Lead Notes
                      </button>
                    </form>
                  </details>
                </article>
              );
            })
          ) : (
            <div className="panel rounded-lg p-6 text-sm text-zinc-400">No quote requests yet.</div>
          )}
        </div>
      </section>
    </div>
  );
}
