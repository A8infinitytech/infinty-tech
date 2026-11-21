// app/disclaimer/page.tsx
import type { Metadata } from "next";
import LegalPage, { generateLegalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata("disclaimer");
}

export default function DisclaimerPage() {
  return <LegalPage pageKey="disclaimer" />;
}
