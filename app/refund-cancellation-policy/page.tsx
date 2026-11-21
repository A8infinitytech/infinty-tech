// app/refund-cancellation-policy/page.tsx
import type { Metadata } from "next";
import LegalPage, { generateLegalMetadata } from "@/components/LegalPage";

export function generateMetadata(): Promise<Metadata> {
  return generateLegalMetadata("refund-cancellation-policy");
}

export default function RefundCancellationPolicyPage() {
  return <LegalPage pageKey="refund-cancellation-policy" />;
}
