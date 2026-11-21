// app/projects/page.tsx
// Projects page: shows project cards, or a 'coming soon' state when the list is empty.
import type { Metadata } from "next";
import { cache } from "react";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ProjectCard from "@/components/ProjectCard";
import { iconElement } from "@/lib/data";
import { getSiteContent as getSiteContentRaw } from "@/lib/site-content";
import { getCmsProjects } from "@/lib/cms/projects";

// ✅ Dedupe: generateMetadata + page share the SAME fetch per request
const getSiteContent = cache(getSiteContentRaw);

export async function generateMetadata(): Promise<Metadata> {
  try {
    const content = await getSiteContent();
    return content.projects?.metadata ?? {};
  } catch {
    // ✅ Never let metadata crash the head
    return {};
  }
}

export default async function Projects() {
  const [content, projects] = await Promise.all([
    getSiteContent(),
    getCmsProjects(),
  ]);

  const heading = content.projects.heading;
  const emptyState = content.projects.emptyState;

  return (
    <>
      <section className="mx-auto min-h-[420px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          as="h1"
          eyebrow={heading.eyebrow}
          title={heading.title}
        />
        {projects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-14 text-center">
            {iconElement("FolderKanban", {
              className: "mx-auto h-10 w-10 text-brand-600",
              "aria-hidden": true,
            })}
            <h2 className="mt-4 font-display text-xl font-semibold">
              {emptyState.heading}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-ink-500">
              {emptyState.description}
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                // ✅ Guaranteed unique key
                key={project.id ?? project.title ?? `project-${index}`}
                project={project}
              />
            ))}
          </div>
        )}
      </section>
      <CTASection />
    </>
  );
}