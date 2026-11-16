// Services page: grid of all service cards.
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/data";
export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automation, AI development, web development, e-commerce development and AI-powered web apps.",
};
export default function Services() {
  return (
    <>
      <section className="mx-auto min-h-[720px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="Solutions for every stage of your digital growth"
          desc="Five focused services, delivered with the same standard of design and engineering."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
