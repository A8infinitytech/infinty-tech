// app/api/admin/verify/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
} from "@/lib/admin-auth";
import {
  ADMIN_CHALLENGE_COOKIE,
  ADMIN_CHALLENGE_MAX_AGE,
  ADMIN_CHALLENGE_MAX_ATTEMPTS,
  increaseAdminChallengeAttempts,
  readAdminChallenge,
  verifyAdminCode,
} from "@/lib/admin-challenge";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { code?: unknown };
  const store = await cookies();
  const challenge = readAdminChallenge(store.get(ADMIN_CHALLENGE_COOKIE)?.value);

  if (!challenge) {
    const response = NextResponse.json({ error: "Verification expired. Sign in again." }, { status: 401 });
    response.cookies.delete(ADMIN_CHALLENGE_COOKIE);
    return response;
  }

  if (challenge.attempts >= ADMIN_CHALLENGE_MAX_ATTEMPTS) {
    const response = NextResponse.json({ error: "Too many attempts. Sign in again." }, { status: 429 });
    response.cookies.delete(ADMIN_CHALLENGE_COOKIE);
    return response;
  }

  if (!verifyAdminCode(challenge, body.code)) {
    const attempts = challenge.attempts + 1;
    const response = NextResponse.json(
      { error: `Invalid code. ${ADMIN_CHALLENGE_MAX_ATTEMPTS - attempts} attempts left.` },
      { status: 401 },
    );
    response.cookies.set({
      name: ADMIN_CHALLENGE_COOKIE,
      value: increaseAdminChallengeAttempts(challenge),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_CHALLENGE_MAX_AGE,
    });
    return response;
  }

  const response = NextResponse.json({ ok: true, device: challenge.device });
  response.cookies.delete(ADMIN_CHALLENGE_COOKIE);
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: createAdminSession(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
  return response;
}
