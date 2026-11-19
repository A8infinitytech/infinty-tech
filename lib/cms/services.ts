// lib/cms/services.ts
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { GET } from "@/app/api/cms/services/route";

export type CmsService = {
  id?: string | number;
  title: string;
  description: string;
  icon: string;
  [key: string]: unknown;
};

function isCmsService(row: unknown): row is CmsService {
  if (typeof row !== "object" || row === null) return false;
  const value = row as { title?: unknown; description?: unknown; icon?: unknown };
  return typeof value.title === "string" && typeof value.description === "string" && typeof value.icon === "string";
}

export async function getCmsServices(): Promise<CmsService[]> {
  "use cache";

  cacheLife("default");
  cacheTag("site-content");

  try {
    const response = await GET(new Request("http://localhost/api/cms/services"));
    const payload = (await response.json()) as { ok?: boolean; data?: unknown };
    if (!response.ok || !payload.ok || !Array.isArray(payload.data)) return [];
    return payload.data.filter(isCmsService);
  } catch {
    return [];
  }
}
