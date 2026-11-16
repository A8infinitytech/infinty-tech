'use client'
// Loading screen shown by Next.js while a route is loading.
import Logo from "@/components/Logo";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-6"
    >
      <div className="floaty">
        <Logo className="h-20" alt="" />
      </div>
      <div className="h-1 w-40 overflow-hidden rounded-full bg-brand-100">
        <div className="load-bar h-full w-1/2 rounded-full bg-brand-600" />
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
