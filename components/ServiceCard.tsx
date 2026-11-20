// components/ServiceCard.tsx
"use client";
// Card for one service, with a 'Get a quote' link to the contact form.
import Link from "next/link";
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";

export default function ServiceCard({
  icon,
  title,
  desc,
  points,
}: {
  icon: string;
  title: string;
  desc: string;
  points?: string[];
}) {
  const content = useSiteContent();
  return (
    <article className="group h-full rounded-2xl border border-surface-border bg-white p-7 transition-transform duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        {iconElement(icon || content.serviceCard.fallbackIconName, { className: "h-6 w-6", "aria-hidden": true })}
      </span>
      
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 leading-relaxed text-ink-500">{desc}</p>
      
      {points && points.length > 0 && (
        <ul className="mt-5 space-y-2 text-sm text-ink-700">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              {iconElement("Check", { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-600", "aria-hidden": true })}
              {p}
            </li>
          ))}
        </ul>
      )}
      
      <Link
        href={`${content.serviceCard.contactBaseUrl}${encodeURIComponent(title)}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:gap-2"
      >
        {content.serviceCard.quoteLabel} {iconElement("ArrowRight", { className: "h-4 w-4", "aria-hidden": true })}
      </Link>
    </article>
  );
}
