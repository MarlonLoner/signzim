import type { MetadataRoute } from "next";
import { cityCatalog, serviceCatalog } from "@/lib/data";
import { absoluteUrl } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getCompanyRoutes() {
  try {
    const companies = await prisma.company.findMany({
      where: { status: "APPROVED" },
      select: { slug: true, updatedAt: true }
    });

    return companies.map((company) => ({
      url: absoluteUrl(`/companies/${company.slug}`),
      lastModified: company.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75
    }));
  } catch (error) {
    console.error("Unable to add company profiles to sitemap", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.65 },
    { url: absoluteUrl("/launch"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/terms"), changeFrequency: "monthly", priority: 0.45 },
    { url: absoluteUrl("/privacy"), changeFrequency: "monthly", priority: 0.45 },
    { url: absoluteUrl("/companies"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/services"), changeFrequency: "weekly", priority: 0.85 },
    { url: absoluteUrl("/request-quote"), changeFrequency: "monthly", priority: 0.85 },
    { url: absoluteUrl("/list-your-company"), changeFrequency: "monthly", priority: 0.75 },
    { url: absoluteUrl("/for-signage-companies"), changeFrequency: "monthly", priority: 0.75 }
  ];

  const serviceRoutes = serviceCatalog.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const cityRoutes = cityCatalog.map((city) => ({
    url: absoluteUrl(`/cities/${city.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.75
  }));

  return [...publicRoutes, ...serviceRoutes, ...cityRoutes, ...(await getCompanyRoutes())];
}


