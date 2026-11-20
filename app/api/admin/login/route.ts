// app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { verifyAdminPassword } from "@/lib/admin-auth";
import {
  ADMIN_CHALLENGE_COOKIE,
  ADMIN_CHALLENGE_MAX_AGE,
  createAdminChallenge,
  generateAdminCode,
} from "@/lib/admin-challenge";
import { brevoErrorMessage, sendBrevoEmail } from "@/lib/brevo";
import { getDeviceName } from "@/lib/device";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { password?: unknown };
  if (!verifyAdminPassword(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const adminEmail = process.env.CONTACT_EMAIL;
  if (!adminEmail) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  const device = getDeviceName(request.headers.get("user-agent"));
  const code = generateAdminCode();

  try {
    await sendBrevoEmail({
      to: adminEmail,
      subject: "Admin login verification code",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
            <div style="background-color: #0ea5e9; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Infinity Tech Admin</h1>
            </div>
            <div style="padding: 32px;">
              <h2 style="color: #111827; margin-top: 0; font-size: 20px;">New admin sign-in attempt</h2>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">Someone entered the correct admin password. Confirm it is you by entering this verification code on the login screen.</p>
              <div style="background-color: #f3f4f6; border-left: 4px solid #0ea5e9; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; color: #111827; font-size: 14px;"><strong>Device:</strong> ${device}</p>
                <p style="margin: 0; color: #111827; font-size: 14px;"><strong>Expires in:</strong> 5 minutes</p>
              </div>
              <div style="background-color: #0f172a; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0;">
                <p style="color: #94a3b8; font-size: 12px; margin: 0 0 8px 0; letter-spacing: 0.1em;">VERIFICATION CODE</p>
                <p style="color: #ffffff; font-size: 34px; font-weight: 700; letter-spacing: 0.3em; margin: 0;">${code}</p>
              </div>
              <p style="color: #dc2626; font-size: 14px; line-height: 1.6;">If this was not you, close the login page and rotate the admin password.</p>
            </div>
            <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Infinity Tech. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });
  } catch (error) {
    console.error("Admin login email failed:", error);
    return NextResponse.json({ error: brevoErrorMessage(error) }, { status: 500 });
  }

  const response = NextResponse.json({ ok: true, stage: "verify", device });
  response.cookies.set({
    name: ADMIN_CHALLENGE_COOKIE,
    value: createAdminChallenge(device, code),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_CHALLENGE_MAX_AGE,
  });
  return response;
}
