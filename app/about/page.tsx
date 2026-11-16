// About page: story, vision, mission, values, process, services and tools.
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import ToolsGrid from "@/components/ToolsGrid";
import ServiceCard from "@/components/ServiceCard";
import { Target, Eye, Wrench, Lightbulb, ShieldCheck, MessagesSquare, Rocket } from "lucide-react";
import { services, process, SLOGAN } from "@/lib/data";
export const metadata: Metadata = {
  title: "About",
  description: "Learn about Infinity Tech's vision, mission, values and approach.",
};
// DRAFT copy: replace with your own wording where needed.
const blocks = [
  { i: Eye, t: "Vision", d: "To help businesses use AI and modern software with confidence." },
  {
    i: Target,
    t: "Mission",
    d: "To design and build reliable, practical technology that solves real business problems.",
  },
  {
    i: Wrench,
    t: "Approach",
    d: "Understand first, scope clearly, build in iterations, and keep improving after launch.",
  },
];
const values = [
  { i: Lightbulb, t: "Smart by design", d: "We choose tools and AI where they genuinely help." },
  { i: Rocket, t: "Fast delivery", d: "Iterative builds so progress is visible early." },
  { i: ShieldCheck, t: "Quality first", d: "Clean, maintainable, well-structured code." },
  { i: MessagesSquare, t: "Open communication", d: "Clear, honest updates in plain language." },
];
export default function About() {
  return (
    <>
      <section className="min-h-[360px] bg-gradient-to-b from-brand-50/60 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <SectionHeading
            eyebrow="About Infinity Tech"
            title={SLOGAN}
            desc="Infinity Tech is a technology agency focused on AI solutions and modern web development. We help businesses and brands automate work, launch professional websites and online stores, and build smart web applications."
          />
        </div>
      </section>
      <section className="mx-auto min-h-[320px] max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.t} className="rounded-2xl border border-surface-border bg-white p-7">
              <b.i className="mb-4 h-7 w-7 text-brand-600" aria-hidden />
              <h3 className="font-display text-xl font-semibold">{b.t}</h3>
              <p className="mt-2 text-ink-500">{b.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="min-h-[400px] bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Values" title="What guides our work" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.t} className="rounded-2xl border border-surface-border bg-white p-6">
                <v.i className="mb-4 h-6 w-6 text-brand-600" aria-hidden />
                <h3 className="font-display font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm text-ink-500">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto min-h-[400px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="How we work" title="From idea to launch" />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.t} className="list-none rounded-2xl border border-surface-border p-6">
              <span className="font-display text-4xl font-bold text-brand-200">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.t}</h3>
              <p className="mt-2 text-sm text-ink-500">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="min-h-[700px] bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Capabilities" title="What we deliver" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} desc={s.desc} />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto min-h-[620px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Tools" title="Technology we work with" />
        <ToolsGrid />
      </section>
      <CTASection />
    </>
  );
}
