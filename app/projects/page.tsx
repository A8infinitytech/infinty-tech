// Projects page: shows project cards, or a 'coming soon' state when the list is empty.
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { FolderKanban } from "lucide-react";
export const metadata: Metadata = {
  title: "Projects",
  description: "Selected Infinity Tech projects.",
};
// Add real projects here: { title, category, description, href? }. Nothing is invented.
const projects: { title: string; category: string; description: string }[] = [];
export default function Projects() {
  return (
    <>
      <section className="mx-auto min-h-[420px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Projects" title="Our work" />
        {projects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-14 text-center">
            <FolderKanban className="mx-auto h-10 w-10 text-brand-600" aria-hidden />
            <h2 className="mt-4 font-display text-xl font-semibold">Case studies coming soon</h2>
            <p className="mx-auto mt-2 max-w-md text-ink-500">
              Project cards, categories and details will be published here.
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
