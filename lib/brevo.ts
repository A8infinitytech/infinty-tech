// lib/brevo.ts
type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendBrevoEmail({ to, subject, html, replyTo }: SendEmailInput): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.CONTACT_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Infinity Tech";

  if (!apiKey) throw new Error("BREVO_API_KEY is missing");
  if (!senderEmail) throw new Error("BREVO_SENDER_EMAIL is missing");

  const payload: Record<string, unknown> = {
    sender: { name: senderName, email: senderEmail },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  };

  if (replyTo) payload.replyTo = { email: replyTo };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo email failed (${response.status}): ${detail}`);
  }
}
