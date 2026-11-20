// app/services/page.tsx
// Services page: grid of all service cards.
import { Suspense } from "react";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import { getSiteContent } from "@/lib/site-content";
import { getCmsServices } from "@/lib/cms/services";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.servicesPage.heading.title,
    description: content.servicesPage.heading.desc,
  };
}

// Main Page Component (Server Component)
export default async function Services() {
  const content = await getSiteContent();
  const { servicesPage } = content;
  return (
    <>
      <section className="mx-auto min-h-[720px] max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          as="h1"
          eyebrow={servicesPage.heading.eyebrow}
          title={servicesPage.heading.title}
          desc={servicesPage.heading.desc}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Data fetch ko Suspense ke andar wrap kar diya */}
          <Suspense fallback={<div className="col-span-full py-10 text-center text-ink-500">{servicesPage.loading}</div>}>
            <ServicesList noServices={servicesPage.noServices} />
          </Suspense>
        </div>
      </section>
      <CTASection />
    </>
  );
}

// Alag Component jo data fetch karega
async function ServicesList({ noServices }: { noServices: string }) {
  const servicesData = await getCmsServices();

  if (!servicesData || servicesData.length === 0) {
    return <div className="col-span-full py-10 text-center text-ink-500">{noServices}</div>;
  }

  return (
    <>
      {servicesData.map((s) => (
        <ServiceCard 
          key={s.id} 
          title={s.title} 
          desc={s.description} 
          icon={s.icon} 
        />
      ))}
    </>
  );
}
