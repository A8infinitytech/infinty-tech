"use client";
// Dark/light mode button; saves the choice in localStorage.
import { Moon, Sun } from "lucide-react";
export default function ThemeToggle() {
  function toggle() {
    const d = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", d ? "dark" : "light");
    } catch {}
  }
  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark and light mode"
      className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-white text-ink-700 transition hover:border-brand-600 hover:text-brand-600"
    >
      <Moon className="theme-moon h-4 w-4" aria-hidden />
      <Sun className="theme-sun h-4 w-4" aria-hidden />
    </button>
  );
}
