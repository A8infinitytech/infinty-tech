// components/Reveal.tsx
"use client";
// Fades content in when it scrolls into view.
import { useEffect, useRef } from "react";

export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer support: show content immediately instead of leaving it hidden.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      // Start 300px before the element enters the viewport; animate once.
      { rootMargin: "0px 0px 300px 0px", threshold: 0 },
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
