"use client";
// Contact form: sends email via API route.
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Loader2 } from "lucide-react";
import { services } from "@/lib/data";

const field =
  "w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm transition focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const q = useSearchParams().get("service");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

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

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
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
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Name</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium">Service</label>
        <select id="service" name="service" defaultValue={q ?? services[0].title} className={field}>
          {services.map((s) => <option key={s.title}>{s.title}</option>)}
          <option>Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="details" className="mb-1.5 block text-sm font-medium">Project details</label>
        <textarea id="details" name="details" rows={5} required className={field} />
      </div>

      <button
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>Sending <Loader2 className="h-4 w-4 animate-spin" /></>
        ) : (
          <>Send message <Send className="h-4 w-4" aria-hidden /></>
        )}
      </button>

      {status === "sent" && (
        <p role="status" className="text-sm text-green-600">
          ✓ Message sent! We'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly.
        </p>
      )}
    </form>
  );
}