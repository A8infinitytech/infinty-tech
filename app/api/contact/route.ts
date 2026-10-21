import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Resend ko initialize kar rahe hain
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 1. Request body se data parse karna
    const formData = await req.json();
    const { fullName, email, phoneNumber, websiteType, message } = formData;

    // 2. Server-side Validation
    if (
      !fullName?.trim() || 
      !email?.trim() || 
      !phoneNumber?.trim() || 
      !websiteType?.trim() || 
      !message?.trim()
    ) {
      return NextResponse.json(
        { message: 'Missing required fields. Please fill everything out.' }, 
        { status: 400 }
      );
    }

    // 3. Environment Variables Validation
    if (!process.env.RESEND_API_KEY) {
      console.error('CRITICAL ERROR: RESEND_API_KEY is missing in .env.local');
      return NextResponse.json(
        { message: 'Server configuration error. API Key is missing.' }, 
        { status: 500 }
      );
    }

    if (!process.env.RECEIVER_EMAIL) {
      console.error('CRITICAL ERROR: RECEIVER_EMAIL is missing in .env.local');
      return NextResponse.json(
        { message: 'Server configuration error. Receiver email is missing.' }, 
        { status: 500 }
      );
    }

    // 4. Send Email via Resend
    // Free accounts ke liye 'from' me 'onboarding@resend.dev' hona lazmi hai!
    const { data, error } = await resend.emails.send({
      from: 'Infinity Tech Form <onboarding@resend.dev>', 
      to: process.env.RECEIVER_EMAIL, // Ab ye direct .env.local se uthayega
      replyTo: email, // Direct client ko inbox se reply karne ke liye
      subject: `🚀 New Project Lead from "${fullName}"`, // Subject line updated
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1e293b; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          
          <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #0f172a; font-size: 26px; font-weight: 800; letter-spacing: -0.5px; margin: 0; text-transform: uppercase;">
              Infinity <span style="color: #2563eb;">Tech</span>
            </h1>
            <p style="color: #64748b; font-size: 13px; margin-top: 5px; font-weight: 500;">New Contact Form Submission</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin-bottom: 25px;" />
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; line-height: 1.8;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 130px; font-weight: 600;">Client Name:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 700; font-size: 15px;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email Address:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Phone Number:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${phoneNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Website Type:</td>
              <td style="padding: 8px 0;"><span style="background: #eff6ff; color: #2563eb; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; border: 1px solid #dbeafe;">${websiteType.replace('_', ' ')}</span></td>
            </tr>
          </table>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-top: 25px; border: 1px solid #f1f5f9; border-left: 4px solid #2563eb;">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #0f172a; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</p>
            <p style="margin: 0; color: #334155; white-space: pre-wrap; font-size: 14px; line-height: 1.6; font-style: italic;">"${message}"</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #f1f5f9; margin-top: 30px; margin-bottom: 15px;" />
          
          <p style="font-size: 11px; color: #94a3b8; margin: 0; text-align: center; font-family: monospace;">
            Received on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)
          </p>
        </div>
      `,
    });

    // 5. Check if Resend returned any error
    if (error) {
      console.error('Resend Error Details:', error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // 6. Success Response
    return NextResponse.json(
      { message: 'Your message has been sent successfully!' }, 
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Catch Block Server Error:', error);
    return NextResponse.json(
      { message: error.message || 'Something went wrong on the server.' }, 
      { status: 500 }
    );
  }
}