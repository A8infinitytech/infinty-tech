// lib/settings.ts
import { GET } from "@/app/api/cms/site-settings/route";

type SiteSettingsRow = {
  id?: string;
  brand?: string;
  slogan?: string;
  email?: string;
  phone?: string;
  phone_href?: string;
  skip_link?: string;
  process_number_prefix?: string;
  [key: string]: unknown;
};

const fallback = {
  slogan: "Build Smarter. Move Faster.",
  email: "a8infinitytech@gmail.com",
  phone: "+92 318 1935228",
  phone_href: "tel:+923181935228",
};

function isSiteSettingsRow(value: unknown): value is SiteSettingsRow {
  return typeof value === "object" && value !== null;
}

export async function getSettings() {
  try {
    const response = await GET(new Request("http://localhost/api/cms/site-settings"));
    const payload = (await response.json()) as { ok?: boolean; data?: unknown };
    if (!response.ok || !payload.ok) throw new Error("Site settings request failed");

    const row = isSiteSettingsRow(payload.data) ? payload.data : null;
    return {
      ...(row ?? {}),
      slogan: row?.slogan || fallback.slogan,
      email: row?.email || fallback.email,
      phone: row?.phone || fallback.phone,
      phone_href: row?.phone_href || fallback.phone_href,
    };
  } catch (error) {
    console.log("Site settings not found in DB, using fallback.", error);
    return fallback;
  }
}
