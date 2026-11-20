// components/ToolsGrid.tsx
"use client";
// Grid of technology/tool cards, driven by lib/data.ts.
import Reveal from "./Reveal";
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";

export default function ToolsGrid() {
  const content = useSiteContent();
  return (
    // lg:grid-cols-6 lagaya hai taake badi screen par 6 cards ek line mein aayein
    <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
      {content.tools.map((t) => (
        <li key={t.name}>
          <Reveal>
            <div className="group flex h-full flex-col items-center justify-center rounded-2xl border border-surface-border bg-white p-5 text-center transition-transform duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-lg hover:shadow-brand-100/50">
              
              {/* Icon Box - Size thoda chota kiya hai taake 6 cards fit ho sakein */}
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                {iconElement(t.icon, { className: "h-6 w-6", "aria-hidden": true })}
              </span>
              
              {/* Text Section - Font size thoda adjust kiya hai */}
              <div className="w-full">
                <p className="font-display text-sm font-semibold text-ink-900">
                  {t.name}
                </p>
                <p className="mt-1 text-[11px] sm:text-xs text-ink-500 line-clamp-2">
                  {t.desc}
                </p>
              </div>
              
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
