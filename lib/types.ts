import type { Company, CompanyService, PortfolioImage, Service } from "@prisma/client";

export type CompanyWithServices = Company & {
  services: Array<CompanyService & { service: Service }>;
  portfolio: PortfolioImage[];
};
