// app/cookie-policy/page.tsx
import type { Metadata } from "next";
import LegalPage, { generateLegalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata("cookie-policy");
}

export default function CookiePolicyPage() {
  return <LegalPage pageKey="cookie-policy" />;
}
