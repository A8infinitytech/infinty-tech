// components/Chatbot.tsx
"use client";
// Floating chat widget; calls /api/chat (Groq) with a basic fallback if the API fails.
import { useState, useRef, useEffect } from "react";
import { useSiteContent } from "@/lib/useSiteContent";
import { type ChatbotContent, iconElement } from "@/lib/data";

type Msg = { from: "bot" | "me"; text: string };
type ChatbotService = { title: string; description: string };
type ChatbotSettings = { email?: string; phone?: string; slogan?: string; [key: string]: unknown };

function isChatbotService(row: unknown): row is ChatbotService {
  if (typeof row !== "object" || row === null) return false;
  const value = row as { title?: unknown; description?: unknown };
  return typeof value.title === "string" && typeof value.description === "string";
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

// Fallback function ab Settings aur Services dono ko receive karega
function fallback(
  q: string,
  servicesList: ChatbotService[],
  settings: ChatbotSettings | null,
  chatbot: ChatbotContent,
): string {
  const t = q.toLowerCase();
  
  // Dynamic settings se email aur phone uthayenge, agar na mile toh default
  const email = settings?.email || chatbot.fallbackDefaults.email;
  const phone = settings?.phone || chatbot.fallbackDefaults.phone;

  // servicesList se dhoondh rahe hain
  const s = servicesList.find((s) => t.includes(s.title.toLowerCase().split(" ")[0]));
  if (s) return fill(chatbot.fallbackTemplates.service, { title: s.title, description: s.description });
  
  if (/price|cost|quote|budget/.test(t))
    return fill(chatbot.fallbackTemplates.pricing, { email });
  if (/contact|email|start|hire/.test(t))
    return fill(chatbot.fallbackTemplates.contact, { email, phone });
    
  const serviceNames = servicesList.length > 0 
    ? servicesList.map((s) => s.title).join(", ") 
    : chatbot.fallbackTemplates.defaultServiceNames;
    
  return fill(chatbot.fallbackTemplates.default, { serviceNames, email });
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
  const content = useSiteContent();
  const [open, setOpen] = useState(false);
  const [v, setV] = useState("");
  const [busy, setBusy] = useState(false);
  
  // States for Dynamic Data
  const [servicesList, setServicesList] = useState<ChatbotService[]>([]);
  const [settings, setSettings] = useState<ChatbotSettings | null>(null);

  // Page load hote hi dono API call karega (Inspector mein dikhega)
  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, settingsRes] = await Promise.all([
          fetch("/api/cms/services"),
          fetch("/api/cms/site-settings")
        ]);
        
        if (servicesRes.ok) {
          const payload = await servicesRes.json();
          const rows = Array.isArray(payload) ? payload : Array.isArray(payload.data) ? payload.data : [];
          setServicesList(rows.filter(isChatbotService));
        }
        if (settingsRes.ok) {
          const payload = await settingsRes.json();
          setSettings((payload?.data ?? payload) as ChatbotSettings | null);
        }
      } catch (err) {
        console.error("Failed to load chatbot data", err);
      }
    }
    loadData();
  }, []);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const welcome = settings?.slogan
    ? fill(content.chatbot.welcomeWithSlogan, { slogan: settings.slogan })
    : content.chatbot.welcome;

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const sendRef = useRef<(t: string) => void>(() => {});

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [welcome, msgs, open, busy]);

  async function send(text: string) {
    text = text.trim();
    if (!text || busy) return;
    setV("");
    setBusy(true);
    setMsgs((m) => [...m, { from: "me", text }]);
    const history = [
      { role: "assistant" as const, content: welcome },
      ...msgs.map((m) => ({
        role: (m.from === "me" ? "user" : "assistant") as "user" | "assistant",
        content: m.text,
      })),
      { role: "user" as const, content: text },
    ];
    let answer = "";
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (r.ok) answer = (await r.json()).reply || "";
    } catch {}

    // Fallback function mein settings aur services pass kar diya hai
    setMsgs((m) => [...m, { from: "bot", text: answer || fallback(text, servicesList, settings, content.chatbot) }]);
    setBusy(false);
  }

  useEffect(() => {
    sendRef.current = send;
  });

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
          aria-label={content.chatbot.ariaLabel}
          className="mb-3 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-surface-border bg-white shadow-glow"
        >
          <header className="flex items-center justify-between bg-brand-600 px-4 py-3 text-white">
            <div>
              <p className="font-display font-semibold">{content.chatbot.title}</p>
              <p className="text-xs text-brand-100">{content.chatbot.subtitle}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={content.chatbot.closeLabel}>
              {iconElement("X", { className: "h-5 w-5", "aria-hidden": true })}
            </button>
          </header>
          
          <div 
            ref={chatContainerRef}
            role="log" 
            aria-live="polite" 
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {[{ from: "bot" as const, text: welcome }, ...msgs].map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.from === "me" ? "ml-auto bg-brand-600 text-white" : "bg-surface text-ink"}`}
              >
                <Rich text={m.text} />
              </div>
            ))}
            {busy && (
              <p className="w-fit rounded-2xl bg-surface px-4 py-2.5 text-sm text-ink-500">
                <span className="pulse-dot">{content.chatbot.thinking}</span>
              </p>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {content.chatbot.suggestions.map((c) => (
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
              {content.chatbot.messageLabel}
            </label>
            <input
              id="chat-in"
              value={v}
              maxLength={500}
              onChange={(e) => setV(e.target.value)}
              placeholder={content.chatbot.messagePlaceholder}
              className="min-w-0 flex-1 rounded-full border border-surface-border bg-white px-4 py-2 text-sm focus:border-brand-600 focus:outline-none"
            />
            <button
              aria-label={content.chatbot.sendLabel}
              disabled={busy}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white disabled:opacity-50"
            >
              {iconElement("Send", { className: "h-4 w-4", "aria-hidden": true })}
            </button>
          </form>
        </section>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? content.chatbot.closeLabel : content.chatbot.openLabel}
        aria-expanded={open}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow transition hover:scale-105 hover:bg-brand-700"
      >
        {open ? iconElement("X", { "aria-hidden": true }) : iconElement("MessageCircle", { "aria-hidden": true })}
      </button>
    </div>
  );
}