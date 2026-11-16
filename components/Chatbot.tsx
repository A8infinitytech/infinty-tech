"use client";
// Floating chat widget; calls /api/chat (Groq) with a basic fallback if the API fails.
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { services, EMAIL, PHONE, SLOGAN } from "@/lib/data";

type Msg = { from: "bot" | "me"; text: string };

// Fallback used only when the Groq API is unavailable.
function fallback(q: string): string {
  const t = q.toLowerCase();
  const s = services.find((s) => t.includes(s.title.toLowerCase().split(" ")[0]));
  if (s) return `${s.title}: ${s.desc}`;
  if (/price|cost|quote|budget/.test(t))
    return `Pricing depends on the project. Email ${EMAIL} for a quote.`;
  if (/contact|email|start|hire/.test(t))
    return `Email us at ${EMAIL}, call ${PHONE}, or use the Contact page.`;
  return `We offer: ${services.map((s) => s.title).join(", ")}. For anything else, email ${EMAIL}.`;
}

// Renders **bold** and "- " bullet lines as formatted text, so raw markdown symbols never show.
function inline(line: string) {
  return line
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.length > 4 && part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );
}

function Rich({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let items: string[] = [];
  const flush = () => {
    if (!items.length) return;
    out.push(
      <ul key={out.length} className="my-1 list-disc space-y-1 pl-5">
        {items.map((it, i) => (
          <li key={i}>{inline(it)}</li>
        ))}
      </ul>,
    );
    items = [];
  };
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .forEach((l) => {
      const m = l.match(/^[-*\u2022]\s+(.*)/);
      if (m) items.push(m[1]);
      else {
        flush();
        out.push(
          <p key={out.length} className="my-1">
            {inline(l.replace(/^#+\s*/, ""))}
          </p>,
        );
      }
    });
  flush();
  return <>{out}</>;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState("");
  const [busy, setBusy] = useState(false);
  
  // ✅ NEW: Ref for the messages container instead of the end div
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Hi! I'm Infinity AI. ${SLOGAN} Ask me about our services.` },
  ]);
  const ref = useRef(msgs);
  ref.current = msgs;
  const sendRef = useRef<(t: string) => void>(() => {});

  // ✅ FIXED: Scroll the container directly, not the whole page
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [msgs, open, busy]);

  async function send(text: string) {
    text = text.trim();
    if (!text || busy) return;
    setV("");
    setBusy(true);
    const next = [...ref.current, { from: "me" as const, text }];
    setMsgs(next);
    const history = next
      .slice(1)
      .map((m) => ({ role: m.from === "me" ? "user" : "assistant", content: m.text }));
    let answer = "";
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (r.ok) answer = (await r.json()).reply || "";
    } catch {}
    setMsgs((m) => [...m, { from: "bot", text: answer || fallback(text) }]);
    setBusy(false);
  }
  sendRef.current = send;
  useEffect(() => {
    const h = (e: Event) => {
      setOpen(true);
      const t = (e as CustomEvent<string>).detail;
      if (t) sendRef.current(t);
    };
    window.addEventListener("open-chat", h);
    return () => window.removeEventListener("open-chat", h);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <section
          aria-label="Chat assistant"
          className="mb-3 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-surface-border bg-white shadow-glow"
        >
          <header className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <div>
              <p className="font-display font-semibold">Infinity AI</p>
              <p className="text-xs text-brand-100">Intelligence That Empowers</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </header>
          
          {/* ✅ FIXED: Added ref to this container */}
          <div 
            ref={chatContainerRef}
            role="log" 
            aria-live="polite" 
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "me" ? "ml-auto bg-brand-600 text-white" : "bg-surface text-ink"}`}
              >
                <Rich text={m.text} />
              </div>
            ))}
            {busy && (
              <p className="w-fit rounded-2xl bg-surface px-4 py-2.5 text-sm text-ink-500">
                <span className="pulse-dot">Thinking…</span>
              </p>
            )}
            {/* End div removed since we're scrolling the container now */}
          </div>
          
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {["Services", "Pricing", "How to start"].map((c) => (
              <button
                key={c}
                onClick={() => send(c)}
                className="rounded-full border border-brand-200 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50"
              >
                {c}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(v);
            }}
            className="flex gap-2 border-t border-surface-border p-3"
          >
            <label htmlFor="chat-in" className="sr-only">
              Message
            </label>
            <input
              id="chat-in"
              value={v}
              maxLength={500}
              onChange={(e) => setV(e.target.value)}
              placeholder="Type a message…"
              className="min-w-0 flex-1 rounded-full border border-surface-border bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
            <button
              aria-label="Send"
              disabled={busy}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow transition hover:scale-105 hover:bg-brand-700"
      >
        {open ? <X /> : <MessageCircle />}
      </button>
    </div>
  );
}