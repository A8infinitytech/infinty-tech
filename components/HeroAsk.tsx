"use client";
// Hero 'Ask AI' box: sends the question to the chatbot via a browser event.
import { useState } from "react";
import { Sparkles, ArrowUp } from "lucide-react";
export default function HeroAsk() {
  const [v, setV] = useState("");
  const ask = (t: string) => {
    if (t.trim()) {
      window.dispatchEvent(new CustomEvent("open-chat", { detail: t }));
      setV("");
    }
  };
  return (
    <div className="mt-8 max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(v);
        }}
        className="flex items-center gap-2 rounded-full border border-surface-border bg-white p-1.5 pl-5 shadow-card focus-within:border-brand-600"
      >
        <Sparkles className="h-4 w-4 shrink-0 text-brand-600" aria-hidden />
        <label htmlFor="hero-ask" className="sr-only">
          Ask Infinity AI
        </label>
        <input
          id="hero-ask"
          value={v}
          maxLength={200}
          onChange={(e) => setV(e.target.value)}
          placeholder="Ask our AI how we can help your business…"
          className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
        />
        <button
          aria-label="Ask"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {["What can you automate?", "How do we start?"].map((q) => (
          <button
            key={q}
            onClick={() => ask(q)}
            className="rounded-full border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 transition hover:bg-brand-50"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
