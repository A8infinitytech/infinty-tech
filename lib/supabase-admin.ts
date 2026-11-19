// lib/supabase-admin.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

function isPublishableKey(key: string): boolean {
  if (key.startsWith("sb_publishable_")) return true;
  if (!key.startsWith("eyJ")) return false;
  try {
    const payload = key.split(".")[1]?.replace(/-/g, "+").replace(/_/g, "/") ?? "";
    const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8")) as { role?: unknown };
    return decoded.role === "anon";
  } catch {
    return false;
  }
}

export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is missing");
  if (isPublishableKey(key)) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY contains a publishable key. Use the Supabase secret key (sb_secret_...) or a legacy service_role JWT, then restart the dev server.",
    );
  }
  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
