// components/FAQ.tsx
"use client";
// FAQ list using native <details> elements (no JavaScript needed).
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";
export default function FAQ() {
  const content = useSiteContent();
  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-surface-border rounded-2xl border border-surface-border bg-white">
          {content.faq.map((f) => (
        <details key={f.q} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {f.q}
            {iconElement("Plus", { className: "h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-45", "aria-hidden": true })}
          </summary>
          <p className="mt-3 leading-relaxed text-ink-500">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
