// components/Testimonials.tsx
"use client";
// Testimonials cards, or a placeholder when no real testimonials exist.
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";
export default function Testimonials() {
  const content = useSiteContent();
  if (!content.testimonials.length)
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-12 text-center">
        {iconElement("MessageSquareQuote", { className: "mx-auto h-9 w-9 text-brand-600", "aria-hidden": true })}
        <p className="mt-3 font-display text-lg font-semibold">{content.testimonialsPlaceholder.heading}</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-500">
          {content.testimonialsPlaceholder.description}
        </p>
      </div>
    );
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {content.testimonials.map((t) => (
        <figure key={t.name} className="rounded-2xl border border-surface-border bg-white p-7">
          {iconElement("Quote", { className: "h-6 w-6 text-brand-600", "aria-hidden": true })}
          <blockquote className="mt-4 leading-relaxed text-ink-700">{t.quote}</blockquote>
          <figcaption className="mt-5 text-sm">
            <strong>{t.name}</strong>
            <span className="text-ink-500"> · {t.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
