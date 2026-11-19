// components/SiteContentProvider.tsx
"use client";


import { SiteContentContext } from "@/lib/useSiteContent";
import type { SiteContent } from "@/lib/data";

export default function SiteContentProvider({
  content,
  children,
}: {
  content: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}
