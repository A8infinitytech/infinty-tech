// lib/cms/projects.ts
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { GET } from "@/app/api/cms/projects/route";

export type CmsProject = {
  id?: string | number;
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tools: string;
  sortOrder: number;
};

function asText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asImage(value: unknown): string {
  const src = asText(value);
  return src.startsWith("data:image/") || src.startsWith("/") || /^https?:\/\//.test(src) ? src : "";
}

function asLink(value: unknown): string {
  const href = asText(value);
  return href.startsWith("/") || /^https?:\/\//.test(href) ? href : "";
}

function isCmsProject(row: unknown): row is Record<string, unknown> {
  return typeof row === "object" && row !== null && !Array.isArray(row);
}

export function splitProjectList(raw: string): string[] {
  return raw
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getCmsProjects(): Promise<CmsProject[]> {
  "use cache";

  cacheLife("default");
  cacheTag("site-content");

  try {
    const response = await GET(new Request("http://localhost/api/cms/projects"));
    const payload = (await response.json()) as { ok?: boolean; data?: unknown };
    if (!response.ok || !payload.ok || !Array.isArray(payload.data)) return [];

    return payload.data.filter(isCmsProject).map((row) => ({
      id: typeof row.id === "string" || typeof row.id === "number" ? row.id : undefined,
      title: asText(row.title),
      category: asText(row.category),
      description: asText(row.description),
      image: asImage(row.image_url),
      link: asLink(row.link),
      tools: asText(row.tools),
      sortOrder: Number(row.sort_order) || 0,
    })).sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return [];
  }
}

export async function getCmsProjectById(id: string): Promise<CmsProject | null> {
  const projects = await getCmsProjects();
  return projects.find((project) => String(project.id) === id) ?? null;
}
