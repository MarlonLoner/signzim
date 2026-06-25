export const appConfig = {
  appName: "Sign Zim",
  appUrl: normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL ?? "http://127.0.0.1:3000"),
  adminWhatsapp: process.env.NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP?.trim() ?? "",
  adminKeyConfigured: Boolean(process.env.SIGN_ZIM_ADMIN_KEY?.trim()),
  environment: process.env.NODE_ENV ?? "development"
};

export function getServerConfigStatus() {
  return {
    appUrlConfigured: Boolean(process.env.NEXT_PUBLIC_APP_URL?.trim()),
    adminWhatsAppConfigured: Boolean(process.env.NEXT_PUBLIC_SIGN_ZIM_ADMIN_WHATSAPP?.trim()),
    adminKeyConfigured: Boolean(process.env.SIGN_ZIM_ADMIN_KEY?.trim()),
    databaseUrlConfigured: Boolean(process.env.DATABASE_URL?.trim())
  };
}

function normalizeAppUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed || "http://127.0.0.1:3000";
}

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${appConfig.appUrl}${cleanPath}`;
}
