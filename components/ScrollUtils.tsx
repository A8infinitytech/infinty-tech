// components/ScrollUtils.tsx
"use client";
// Scroll progress bar and back-to-top button.
import { useEffect, useState } from "react";
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";
export default function ScrollUtils() {
  const content = useSiteContent();
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      setP(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight));
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <>
      <div
        aria-hidden
        className="fixed left-0 top-0 z-[60] h-1 bg-brand-600"
        style={{ width: `${p * 100}%` }}
      />
      {p > 0.08 && (
        <button
          onClick={() => window.scrollTo(0, 0)}
          aria-label={content.scrollUtils.backToTopLabel}
          className="fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-surface-border bg-white text-brand-600 shadow-card transition hover:-translate-y-0.5"
        >
          {iconElement("ArrowUp", { className: "h-5 w-5" })}
        </button>
      )}
    </>
  );
}
