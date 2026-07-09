"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import {
  companyStatuses,
  leadStatuses,
  packageOptions,
  paymentStatuses,
  serviceCatalog
} from "@/lib/data";
import {
  clearAdminAccessCookie,
  isAdminKeyConfigured,
  requireAdminAccess,
  setAdminAccessCookie,
  verifyAdminKey
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { appConfig } from "@/lib/config";
import { getUploadedFiles, uploadImageFile } from "@/lib/uploads";
import { slugify, splitUrls } from "@/lib/utils";

type PackageTypeValue = (typeof packageOptions)[number]["value"];
type CompanyStatusValue = (typeof companyStatuses)[number];
type PaymentStatusValue = (typeof paymentStatuses)[number];
type LeadStatusValue = (typeof leadStatuses)[number];

type LeadFormInput = {
  customerName: string;
  phone: string;
  email?: string;
  city: string;
  serviceNeeded: string;
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  referenceImageUrl?: string;
  leadSource?: string;
};

type CompanyFormInput = {
  name: string;
  contactPerson: string;
  whatsapp: string;
  email?: string;
  city: string;
  address: string;
  alternativePhone?: string;
  whatsappMarketingConsent: boolean;
  termsAccepted: boolean;
  services: string[];
  description: string;
  website?: string;
  facebookUrl?: string;
  logoUrl?: string;
  coverImageUrl?: string;
  portfolioUrls?: string;
  packageType: PackageTypeValue;
  claimSlug?: string;
};

type CompanyUpdateInput = CompanyFormInput & {
  companyId: string;
};

function getText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalText(formData: FormData, key: string) {
  const value = getText(formData, key).trim();
  return value.length ? value : undefined;
}

function normalizeZimbabwePhone(value: string) {
  const digits = value.replace(/[^0-9]/g, "");

  if (/^0[7-8][0-9]{8}$/.test(digits)) {
    return `263${digits.slice(1)}`;
  }

  if (/^263[7-8][0-9]{8}$/.test(digits)) {
    return digits;
  }

  return null;
}

function isChecked(formData: FormData, key: string) {
  const value = formData.get(key);
  return value === "on" || value === "true" || value === "1";
}
function getSelectedServices(formData: FormData) {
  return formData
    .getAll("services")
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
}

function hasMin(value: string, min: number) {
  return value.trim().length >= min;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPackageType(value: string): value is PackageTypeValue {
  return packageOptions.some((option) => option.value === value);
}

function parseLeadForm(formData: FormData): LeadFormInput | null {
  const input: LeadFormInput = {
    customerName: getText(formData, "customerName"),
    phone: getText(formData, "phone"),
    email: getOptionalText(formData, "email"),
    city: getText(formData, "city"),
    serviceNeeded: getText(formData, "serviceNeeded"),
    projectDescription: getText(formData, "projectDescription"),
    budgetRange: getText(formData, "budgetRange"),
    timeline: getText(formData, "timeline"),
    referenceImageUrl: getOptionalText(formData, "referenceImageUrl"),
    leadSource: getOptionalText(formData, "leadSource") ?? "request-quote"
  };

  if (
    !hasMin(input.customerName, 2) ||
    !hasMin(input.phone, 7) ||
    !hasMin(input.city, 2) ||
    !hasMin(input.serviceNeeded, 2) ||
    !hasMin(input.projectDescription, 12) ||
    !hasMin(input.budgetRange, 2) ||
    !hasMin(input.timeline, 2)
  ) {
    return null;
  }

  if (input.email && !isValidEmail(input.email)) {
    return null;
  }

  return input;
}

function parseCompanyForm(formData: FormData): CompanyFormInput | null {
  const packageType = getText(formData, "packageType") || "FREE";
  const services = getSelectedServices(formData).filter((slug) =>
    serviceCatalog.some((service) => service.slug === slug)
  );

  if (!isPackageType(packageType) || services.length === 0) {
    return null;
  }

  const whatsapp = normalizeZimbabwePhone(getText(formData, "whatsapp"));
  const alternativePhoneRaw = getOptionalText(formData, "alternativePhone");
  const alternativePhone = alternativePhoneRaw ? normalizeZimbabwePhone(alternativePhoneRaw) ?? undefined : undefined;
  const email = getOptionalText(formData, "email");

  const input: CompanyFormInput = {
    name: getText(formData, "name"),
    contactPerson: getText(formData, "contactPerson"),
    whatsapp: whatsapp ?? "",
    alternativePhone,
    whatsappMarketingConsent: isChecked(formData, "whatsappMarketingConsent"),
    termsAccepted: isChecked(formData, "termsAccepted") || Boolean(getText(formData, "companyId")),
    email,
    city: getText(formData, "city"),
    address: getText(formData, "address"),
    services,
    description: getText(formData, "description"),
    website: getOptionalText(formData, "website"),
    facebookUrl: getOptionalText(formData, "facebookUrl"),
    logoUrl: getOptionalText(formData, "logoUrl"),
    coverImageUrl: getOptionalText(formData, "coverImageUrl"),
    portfolioUrls: getOptionalText(formData, "portfolioUrls"),
    packageType,
    claimSlug: getOptionalText(formData, "claimSlug")
  };

  if (
    !hasMin(input.name, 2) ||
    !hasMin(input.contactPerson, 2) ||
    !whatsapp ||
    Boolean(alternativePhoneRaw && !alternativePhone) ||
    Boolean(email && !isValidEmail(email)) ||
    !hasMin(input.city, 2) ||
    !hasMin(input.address, 8) ||
    !hasMin(input.description, 20) ||
    !input.termsAccepted
  ) {
    return null;
  }

  return input;
}

function parseCompanyUpdateForm(formData: FormData): CompanyUpdateInput | null {
  const companyId = getText(formData, "companyId");
  const input = parseCompanyForm(formData);

  if (!companyId || !input) {
    return null;
  }

  return {
    ...input,
    companyId
  };
}

async function uniqueCompanySlug(name: string, excludeId?: string) {
  const baseSlug = slugify(name) || "company";
  let slug = baseSlug;
  let index = 2;

  while (true) {
    const existing = await prisma.company.findUnique({
      where: { slug },
      select: { id: true }
    });

    if (!existing || existing.id === excludeId) {
      return slug;
    }

    slug = `${baseSlug}-${index}`;
    index += 1;
  }
}

async function ensureServices(tx: Prisma.TransactionClient, serviceSlugs: string[]) {
  const catalogEntries = serviceCatalog.filter((service) => serviceSlugs.includes(service.slug));

  return Promise.all(
    catalogEntries.map((service) =>
      tx.service.upsert({
        where: { slug: service.slug },
        update: {
          name: service.name,
          description: service.description
        },
        create: {
          name: service.name,
          slug: service.slug,
          description: service.description
        }
      })
    )
  );
}

export async function unlockAdmin(formData: FormData) {
  const adminKey = getText(formData, "adminKey");

  if (!isAdminKeyConfigured()) {
    redirect("/admin?error=setup");
  }

  if (!verifyAdminKey(adminKey)) {
    redirect("/admin?error=admin-key");
  }

  await setAdminAccessCookie();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminAccessCookie();
  redirect("/admin");
}

export async function createLead(formData: FormData) {
  const parsed = parseLeadForm(formData);

  if (!parsed) {
    redirect("/request-quote?error=missing");
  }

  try {
    await prisma.lead.create({
      data: parsed
    });
  } catch (error) {
    console.error("Unable to create lead", error);
    redirect("/request-quote?error=database");
  }

  revalidatePath("/admin");
  const summary = new URLSearchParams({
    success: "1",
    name: parsed.customerName,
    city: parsed.city,
    service: parsed.serviceNeeded,
    budget: parsed.budgetRange,
    timeline: parsed.timeline
  });
  redirect(`/request-quote?${summary.toString()}`);
}

export async function createCompanySubmission(formData: FormData) {
  const parsed = parseCompanyForm(formData);

  if (!parsed) {
    redirect("/list-your-company?error=missing");
  }

  const logoFiles = getUploadedFiles(formData, "logoFile");
  const proofFiles = getUploadedFiles(formData, "proofImages").slice(0, 10);

  if (proofFiles.length === 0 && !splitUrls(parsed.portfolioUrls).length) {
    redirect("/list-your-company?error=proof");
  }

  const slug = await uniqueCompanySlug(parsed.name);
  const portfolioUrls = splitUrls(parsed.portfolioUrls);
  let logoUrl = parsed.logoUrl;
  const uploadedProofUrls: string[] = [];

  if (logoFiles[0]) {
    const uploadedLogo = await uploadImageFile(logoFiles[0], `company-logos/${slug}`);
    if (!uploadedLogo.ok) {
      redirect(`/list-your-company?error=upload-${uploadedLogo.error}`);
    }
    logoUrl = uploadedLogo.url;
  }

  for (const file of proofFiles) {
    const uploadedProof = await uploadImageFile(file, `portfolio/${slug}`);
    if (!uploadedProof.ok) {
      redirect(`/list-your-company?error=upload-${uploadedProof.error}`);
    }
    uploadedProofUrls.push(uploadedProof.url);
  }

  const allPortfolioUrls = [...uploadedProofUrls, ...portfolioUrls].slice(0, 10);

  try {
    await prisma.$transaction(async (tx) => {
      const services = await ensureServices(tx, parsed.services);
      const company = await tx.company.create({
        data: {
          name: parsed.name,
          slug,
          description: parsed.description,
          logoUrl,
          coverImageUrl: parsed.coverImageUrl ?? allPortfolioUrls[0],
          city: parsed.city,
          address: parsed.address,
          whatsapp: parsed.whatsapp,
          email: parsed.email,
          alternativePhone: parsed.alternativePhone,
          whatsappMarketingConsent: parsed.whatsappMarketingConsent,
          whatsappMarketingConsentAt: parsed.whatsappMarketingConsent ? new Date() : null,
          termsAcceptedAt: new Date(),
          privacyAcceptedAt: new Date(),
          termsVersion: appConfig.termsVersion,
          foundingProvider: true,
          complimentaryAccessStartedAt: new Date(`${appConfig.launchStartDate}T00:00:00.000Z`),
          complimentaryAccessEndsAt: new Date(`${appConfig.launchEndDate}T00:00:00.000Z`),
          website: parsed.website,
          facebookUrl: parsed.facebookUrl,
          packageType: parsed.packageType,
          contactPerson: parsed.contactPerson,
          adminNotes: parsed.claimSlug
            ? `Claim/update request for existing listing: ${parsed.claimSlug}`
            : undefined,
          portfolio: {
            create: allPortfolioUrls.map((imageUrl, index) => ({
              imageUrl,
              caption: `Portfolio image ${index + 1}`
            }))
          }
        }
      });

      if (services.length) {
        await tx.companyService.createMany({
          data: services.map((service) => ({
            companyId: company.id,
            serviceId: service.id
          })),
          skipDuplicates: true
        });
      }
    });
  } catch (error) {
    console.error("Unable to create company submission", error);
    redirect("/list-your-company?error=database");
  }

  revalidatePath("/admin");
  redirect("/list-your-company?success=1");
}

export async function updateCompanyPayment(formData: FormData) {
  await requireAdminAccess();

  const companyId = getText(formData, "companyId");
  const status = getText(formData, "paymentStatus");
  const paymentReference = getOptionalText(formData, "paymentReference");
  const paidUntilValue = getOptionalText(formData, "paidUntil");
  const paidUntil = paidUntilValue ? new Date(`${paidUntilValue}T00:00:00`) : null;

  if (!companyId || !paymentStatuses.includes(status as PaymentStatusValue)) {
    redirect("/admin?error=payment");
  }

  if (paidUntilValue && Number.isNaN(paidUntil?.getTime())) {
    redirect("/admin?error=payment");
  }

  await prisma.company.update({
    where: { id: companyId },
    data: {
      paymentStatus: status as PaymentStatusValue,
      paymentReference,
      paidUntil
    }
  });

  revalidatePath("/admin");
  redirect("/admin?updated=payment");
}

export async function updateCompanyNotes(formData: FormData) {
  await requireAdminAccess();

  const companyId = getText(formData, "companyId");
  const adminNotes = getOptionalText(formData, "adminNotes");

  if (!companyId) {
    redirect("/admin?error=company");
  }

  await prisma.company.update({
    where: { id: companyId },
    data: { adminNotes }
  });

  revalidatePath("/admin");
  redirect("/admin?updated=notes");
}

export async function updateCompanyStatus(formData: FormData) {
  await requireAdminAccess();

  const companyId = getText(formData, "companyId");
  const status = getText(formData, "status");

  if (!companyId || !companyStatuses.includes(status as (typeof companyStatuses)[number])) {
    redirect("/admin?error=company");
  }

  await prisma.company.update({
    where: { id: companyId },
    data: { status: status as CompanyStatusValue }
  });

  revalidatePath("/");
  revalidatePath("/companies");
  revalidatePath("/admin");
  redirect("/admin?updated=company");
}

export async function toggleCompanyFlag(formData: FormData) {
  await requireAdminAccess();

  const companyId = getText(formData, "companyId");
  const flag = getText(formData, "flag");

  if (!companyId || !["isVerified", "isFeatured"].includes(flag)) {
    redirect("/admin?error=company");
  }

  const company = await prisma.company.findUnique({
    where: { id: companyId },
    select: { isVerified: true, isFeatured: true }
  });

  if (!company) {
    redirect("/admin?error=company");
  }

  const data =
    flag === "isVerified"
      ? { isVerified: !company.isVerified }
      : { isFeatured: !company.isFeatured };

  await prisma.company.update({
    where: { id: companyId },
    data
  });

  revalidatePath("/");
  revalidatePath("/companies");
  revalidatePath("/admin");
  redirect("/admin?updated=company");
}

export async function updateCompanyDetails(formData: FormData) {
  await requireAdminAccess();

  const parsed = parseCompanyUpdateForm(formData);

  if (!parsed) {
    redirect("/admin?error=company");
  }

  const slug = await uniqueCompanySlug(parsed.name, parsed.companyId);

  await prisma.$transaction(async (tx) => {
    const services = await ensureServices(tx, parsed.services);

    await tx.company.update({
      where: { id: parsed.companyId },
      data: {
        name: parsed.name,
        slug,
        description: parsed.description,
        logoUrl: parsed.logoUrl,
        coverImageUrl: parsed.coverImageUrl,
        city: parsed.city,
        address: parsed.address,
        whatsapp: parsed.whatsapp,
        email: parsed.email,
        alternativePhone: parsed.alternativePhone,
        whatsappMarketingConsent: parsed.whatsappMarketingConsent,
        website: parsed.website,
        facebookUrl: parsed.facebookUrl,
        packageType: parsed.packageType,
        contactPerson: parsed.contactPerson
      }
    });

    await tx.companyService.deleteMany({
      where: { companyId: parsed.companyId }
    });

    if (services.length) {
      await tx.companyService.createMany({
        data: services.map((service) => ({
          companyId: parsed.companyId,
          serviceId: service.id
        })),
        skipDuplicates: true
      });
    }
  });

  revalidatePath("/");
  revalidatePath("/companies");
  revalidatePath("/admin");
  redirect("/admin?updated=company");
}

export async function updateLeadStatus(formData: FormData) {
  await requireAdminAccess();

  const leadId = getText(formData, "leadId");
  const status = getText(formData, "status");

  if (!leadId || !leadStatuses.includes(status as (typeof leadStatuses)[number])) {
    redirect("/admin?error=lead");
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { status: status as LeadStatusValue }
  });

  revalidatePath("/admin");
  redirect("/admin?updated=lead");
}

export async function updateLeadNotes(formData: FormData) {
  await requireAdminAccess();

  const leadId = getText(formData, "leadId");
  const adminNotes = getOptionalText(formData, "adminNotes");

  if (!leadId) {
    redirect("/admin?error=lead");
  }

  await prisma.lead.update({
    where: { id: leadId },
    data: { adminNotes }
  });

  revalidatePath("/admin");
  redirect("/admin?updated=notes");
}




