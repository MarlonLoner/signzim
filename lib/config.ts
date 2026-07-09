export const appConfig = {
  appName: "SignZim, Interior Deco & Fittings",
  shortAppName: "SignZim",
  positioning: "Zimbabwe's marketplace for signage, interior deco and fittings.",
  supportCopy: "Find trusted providers, view real work and request quotes for signage, kitchens, partitions, aluminium works, exhibition booths, commercial interiors and fittings.",
  storyLine: "From the sign outside to the experience inside.",
  launchStartDate: "2026-07-10",
  launchEndDate: "2026-10-10",
  foundingProviderTarget: 1000,
  termsVersion: "2026-07-10",
  appUrl: normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000"),
  adminWhatsapp: process.env.NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP?.trim() ?? "",
  blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim()),
  adminKeyConfigured: Boolean(process.env.SIGN_ZIM_ADMIN_KEY?.trim()),
  environment: process.env.NODE_ENV ?? "development"
};

export function getServerConfigStatus() {
  return {
    appUrlConfigured: Boolean(process.env.NEXT_PUBLIC_APP_URL?.trim()),
    adminWhatsAppConfigured: Boolean(process.env.NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP?.trim()),
    adminKeyConfigured: Boolean(process.env.SIGN_ZIM_ADMIN_KEY?.trim()),
    databaseUrlConfigured: Boolean(process.env.DATABASE_URL?.trim()),
    blobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim())
  };
}

function normalizeAppUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  if (!trimmed) {
    return "http://127.0.0.1:3000";
  }

  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${appConfig.appUrl}${cleanPath}`;
}

