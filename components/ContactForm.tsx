// components/ContactForm.tsx
"use client";
// Contact form: sends email via API route.
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";

const field =
  "w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

// Props mein services receive kar rahe hain
type ServiceItem = { id?: string | number; title: string };

export default function ContactForm({ services }: { services: ServiceItem[] }) {
  const content = useSiteContent();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formError, setFormError] = useState("");
  const q = useSearchParams().get("service");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setFormError("");

    const d = new FormData(e.currentTarget);
    const payload = {
      name: d.get("name"),
      email: d.get("email"),
      service: d.get("service"),
      details: d.get("details"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Email could not be sent");
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Email could not be sent");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl border border-surface-border bg-white p-7 shadow-card"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">{content.contactForm.labels.name}</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">{content.contactForm.labels.email}</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium">{content.contactForm.labels.service}</label>
        <select 
          id="service" 
          name="service" 
          // Agar q (URL parameter) hai toh wo dikhao, warna pehli service ka title
          defaultValue={q ?? (services.length > 0 ? services[0].title : "")} 
          className={field}
        >
          {/* Database se aayi hui services map kar rahe hain */}
          {services?.map((s) => (
            <option key={s.id || s.title} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Other">{content.contactForm.otherOption}</option>
        </select>
      </div>
      <div>
        <label htmlFor="details" className="mb-1.5 block text-sm font-medium">{content.contactForm.labels.details}</label>
        <textarea id="details" name="details" rows={5} required className={field} />
      </div>

      <button
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>{content.contactForm.sending} {iconElement("Loader2", { className: "h-4 w-4 animate-spin" })}</>
        ) : (
          <>{content.contactForm.sendMessage} {iconElement("Send", { className: "h-4 w-4", "aria-hidden": true })}</>
        )}
      </button>

      {status === "sent" && (
        <p role="status" className="text-sm text-green-600">
          {content.contactForm.sent}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          {formError || content.contactForm.error}
        </p>
      )}
    </form>
  );
}
