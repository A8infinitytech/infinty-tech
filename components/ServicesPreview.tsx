// components/ServicesPreview.tsx
"use client";

import Button from "@/components/Button";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { useSiteContent } from "@/lib/useSiteContent";

// Yahan hum props receive kar rahe hain
type ServiceItem = { id?: string | number; title: string; icon: string; description: string };

export default function ServicesPreview({ services }: { services: ServiceItem[] }) {
  const showAll = false;
  const content = useSiteContent();

  // Agar data nahi aaya toh kuch mat dikhao
  if (!services || services.length === 0) {
    return null;
  }

  const displayedServices = showAll ? services : services.slice(0, content.servicesPreview.previewLimit);
  const hasMore = services.length > content.servicesPreview.previewLimit;

  return (
    <div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedServices.map((s) => (
          <Reveal key={s.id || s.title}>
            {/* Database wale fields pass kar rahe hain */}
            <ServiceCard 
              icon={s.icon} 
              title={s.title} 
              desc={s.description} 
            />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {!showAll && (
            <Button href="/services" variant="secondary">
              {content.servicesPreview.button}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
