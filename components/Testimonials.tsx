// Testimonials cards, or a placeholder when no real testimonials exist.
import { Quote, MessageSquareQuote } from "lucide-react";
import { testimonials } from "@/lib/extra";
export default function Testimonials() {
  if (!testimonials.length)
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-brand-200 bg-brand-50/40 p-12 text-center">
        <MessageSquareQuote className="mx-auto h-9 w-9 text-brand-600" aria-hidden />
        <p className="mt-3 font-display text-lg font-semibold">Client stories coming soon</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-ink-500">
          Genuine client feedback will be featured here.
        </p>
      </div>
    );
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {testimonials.map((t) => (
        <figure key={t.name} className="rounded-2xl border border-surface-border bg-white p-7">
          <Quote className="h-6 w-6 text-brand-600" aria-hidden />
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
