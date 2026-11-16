// FAQ list using native <details> elements (no JavaScript needed).
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
export default function FAQ() {
  return (
    <div className="mx-auto mt-12 max-w-3xl divide-y divide-surface-border rounded-2xl border border-surface-border bg-white">
      {faqs.map((f) => (
        <details key={f.q} className="group p-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {f.q}
            <Plus
              className="h-5 w-5 shrink-0 text-brand-600 transition-transform group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <p className="mt-3 leading-relaxed text-ink-500">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
