// components/LegalPage.tsx
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { iconElement } from "@/lib/data";
import { legalPages, type LegalPageKey } from "@/lib/legal-pages";
import { getSiteContent } from "@/lib/site-content";

export async function generateLegalMetadata(pageKey: LegalPageKey): Promise<Metadata> {
  const page = legalPages[pageKey];
  return { title: page.title, description: page.description };
}

export default async function LegalPage({ pageKey }: { pageKey: LegalPageKey }) {
  const [content] = await Promise.all([getSiteContent()]);
  const page = legalPages[pageKey];

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <SectionHeading as="h1" eyebrow="Legal" title={page.title} desc={page.description} />
        <p className="mt-4 text-sm text-ink-500">Last updated: 21 November 2026</p>

        <div className="mt-12 space-y-10">
          {page.sections.map((section, index) => (
            <section key={section.heading} className="border-t border-surface-border pt-8">
              <h2 className="font-display text-2xl font-semibold">
                {index + 1}. {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-ink-500">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-ink-500">
                      {iconElement("Check", { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-600", "aria-hidden": true })}
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-surface-border bg-brand-50/40 p-6">
          <h2 className="font-display text-xl font-semibold">Questions about this page?</h2>
          <p className="mt-2 text-ink-500">
            Contact us at{" "}
            <a href={`mailto:${content.constants.email}`} className="font-semibold text-brand-600 hover:underline">
              {content.constants.email}
            </a>
            .
          </p>
        </section>
      </section>
      <CTASection />
    </>
  );
}
