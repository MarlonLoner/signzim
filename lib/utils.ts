import clsx, { type ClassValue } from "clsx";
import { cityCatalog, serviceCatalog } from "@/lib/data";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getServiceBySlug(slug: string) {
  return serviceCatalog.find((service) => service.slug === slug);
}

export function getCityBySlug(slug: string) {
  return cityCatalog.find((city) => city.slug === slug);
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function splitUrls(value: string | null | undefined) {
  if (!value) {
    return [];
  }

  return value
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter(Boolean);
}

export function normalizeZimbabwePhone(value: string) {
  const digits = value.replace(/[^\d+]/g, "");

  if (digits.startsWith("+")) {
    return digits.slice(1);
  }

  if (digits.startsWith("00")) {
    return digits.slice(2);
  }

  if (digits.startsWith("0")) {
    return `263${digits.slice(1)}`;
  }

  if (digits.startsWith("263")) {
    return digits;
  }

  return digits;
}

export function whatsappLink(phone: string, message: string) {
  const normalized = normalizeZimbabwePhone(phone);
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-ZW", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(value);
}

export function compactList(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value && value.trim()));
}

export function leadWhatsAppMessage(input: {
  customerName: string;
  phone: string;
  city: string;
  serviceNeeded: string;
  budgetRange: string;
  timeline: string;
  projectDescription: string;
}) {
  return [
    "New Sign Zim quote request:",
    `Name: ${input.customerName}`,
    `Phone: ${input.phone}`,
    `City: ${input.city}`,
    `Service: ${input.serviceNeeded}`,
    `Budget: ${input.budgetRange}`,
    `Timeline: ${input.timeline}`,
    `Project: ${input.projectDescription}`
  ].join("\n");
}
