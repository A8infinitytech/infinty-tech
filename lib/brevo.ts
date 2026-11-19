// lib/brevo.ts
type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export class BrevoError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function brevoErrorMessage(error: unknown): string {
  if (error instanceof BrevoError) {
    if (error.status === 401) return "Email service authentication failed";
    if (error.status === 400) return "Sender email is not verified in Brevo";
    return "Email could not be sent";
  }
  if (error instanceof Error && error.message.includes("is missing")) {
    return "Email service is not configured";
  }
  return "Email could not be sent";
}

function cleanEnvValue(value?: string): string | undefined {
  return value?.trim().replace(/^["']|["']$/g, "");
}

export async function sendBrevoEmail({ to, subject, html, replyTo }: SendEmailInput): Promise<void> {
  const apiKey = cleanEnvValue(process.env.BREVO_API_KEY);
  const senderEmail = cleanEnvValue(process.env.BREVO_SENDER_EMAIL || process.env.CONTACT_EMAIL);
  const senderName = cleanEnvValue(process.env.BREVO_SENDER_NAME) || "Infinity Tech";

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
    throw new BrevoError(response.status, `Brevo email failed (${response.status}): ${detail}`);
  }
}
