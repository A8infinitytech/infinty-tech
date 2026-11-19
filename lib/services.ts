// lib/services.ts
import { getCmsServices, type CmsService } from "@/lib/cms/services";

export async function getServices(): Promise<CmsService[]> {
  return getCmsServices();
}
