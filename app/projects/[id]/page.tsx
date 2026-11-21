// app/project/[id]/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import { iconElement } from "@/lib/data";
import { getCmsProjectById, splitProjectList } from "@/lib/cms/projects";

export const instant = false;

type ProjectPageProps = { params: Promise<{ id: string }> };

function safeExternal(raw: string): string | null {
  const href = raw.trim();
  return /^https?:\/\//i.test(href) ? href : null;
}

/* ---------------- Tools grid ---------------- */
function ToolsGrid({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="rounded-2xl border border-surface-border bg-white p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          {iconElement("Wrench", { className: "h-5 w-5", "aria-hidden": true })}
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold">Tools & Technologies</h2>
          <p className="text-xs text-ink-500">
            {items.length} {items.length === 1 ? "tool" : "tools"} used in this project
          </p>
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <li
            key={item}
            className="group flex items-center gap-2 rounded-xl border border-surface-border bg-white px-3 py-2.5 text-sm font-medium text-ink-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50/60 hover:text-brand-700 hover:shadow-card"
          >
            <span className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
              {iconElement("Check", { className: "h-3.5 w-3.5", "aria-hidden": true })}
            </span>
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- Meta row ---------------- */
function MetaRow({
  category,
  toolsCount,
  hasLive,
}: {
  category?: string | null;
  toolsCount: number;
  hasLive: boolean;
}) {
  const items = [
    category
      ? { icon: "Tag", label: "Category", value: category }
      : null,
    toolsCount > 0
      ? {
          icon: "Wrench",
          label: "Tools",
          value: `${toolsCount} ${toolsCount === 1 ? "tool" : "tools"}`,
        }
      : null,
    {
      icon: "CircleCheck",
      label: "Status",
      value: hasLive ? "Live & Delivered" : "Completed",
    },
  ].filter(Boolean) as { icon: string; label: string; value: string }[];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-surface-border bg-white p-4 transition-colors hover:border-brand-200"
        >
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-500">
            {iconElement(item.icon, { className: "h-3.5 w-3.5 text-brand-600", "aria-hidden": true })}
            {item.label}
          </div>
          <p className="mt-1.5 truncate text-sm font-semibold text-ink-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getCmsProjectById(id);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getCmsProjectById(id);
  if (!project) notFound();

  const tools = splitProjectList(project.tools);
  const external = safeExternal(project.link);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-surface-border bg-gradient-to-b from-brand-50/60 via-white to-white">
        {/* soft radial glow — same palette */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full bg-brand-100/50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 left-[-10%] h-[420px] w-[420px] rounded-full bg-brand-50 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          {/* Breadcrumb + back */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-ink-500">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              {iconElement("ArrowRight", { className: "h-4 w-4 rotate-180", "aria-hidden": true })}
              All projects
            </Link>
            <span aria-hidden className="text-ink-400">/</span>
            <span className="truncate">{project.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left: image */}
            <div className="lg:col-span-7">
              <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-surface-border bg-white shadow-card">
                {/* top highlight strip */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600"
                />
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    unoptimized
                    // 🔴 FIX: p-6 hata diya aur object-cover object-top lagaya taake image full cover kare
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    {iconElement("FolderKanban", {
                      className: "h-14 w-14 text-brand-600",
                      "aria-hidden": true,
                    })}
                  </div>
                )}

                {/* floating "visit live" pill on image */}
                {external ? (
                  <a
                    href={external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:bg-brand-700 hover:shadow-xl"
                  >
                    {iconElement("Globe", { className: "h-3.5 w-3.5", "aria-hidden": true })}
                    Live preview
                  </a>
                ) : null}
              </div>
            </div>

            {/* Right: title + CTAs */}
            <div className="lg:col-span-5">
              {project.category ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600">
                  {iconElement("Tag", { className: "h-3 w-3", "aria-hidden": true })}
                  {project.category}
                </span>
              ) : null}

              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-ink-500">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {external ? (
                  <a
                    href={external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg"
                  >
                    Visit live project
                    {iconElement("ArrowRight", {
                      className: "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                      "aria-hidden": true,
                    })}
                  </a>
                ) : null}
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-200 hover:text-brand-600"
                >
                  {iconElement("Layers", { className: "h-4 w-4", "aria-hidden": true })}
                  More projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Details ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: meta + tools */}
          <div className="space-y-8 lg:col-span-8">
            <MetaRow
              category={project.category}
              toolsCount={tools.length}
              hasLive={Boolean(external)}
            />

            <ToolsGrid items={tools} />
          </div>

          {/* Right: sidebar CTA */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-surface-border bg-gradient-to-br from-brand-50 via-white to-white p-6">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-100/60 blur-2xl"
              />
              <div className="relative">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
                  {iconElement("Sparkles", { className: "h-5 w-5", "aria-hidden": true })}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  Want something like this?
                </h3>
                <p className="mt-2 text-sm text-ink-500">
                  Let’s build a project together — from idea to launch, we’ve got you covered.
                </p>
                <Link
                  href="/contact"
                  className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-700"
                >
                  Get in touch
                  {iconElement("ArrowRight", {
                    className: "h-4 w-4 transition-transform group-hover:translate-x-0.5",
                    "aria-hidden": true,
                  })}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}