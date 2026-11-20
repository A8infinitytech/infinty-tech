// lib/admin-challenge.ts
import { createHash, createHmac, randomInt, timingSafeEqual } from "node:crypto";

export const ADMIN_CHALLENGE_COOKIE = "infinity_admin_challenge";
export const ADMIN_CHALLENGE_MAX_AGE = 5 * 60;
export const ADMIN_CHALLENGE_MAX_ATTEMPTS = 5;

type AdminChallenge = {
  exp: number;
  device: string;
  codeHash: string;
  attempts: number;
};

function getPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD;
  return value && value.length > 0 ? value : null;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

function sign(payload: string): string {
  const secret = getPassword();
  if (!secret) throw new Error("ADMIN_PASSWORD is missing");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function hashAdminCode(code: string): string {
  return createHash("sha256").update(code).digest("base64url");
}

function encodeChallenge(challenge: AdminChallenge): string {
  const payload = Buffer.from(JSON.stringify(challenge)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function generateAdminCode(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export function createAdminChallenge(device: string, code: string): string {
  return encodeChallenge({
    exp: Date.now() + ADMIN_CHALLENGE_MAX_AGE * 1000,
    device,
    codeHash: hashAdminCode(code),
    attempts: 0,
  });
}

export function readAdminChallenge(token: string | undefined): AdminChallenge | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return null;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminChallenge;
    if (
      typeof parsed.exp !== "number" ||
      parsed.exp <= Date.now() ||
      typeof parsed.device !== "string" ||
      typeof parsed.codeHash !== "string" ||
      typeof parsed.attempts !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function increaseAdminChallengeAttempts(challenge: AdminChallenge): string {
  return encodeChallenge({ ...challenge, attempts: challenge.attempts + 1 });
}

export function verifyAdminCode(challenge: AdminChallenge, code: unknown): boolean {
  if (typeof code !== "string" || !/^\d{6}$/.test(code)) return false;
  return safeEqual(hashAdminCode(code), challenge.codeHash);
}
