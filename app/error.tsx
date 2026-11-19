// app/error.tsx
"use client";
// Error boundary page with a 'Try again' button.
import { useContext } from "react";
import Button from "@/components/Button";
import { SiteContentContext } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";
const fallback = {
  heading: "Something went wrong",
  description: "An unexpected error occurred. Please try again.",
  tryAgain: "Try again",
  goHome: "Go home",
};
export default function Error({ reset }: { error: Error; reset: () => void }) {
  const content = useContext(SiteContentContext);
  const text = content?.error ?? fallback;
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      {iconElement("AlertTriangle", { className: "h-12 w-12 text-brand-600", "aria-hidden": true })}
      <h1 className="mt-5 font-display text-3xl font-bold">{text.heading}</h1>
      <p className="mt-3 text-ink-500">{text.description}</p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {text.tryAgain}
        </button>
        <Button href="/" variant="secondary" arrow={false}>
          {text.goHome}
        </Button>
      </div>
    </section>
  );
}
