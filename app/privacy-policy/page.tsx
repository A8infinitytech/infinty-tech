// app/privacy-policy/page.tsx
import type { Metadata } from "next";
import LegalPage, { generateLegalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata("privacy-policy");
}

export default function PrivacyPolicyPage() {
  return <LegalPage pageKey="privacy-policy" />;
}
