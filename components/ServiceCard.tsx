// Card for one service, with a 'Get a quote' link to the contact form.
import type { LucideIcon } from "lucide-react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
export default function ServiceCard({
  icon: Icon,
  title,
  desc,
  points,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  points?: string[];
}) {
  return (
    <article className="group h-full rounded-2xl border border-surface-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card">
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 leading-relaxed text-ink-500">{desc}</p>
      {points && (
        <ul className="mt-5 space-y-2 text-sm text-ink-700">
          {points.map((p) => (
            <li key={p} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
              {p}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/contact?service=${encodeURIComponent(title)}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-all hover:gap-2"
      >
        Get a quote <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </article>
  );
}
