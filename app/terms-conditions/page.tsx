// app/terms-conditions/page.tsx
import type { Metadata } from "next";
import LegalPage, { generateLegalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata("terms-conditions");
}

export default function TermsConditionsPage() {
  return <LegalPage pageKey="terms-conditions" />;
}
