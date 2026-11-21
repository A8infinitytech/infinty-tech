// app/page.tsx
// Home page: hero, services, why us, process, tools, projects teaser, testimonials, FAQ and CTA.
import { Suspense, cache } from "react";
import Button from "@/components/Button";
import HeroDashboard from "@/components/HeroDashboard";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import HeroAsk from "@/components/HeroAsk";
import FAQ from "@/components/FAQ";
import ToolsGrid from "@/components/ToolsGrid";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import ServicesPreview from "@/components/ServicesPreview";
import ProjectCard from "@/components/ProjectCard";
import { iconElement } from "@/lib/data";
import { getSiteContent } from "@/lib/site-content";
import { getCmsServices } from "@/lib/cms/services";
import { getCmsProjects } from "@/lib/cms/projects";

const loadServices = cache(getCmsServices);
const loadProjects = cache(getCmsProjects);

export default async function Home() {
  const content = await getSiteContent();
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-600" />
              {content.constants.slogan}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {content.home.hero.headingLead}{" "}
              <span className="text-brand-600">{content.home.hero.headingAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
              {content.home.hero.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">{content.home.hero.primaryCta}</Button>
              <Button href="/services" variant="secondary" arrow={false}>
                {content.home.hero.secondaryCta}
              </Button>
            </div>
            <HeroAsk />
          </div>
          <Suspense fallback={<DashboardFallback loadingLabel={content.dashboard.loadingLabel} rows={content.dashboard.skeletonRows} />}>
            <HeroDashboardLoader />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto min-h-[720px] max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow={content.home.sections.services.eyebrow}
          title={content.home.sections.services.title}
          desc={content.home.sections.services.desc}
        />
        
        <Suspense fallback={<div className="mt-10 text-center py-10 text-ink-500">{content.home.sections.services.loading}</div>}>
          <ServicesDataWrapper />
        </Suspense>
        
      </section>

      <section className="min-h-[480px] bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={content.home.sections.why.eyebrow} title={content.home.sections.why.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.why.map((w) => (
              <Reveal key={w.t}>
                <div className="h-full rounded-2xl border border-surface-border bg-white p-6">
                  {iconElement("ShieldCheck", { className: "mb-4 h-6 w-6 text-brand-600", "aria-hidden": true })}
                  <h3 className="font-display font-semibold">{w.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto min-h-[480px] max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow={content.home.sections.process.eyebrow} title={content.home.sections.process.title} />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {content.process.map((p, i) => (
            <li key={p.t} className="relative list-none rounded-2xl border border-surface-border p-6">
              <Reveal className="h-full">
                <span className="process-number font-display text-4xl font-bold">{content.home.processNumberPrefix}{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.d}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="min-h-[620px] bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={content.home.sections.technology.eyebrow} title={content.home.sections.technology.title} />
          <ToolsGrid />
        </div>
      </section>

      <section className="mx-auto min-h-[380px] max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow={content.home.sections.projects.eyebrow}
          title={content.home.sections.projects.title}
          desc={content.home.sections.projects.desc}
          center
        />
        <Suspense fallback={<ProjectCardsFallback />}>
          <HomeProjects emptyDescription={content.projects.emptyState.description} />
        </Suspense>
        <div className="mt-10 text-center">
          <Button href="/projects" variant="secondary">
            {content.home.sections.projects.button}
          </Button>
        </div>
      </section>

      <section className="mx-auto min-h-[460px] max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow={content.home.sections.socialProof.eyebrow} title={content.home.sections.socialProof.title} center />
        <Testimonials />
      </section>

      <section className="min-h-[600px] bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={content.home.sections.faq.eyebrow} title={content.home.sections.faq.title} center />
          <FAQ />
        </div>
      </section>
      <CTASection />
    </>
  );
}

function DashboardFallback({ loadingLabel, rows }: { loadingLabel: string; rows: number[] }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-brand-100 via-brand-50 to-white blur-2xl" />
      <div className="relative flex h-[480px] flex-col overflow-hidden rounded-2xl border border-surface-border bg-white shadow-glow">
        <div className="flex shrink-0 items-center gap-2 border-b border-surface-border bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
          <span className="ml-3 text-xs font-medium text-ink-500">{loadingLabel}</span>
        </div>
        <div className="grid flex-1 gap-4 p-5 sm:grid-cols-5 min-h-0 animate-pulse">
          <div className="sm:col-span-2 space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded mb-4" />
            {rows.map((row) => (
              <div key={row} className="h-10 bg-gray-100 rounded-xl" />
            ))}
          </div>
          <div className="sm:col-span-3 space-y-4">
            <div className="h-32 bg-gray-100 rounded-xl" />
            <div className="h-20 bg-gray-100 rounded-xl" />
            <div className="h-20 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function HeroDashboardLoader() {
  const services = await loadServices();
  return <HeroDashboard services={services} />;
}

async function ServicesDataWrapper() {
  const services = await loadServices();
  return <ServicesPreview services={services} />;
}

function ProjectCardsFallback() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div key={item} className="h-80 animate-pulse rounded-2xl border border-surface-border bg-white/60" />
      ))}
    </div>
  );
}

async function HomeProjects({ emptyDescription }: { emptyDescription: string }) {
  const projects = await loadProjects();
  if (projects.length === 0) {
    return <p className="mt-12 text-center text-ink-500">{emptyDescription}</p>;
  }
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.slice(0, 3).map((project) => (
        <ProjectCard key={project.id || project.title} project={project} />
      ))}
    </div>
  );
}
