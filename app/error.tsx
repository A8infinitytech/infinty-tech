"use client";
// Error boundary page with a 'Try again' button.
import { AlertTriangle } from "lucide-react";
import Button from "@/components/Button";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="h-12 w-12 text-brand-600" aria-hidden />
      <h1 className="mt-5 font-display text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-ink-500">An unexpected error occurred. Please try again.</p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Try again
        </button>
        <Button href="/" variant="secondary" arrow={false}>
          Go home
        </Button>
      </div>
    </section>
  );
}
