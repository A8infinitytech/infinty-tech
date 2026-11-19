// lib/site-content.ts
import { cacheLife, cacheTag } from "next/cache";
import { getNormalizedSiteContent, mergeContent } from "@/lib/cms/view";
import type { SiteContent } from "@/lib/data";
import { supabase } from "@/lib/supabase";

export async function getSiteContent(): Promise<SiteContent> {
  "use cache";

  cacheLife("default");
  cacheTag("site-content");

  const [legacy, normalized] = await Promise.all([
    supabase.from("site_content").select("key,data").order("key", { ascending: true }),
    getNormalizedSiteContent(),
  ]);

  if (legacy.error) {
    throw new Error(legacy.error.message);
  }

  const base = Object.fromEntries((legacy.data ?? []).map((row) => [row.key, row.data])) as SiteContent;
  return normalized ? mergeContent(base, normalized) : base;
}
