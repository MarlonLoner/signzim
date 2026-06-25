import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Facebook,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  TriangleAlert
} from "lucide-react";
import { Badge } from "@/components/badge";
import { ShareActions } from "@/components/share-actions";
import { TrustBadgeExplainer } from "@/components/trust-badge-explainer";
import { absoluteUrl } from "@/lib/config";
import { prisma } from "@/lib/prisma";
import { compactList, initials } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const company = await prisma.company
    .findUnique({
      where: { slug },
      select: { name: true, description: true, city: true, coverImageUrl: true }
    })
    .catch(() => null);

  const title = company ? `${company.name} | Sign Zim` : "Company Profile | Sign Zim";
  const description = company
    ? `View ${company.name} in ${company.city}, compare signage services and portfolio work, and request a quote through Sign Zim.`
    : "View Zimbabwe signage company profiles, portfolios, services, and contact details on Sign Zim.";
  const url = absoluteUrl(`/companies/${slug}`);
  const image = company?.coverImageUrl || "/images/sign-zim-hero.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: company ? `${company.name} on Sign Zim` : "Sign Zim" }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

async function getCompany(slug: string) {
  try {
    const company = await prisma.company.findFirst({
      where: {
        slug,
        status: "APPROVED"
      },
      include: {
        services: { include: { service: true } },
        portfolio: true
      }
    });

    return { company, error: false };
  } catch (error) {
    console.error("Unable to load company profile", error);
    return { company: null, error: true };
  }
}

async function trackProfileView(companyId: string) {
  try {
    await prisma.company.update({
      where: { id: companyId },
      data: {
        profileViewCount: {
          increment: 1
        }
      },
      select: { id: true }
    });
  } catch (error) {
    console.error("Unable to track profile view", error);
  }
}

function CompanyProfileUnavailable() {
  return (
    <div className="page-shell py-12">
      <div className="panel rounded-lg p-8 text-center">
        <TriangleAlert className="mx-auto h-8 w-8 text-amberglow" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-black text-white">Provider data is loading.</h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
          We&apos;re loading provider data. Please try again shortly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/companies" className="primary-button">
            Browse Companies
          </Link>
          <Link href="/request-quote" className="secondary-button">
            Request a Quote
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function CompanyProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  const { company, error } = await getCompany(slug);

  if (error) {
    return <CompanyProfileUnavailable />;
  }

  if (!company) {
    notFound();
  }

  const coverImage = company.coverImageUrl || company.portfolio[0]?.imageUrl || "/images/sign-zim-hero.png";
  const services = company.services.map((item) => item.service);
  const contactLinks = compactList([company.website, company.facebookUrl]);
  const whatsapp = `/api/companies/${company.id}/whatsapp-click`;
  const profileUrl = absoluteUrl(`/companies/${company.slug}`);
  const shareText = `View ${company.name} on Sign Zim: ${profileUrl}`;

  await trackProfileView(company.id);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url("${coverImage}")` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" aria-hidden="true" />
        <div className="page-shell relative py-12 md:py-16">
          <Link href="/companies" className="secondary-button mb-10 w-fit">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Directory
          </Link>
          <div className="max-w-4xl">
            <div className="mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-black text-2xl font-black text-amberglow">
              {company.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={company.logoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                initials(company.name)
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {company.isVerified ? (
                <Badge tone="green">
                  <ShieldCheck className="mr-1 h-3 w-3" aria-hidden="true" />
                  Verified
                </Badge>
              ) : null}
              {company.isFeatured ? (
                <Badge tone="amber">
                  <Star className="mr-1 h-3 w-3" aria-hidden="true" />
                  Featured Provider
                </Badge>
              ) : null}
            </div>
            {company.isFeatured ? (
              <p className="mt-4 max-w-xl text-sm font-semibold text-honey">
                Featured providers get higher visibility on Sign Zim.
              </p>
            ) : null}
            <h1 className="mt-5 text-5xl font-black leading-tight text-white md:text-7xl">{company.name}</h1>
            <p className="mt-4 flex items-center gap-2 text-lg text-zinc-200">
              <MapPin className="h-5 w-5 text-amberglow" aria-hidden="true" />
              {company.address ? `${company.address}, ${company.city}` : company.city}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200">{company.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="primary-button">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <Link
                href={`/request-quote?company=${company.slug}&service=${encodeURIComponent(services[0]?.slug ?? "")}`}
                className="secondary-button"
              >
                Request a Quote for This Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-black text-white">Services offered</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amberglow/50 hover:text-white"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">Portfolio gallery</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {(company.portfolio.length ? company.portfolio : [{ id: "hero", imageUrl: coverImage, caption: company.name }]).map(
                (image) => (
                  <figure key={image.id} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.imageUrl} alt={image.caption ?? `${company.name} portfolio`} className="h-64 w-full object-cover" />
                    {image.caption ? <figcaption className="px-4 py-3 text-sm text-zinc-400">{image.caption}</figcaption> : null}
                  </figure>
                )
              )}
            </div>
          </div>

          <TrustBadgeExplainer />
        </div>

        <aside className="space-y-4">
          <div className="panel rounded-lg p-6">
            <h2 className="text-xl font-black text-white">Contact details</h2>
            <div className="mt-5 space-y-3 text-sm text-zinc-300">
              <a href={whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-md bg-amberglow px-4 py-3 font-semibold text-black">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {company.whatsapp}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-4 py-3">
                <Mail className="h-4 w-4 text-amberglow" aria-hidden="true" />
                {company.email}
              </a>
              {contactLinks.map((link) => (
                <a key={link} href={link} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-md border border-white/10 bg-black/30 px-4 py-3">
                  {link.includes("facebook") ? (
                    <Facebook className="h-4 w-4 text-amberglow" aria-hidden="true" />
                  ) : (
                    <ExternalLink className="h-4 w-4 text-amberglow" aria-hidden="true" />
                  )}
                  {link.replace(/^https?:\/\//, "")}
                </a>
              ))}
            </div>
          </div>

          <ShareActions url={profileUrl} whatsappText={shareText} label="Share this profile" />

          <div className="panel rounded-lg p-6">
            <h2 className="text-xl font-black text-white">Opening hours</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Contact {company.contactPerson} for current production slots and installation availability.</p>
          </div>

          <div className="panel rounded-lg p-6">
            <h2 className="text-xl font-black text-white">Own this company?</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Claim or update this listing so Sign Zim can review the latest services, contacts, and portfolio images.
            </p>
            <Link href={`/list-your-company?claim=${company.slug}`} className="secondary-button mt-5 w-full">
              Claim This Listing
            </Link>
          </div>

          <div className="panel rounded-lg p-6">
            <h2 className="text-xl font-black text-white">Related service pages</h2>
            <div className="mt-4 grid gap-2">
              {services.slice(0, 4).map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:border-amberglow/50 hover:text-white"
                >
                  {service.name}
                  <ArrowRight className="h-4 w-4 text-amberglow" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
