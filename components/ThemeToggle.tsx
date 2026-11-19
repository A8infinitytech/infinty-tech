// components/ThemeToggle.tsx
"use client";
// Dark/light mode button; saves the choice in localStorage.
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";
export default function ThemeToggle() {
  const content = useSiteContent();
  function toggle() {
    const d = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", d ? "dark" : "light");
    } catch {}
  }
  return (
    <button
      onClick={toggle}
      aria-label={content.themeToggle.ariaLabel}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-white text-ink-700 transition hover:border-brand-600 hover:text-brand-600"
    >
        {iconElement("Moon", { className: "theme-moon h-4 w-4", "aria-hidden": true })}
        {iconElement("Sun", { className: "theme-sun h-4 w-4", "aria-hidden": true })}
    </button>
  );
}
