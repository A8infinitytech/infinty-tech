import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 1️⃣ Aapko (Admin) email jayegi - Professional Look
    const adminSend = resend.emails.send({
      from: "Infinity Tech <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `New Subscriber Alert 🎉`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
            <!-- Header -->
            <div style="background-color: #0ea5e9; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">Infinity Tech</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              <h2 style="color: #111827; margin-top: 0; font-size: 20px;">New Newsletter Subscriber! 🎉</h2>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">Someone just subscribed to your newsletter.</p>
              
              <div style="background-color: #f3f4f6; border-left: 4px solid #0ea5e9; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0; color: #111827; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Infinity Tech. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });

    // 2️⃣ Visitor ko auto-reply jayegi - Premium Welcome Email
    const visitorSend = resend.emails.send({
      from: "Infinity Tech <onboarding@resend.dev>",
      to: email,
      subject: `Welcome to Infinity Tech! 🚀`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background-color: #0ea5e9; padding: 32px 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">Infinity Tech</h1>
              <p style="color: #e0f2fe; margin: 8px 0 0 0; font-size: 14px;">Build Smarter. Move Faster.</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 32px;">
              <h2 style="color: #111827; margin-top: 0; font-size: 22px;">Welcome aboard! 🚀</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Hi there,</p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Thank you for subscribing to the Infinity Tech newsletter. You are now part of our community!</p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">We'll keep you updated with the latest AI trends, web development tips, and exclusive tech insights straight to your inbox.</p>
              
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="color: #111827; font-size: 15px; font-weight: 600; margin-bottom: 8px;">What to expect:</p>
                <ul style="color: #4b5563; font-size: 15px; line-height: 1.6; padding-left: 20px; margin-top: 0;">
                  <li style="margin-bottom: 8px;">AI & Automation insights</li>
                  <li style="margin-bottom: 8px;">Web development best practices</li>
                  <li style="margin-bottom: 8px;">Exclusive offers & updates</li>
                </ul>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0;">Need help? Just reply to this email.</p>
              <p style="color: #9ca3af; font-size: 12px; margin: 12px 0 0 0;">© ${new Date().getFullYear()} Infinity Tech. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });

    // Dono emails bhej dein
    const [adminRes, visitorRes] = await Promise.all([adminSend, visitorSend]);

    if (adminRes.error) {
      console.error("Admin email failed:", adminRes.error);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    if (visitorRes.error) {
      console.warn("Auto-reply failed (verify domain):", visitorRes.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}