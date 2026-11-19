// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, service, details } = await req.json();

    if (!name || !email || !details) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1️⃣ Email to YOU (Admin) - Premium Design
    const adminSend = resend.emails.send({
      from: "Infinity Tech <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      replyTo: email,
      subject: `New Project Enquiry: ${service}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background-color: #0ea5e9; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">New Project Enquiry</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 32px;">
              <h2 style="color: #111827; margin-top: 0; font-size: 20px;">You have a new message! 📩</h2>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.6;">Someone just submitted the contact form on your website.</p>
              
              <div style="background-color: #f3f4f6; border-left: 4px solid #0ea5e9; padding: 16px; margin: 24px 0; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; color: #111827; font-size: 15px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 0 0 8px 0; color: #111827; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a></p>
                <p style="margin: 0; color: #111827; font-size: 15px;"><strong>Service:</strong> <span style="background-color: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;">${service}</span></p>
              </div>

              <p style="color: #111827; font-size: 15px; font-weight: 600; margin-bottom: 8px;">Project Details:</p>
              <div style="background-color: #ffffff; border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px;">
                <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${details}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0;">Reply directly to this email to contact ${name}.</p>
            </div>
          </div>
        </div>
      `,
    });

    // 2️⃣ Auto-reply email to the VISITOR - Premium Design
    const visitorSend = resend.emails.send({
      from: "Infinity Tech <onboarding@resend.dev>",
      to: email,
      subject: `We received your message — Infinity Tech`,
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
              <h2 style="color: #111827; margin-top: 0; font-size: 22px;">Thanks for reaching out, ${name}! 🎉</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">We have successfully received your enquiry regarding <strong>${service}</strong>.</p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Our team is reviewing your message and will get back to you within <strong>24 hours</strong>.</p>
              
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                <p style="color: #111827; font-size: 15px; font-weight: 600; margin-bottom: 8px;">Your submitted message:</p>
                <blockquote style="border-left: 4px solid #0ea5e9; padding: 12px 16px; color: #4b5563; background-color: #f3f4f6; border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${details}</blockquote>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 13px; margin: 0;">Need to add anything? Just reply to this email.</p>
              <p style="color: #9ca3af; font-size: 12px; margin: 12px 0 0 0;">© ${new Date().getFullYear()} Infinity Tech. All rights reserved.</p>
            </div>
          </div>
        </div>
      `,
    });

    // Dono emails parallel bhejein
    const [adminRes, visitorRes] = await Promise.all([adminSend, visitorSend]);

    if (adminRes.error) {
      console.error("Admin email failed:", adminRes.error);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }

    // Visitor email fail ho to bhi form success dikhayein (admin ko email chala gaya)
    if (visitorRes.error) {
      console.warn("Auto-reply failed:", visitorRes.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}