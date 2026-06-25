import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "sign_zim_admin_access";
const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 12;

export function getAdminKey() {
  return process.env.SIGN_ZIM_ADMIN_KEY?.trim() ?? "";
}

export function isAdminKeyConfigured() {
  return getAdminKey().length > 0;
}

function adminSessionToken() {
  return createHash("sha256").update(`sign-zim-admin:${getAdminKey()}`).digest("hex");
}

export function verifyAdminKey(input: string) {
  const expected = getAdminKey();

  if (!expected || !input) {
    return false;
  }

  const expectedBuffer = Buffer.from(expected);
  const inputBuffer = Buffer.from(input);

  return expectedBuffer.length === inputBuffer.length && timingSafeEqual(expectedBuffer, inputBuffer);
}

export async function hasAdminAccess() {
  if (!isAdminKeyConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === adminSessionToken();
}

export async function setAdminAccessCookie() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: ADMIN_COOKIE,
    value: adminSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE
  });
}

export async function clearAdminAccessCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function requireAdminAccess() {
  if (!(await hasAdminAccess())) {
    redirect("/admin?error=auth");
  }
}
