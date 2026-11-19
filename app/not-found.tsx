// app/not-found.tsx
// 404 page for unknown URLs.
'use client'

import { useContext } from "react";
import Button from "@/components/Button";
import { SiteContentContext } from "@/lib/useSiteContent";
const fallback = {
  code: "404",
  heading: "Page not found",
  description: "The page you are looking for does not exist.",
  button: "Go home",
};
export default function NotFound() {
  const content = useContext(SiteContentContext);
  const text = content?.notFound ?? fallback;
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-bold text-brand-600">{text.code}</p>
      <h1 className="mt-3 font-display text-2xl font-bold">{text.heading}</h1>
      <p className="mt-2 text-ink-500">{text.description}</p>
      <div className="mt-8">
        <Button href="/">{text.button}</Button>
      </div>
    </section>
  );
}
