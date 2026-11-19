// lib/useSiteContent.ts
"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "./data";

export const SiteContentContext = createContext<SiteContent | null>(null);

export function useSiteContent(): SiteContent {
  const content = useContext(SiteContentContext);
  if (!content) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return content;
}
