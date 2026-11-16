// Dark call-to-action block shown near the bottom of pages.
import Button from "./Button";
import { SLOGAN } from "@/lib/data";
export default function CTASection() {
  return (
    <section className="min-h-[360px] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-white sm:px-16">
        <div aria-hidden className="pointer-events-none absolute" />
        <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-brand-200">
          {SLOGAN}
        </p>
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Ready to build something intelligent?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-brand-200">
          Tell us about your project and we will get back to you by email.
        </p>
        <div className="mt-8">
          <Button href="/contact">Let&apos;s Discuss Your Project</Button>
        </div>
      </div>
    </section>
  );
}
