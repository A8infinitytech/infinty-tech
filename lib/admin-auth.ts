// lib/admin-auth.ts
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE = "infinity_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

function getPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD;
  return value && value.length > 0 ? value : null;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyAdminPassword(password: unknown): boolean {
  if (typeof password !== "string") return false;
  const expected = getPassword();
  return expected !== null && safeEqual(password, expected);
}

function sign(payload: string): string {
  const secret = getPassword();
  if (!secret) throw new Error("ADMIN_PASSWORD is missing");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createAdminSession(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + ADMIN_SESSION_MAX_AGE * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token: string | undefined): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: unknown;
    };
    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminSession(store.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}
