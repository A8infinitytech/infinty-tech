"use client";

import { useState } from "react";
import Button from "@/components/Button";
import ServiceCard from "@/components/ServiceCard";
import Reveal from "@/components/Reveal";
import { ChevronDown, ChevronUp } from "lucide-react";
import { services } from "@/lib/data"; // Direct import karein

export default function ServicesPreview() {
  const [showAll, setShowAll] = useState(false);

  const displayedServices = showAll ? services : services.slice(0, 5);
  const hasMore = services.length > 5;

  return (
    <div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedServices.map((s) => (
          <Reveal key={s.title}>
            <ServiceCard icon={s.icon} title={s.title} desc={s.desc} />
          </Reveal>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* <button
            onClick={() => setShowAll(!showAll)}
            className="group inline-flex items-center gap-2 rounded-full border border-surface-border bg-white px-6 py-3 text-sm font-semibold text-ink-700 shadow-sm transition-all hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                View All Services ({services.length - 5} more) <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </>
            )}
          </button> */}
          
          {!showAll && (
            <Button href="/services" variant="secondary">
              Explore Services Page
            </Button>
          )}
        </div>
      )}
    </div>
  );
}