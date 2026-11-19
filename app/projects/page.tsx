// app/projects/page.tsx
// Projects page: shows project cards, or a 'coming soon' state when the list is empty.
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { iconElement } from "@/lib/data";
import { getSiteContent } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return content.projects.metadata;
}

export default async function Projects() {
  const content = await getSiteContent();
  const { projects } = content.projects;
  return (
    <>
      <section className="mx-auto min-h-[420px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={content.projects.heading.eyebrow} title={content.projects.heading.title} />
        {projects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-14 text-center">
            {iconElement("FolderKanban", { className: "mx-auto h-10 w-10 text-brand-600", "aria-hidden": true })}
            <h2 className="mt-4 font-display text-xl font-semibold">{content.projects.emptyState.heading}</h2>
            <p className="mx-auto mt-2 max-w-md text-ink-500">
              {content.projects.emptyState.description}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-surface-border p-7 transition hover:-translate-y-1 hover:shadow-card"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {p.category}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-ink-500">{p.description}</p>
              </article>
            ))}
          </div>
        )}
      </section>
      <CTASection />
    </>
  );
}
