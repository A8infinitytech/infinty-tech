// Home page: hero, services, why us, process, tools, projects teaser, testimonials, FAQ and CTA.
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
import { process, why, SLOGAN } from "@/lib/data"; // services hata diya
import { ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-1.5 text-xs font-semibold text-brand-700">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-600" />
              {SLOGAN}
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Intelligent software that moves your{" "}
              <span className="text-brand-600">business forward</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
              Infinity Tech designs and builds AI automation, custom AI solutions, and modern web
              applications that solve real business problems.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">Let&apos;s Discuss Your Project</Button>
              <Button href="/services" variant="secondary" arrow={false}>
                Explore Our Services
              </Button>
            </div>
            <HeroAsk />
          </div>
          <HeroDashboard />
        </div>
      </section>

      <section className="mx-auto min-h-[720px] max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Everything you need to build with AI"
          desc="From automation to full web applications, one team across strategy, design, and engineering."
        />
        
        {/* No props passed, handles internally */}
        <ServicesPreview />
        
      </section>

      <section className="min-h-[480px] bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why Infinity Tech" title="Built on clarity and craft" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {why.map((w) => (
              <Reveal key={w.t}>
                <div className="h-full rounded-2xl border border-surface-border bg-white p-6">
                  <ShieldCheck className="mb-4 h-6 w-6 text-brand-600" aria-hidden />
                  <h3 className="font-display font-semibold">{w.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto min-h-[480px] max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="How we work" title="A simple, transparent process" />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.t}>
              <li className="relative list-none rounded-2xl border border-surface-border p-6">
                <span className="font-display text-4xl font-bold text-brand-200">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="min-h-[620px] bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Technology" title="Modern tools, chosen deliberately" />
          <ToolsGrid />
        </div>
      </section>

      <section className="mx-auto min-h-[380px] max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work coming soon"
          desc="Case studies will appear here once project details are provided."
          center
        />
        <div className="mt-8 text-center">
          <Button href="/projects" variant="secondary">
            Visit projects page
          </Button>
        </div>
      </section>

      <section className="mx-auto min-h-[460px] max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Social proof" title="What clients say" center />
        <Testimonials />
      </section>

      <section className="min-h-[600px] bg-surface py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Common questions" center />
          <FAQ />
        </div>
      </section>
      <CTASection />
    </>
  );
}