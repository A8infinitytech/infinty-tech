// components/CTASection.tsx
"use client";

// Bottom-of-page call to action.
import { useSiteContent } from "@/lib/useSiteContent";
import Button from "./Button";

export default function CTASection() {
  const content = useSiteContent();
  return (
    <section className="relative overflow-hidden bg-blue-700 py-20 text-white">
      {/* soft blue glow accents */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -left-20 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-sky-300 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
          {content.cta.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-blue-100">
          {content.cta.description} {content.constants.slogan}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="/contact"
            variant="secondary"
            className="!bg-white !text-blue-700 hover:!bg-blue-50"
            arrow={false}
          >
            {content.cta.button}
          </Button>
        </div>
      </div>
    </section>
  );
}