// components/ProjectCard.tsx
import Image from "next/image";
import { iconElement } from "@/lib/data";
import type { CmsProject } from "@/lib/cms/projects";

/** Only allow http(s) or site-relative links — blocks javascript:, data:, etc. */
function safeLink(raw: string | null | undefined): string | null {
  const url = raw?.trim();
  if (!url) return null;
  if (url.startsWith("/") || url.startsWith("#")) return url;
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function isExternal(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export default function ProjectCard({ project }: { project: CmsProject }) {
  const cardClass =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-surface-border bg-white p-5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";

  const content = (
    <>
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-brand-50">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title || "Project cover"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            {iconElement("FolderKanban", {
              className: "h-10 w-10 text-brand-600",
              "aria-hidden": true,
            })}
          </div>
        )}
      </div>

      {project.category ? (
        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-brand-600">
          {project.category}
        </p>
      ) : null}

      <h3 className="mt-2 font-display text-xl font-semibold">
        {project.title}
      </h3>

      <p className="mt-2 line-clamp-3 text-ink-500">{project.description}</p>
    </>
  );

  const detailHref = project.id
    ? `/projects/${encodeURIComponent(String(project.id))}`
    : null;
  const href = detailHref ?? safeLink(project.link);

  if (href) {
    const external = isExternal(href);
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cardClass}
        aria-label={project.title || "Open project"}
      >
        {content}
      </a>
    );
  }

  return <article className={cardClass}>{content}</article>;
}