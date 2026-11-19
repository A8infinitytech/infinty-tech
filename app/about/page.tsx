// app/about/page.tsx
// About page: story, vision, mission, values, process, services and tools.
import { Suspense } from "react";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ToolsGrid from "@/components/ToolsGrid";
import ServiceCard from "@/components/ServiceCard";
import { type SiteContent, iconElement } from "@/lib/data";
import { getSiteContent } from "@/lib/site-content";
import { getCmsServices } from "@/lib/cms/services";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return content.about.metadata;
}

export default async function About() {
  const content = await getSiteContent();
  const { about } = content;

  return (
    <>
      <section className="min-h-[360px] bg-gradient-to-b from-brand-50/60 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow={about.intro.eyebrow}
            title={content.constants.slogan}
            desc={about.intro.desc}
          />
        </div>
      </section>
      <section className="mx-auto min-h-[320px] max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {about.blocks.map((b) => (
            <div key={b.t} className="rounded-2xl border border-surface-border bg-white p-7">
                {iconElement(b.i || content.iconMeta.fallbackName, { className: "mb-4 h-7 w-7 text-brand-600", "aria-hidden": true })}
                <h3 className="font-display text-xl font-semibold">{b.t}</h3>
                <p className="mt-2 text-ink-500">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="min-h-[400px] bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={about.sections.values.eyebrow} title={about.sections.values.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v) => (
              <div key={v.t} className="rounded-2xl border border-surface-border bg-white p-6">
                {iconElement(v.i || content.iconMeta.fallbackName, { className: "mb-4 h-6 w-6 text-brand-600", "aria-hidden": true })}
                <h3 className="font-display font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm text-ink-500">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto min-h-[400px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={about.sections.process.eyebrow} title={about.sections.process.title} />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {content.process.map((p, i) => (
            <li key={p.t} className="list-none rounded-2xl border border-surface-border p-6">
              <span className="font-display text-4xl font-bold text-brand-200">{about.processNumberPrefix}{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-ink-500">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>
      
      <section className="min-h-[700px] bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow={about.sections.capabilities.eyebrow} title={about.sections.capabilities.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<div className="col-span-full py-10 text-center text-ink-500">{about.loadingCapabilities}</div>}>
              <CapabilitiesList content={content} />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="mx-auto min-h-[620px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow={about.sections.tools.eyebrow} title={about.sections.tools.title} />
        <ToolsGrid />
      </section>
      <CTASection />
    </>
  );
}

async function CapabilitiesList({ content }: { content: SiteContent }) {
  const servicesData = await getCmsServices();
  
  if (!servicesData || servicesData.length === 0) {
    return <p className="col-span-full text-ink-500">{content.about.noServices}</p>;
  }

  return (
    <>
      {servicesData.map((s) => (
        <ServiceCard 
          key={s.id || s.title} 
          icon={s.icon} 
          title={s.title} 
          desc={s.description}
        />
      ))}
    </>
  );
}
