// components/admin/EntityDashboard.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Copy,
  Database,
  FileText,
  ImagePlus,
  Layers3,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { entityConfigs, type EntityConfig, type FieldConfig } from "@/lib/cms/entity-config";

type Row = Record<string, unknown>;
type Status = { kind: "ok" | "error"; message: string } | null;

const panel =
  "rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-500/70 focus:border-brand-600 focus:ring-4 focus:ring-brand-100/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:focus:bg-white/10";
const primary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-600/25 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60";
const secondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-ink-700 transition hover:border-brand-300 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-brand-400/40 dark:hover:text-white";
const danger =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/20 dark:bg-red-500/5 dark:text-red-300 dark:hover:bg-red-500/10";

function isRow(value: unknown): value is Row {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function valueAsString(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return "";
}

function emptyRow(config: EntityConfig): Row {
  return Object.fromEntries(
    config.fields.map((item) => [
      item.name,
      item.type === "boolean" ? false : item.type === "number" ? 0 : item.options?.[0] ?? "",
    ]),
  );
}

function validateDraft(config: EntityConfig, draft: Row): string | null {
  for (const field of config.fields) {
    const raw = draft[field.name];
    const empty = raw === undefined || raw === null || (typeof raw === "string" && raw.trim() === "");
    if (empty) {
      if (field.required) return `${field.label} is required`;
      continue;
    }
    if (field.type === "boolean") continue;
    const value = valueAsString(raw).trim();
    if (field.type === "number" && !Number.isFinite(Number(value))) return `${field.label} must be a number`;
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return `${field.label} must be a valid email address`;
    }
    if (
      (field.type === "url" || field.type === "image") &&
      !/^(\/|#|https?:\/\/|mailto:|tel:|data:image\/)/i.test(value)
    ) {
      return `${field.label} must be a valid link`;
    }
    if (field.type === "image" && value.startsWith("data:image/") && value.length > 3_000_000) {
      return `${field.label} must be smaller than 2 MB`;
    }
    if (field.options && value && !field.options.includes(value)) {
      return `${field.label} must be one of ${field.options.join(", ")}`;
    }
  }
  return null;
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const stringValue = valueAsString(value);

  function readFile(file: File | undefined) {
    if (!file) return;
    if (file.size > 2_000_000) {
      onChange("__TOO_LARGE__");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  }

  if (field.type === "boolean") {
    const checked = value === true || value === "true";
    return (
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={field.label}
          onClick={() => onChange(!checked)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-brand-600" : "bg-slate-300 dark:bg-white/20"}`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${checked ? "left-[22px]" : "left-0.5"}`}
          />
        </button>
        <span className="font-mono text-xs text-ink-500 dark:text-slate-400">{String(checked)}</span>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <select value={stringValue} onChange={(event) => onChange(event.target.value)} className={inputClass}>
        {(field.options ?? []).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <div className="space-y-2">
      {field.type === "textarea" ? (
        <textarea
          rows={4}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.help ?? field.label}
          className={`${inputClass} resize-y leading-relaxed`}
        />
      ) : (
        <input
          type={field.type === "number" ? "number" : field.type === "email" ? "email" : "text"}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.help ?? field.label}
          className={inputClass}
        />
      )}
      {field.type === "image" && (
        <div className="flex flex-wrap items-center gap-3">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => readFile(event.target.files?.[0])}
          />
          <button type="button" className={secondary} onClick={() => fileRef.current?.click()}>
            <ImagePlus className="h-3.5 w-3.5" /> Upload image
          </button>
          {stringValue.startsWith("data:image/") || stringValue.startsWith("/") || /^https?:\/\//.test(stringValue) ? (
            <Image
              src={stringValue}
              alt=""
              width={48}
              height={48}
              unoptimized
              className="h-12 w-12 rounded-lg border border-slate-200 object-cover dark:border-white/10"
            />
          ) : null}
        </div>
      )}
      {field.help && field.type !== "image" && (
        <p className="text-[11px] leading-relaxed text-ink-500 dark:text-slate-400">{field.help}</p>
      )}
    </div>
  );
}

export default function EntityDashboard() {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState(entityConfigs[0]?.key ?? "");
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [singleton, setSingleton] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Row | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [copied, setCopied] = useState(false);

  const config = useMemo(
    () => entityConfigs.find((item) => item.key === selectedKey) ?? entityConfigs[0],
    [selectedKey],
  );
  const groups = useMemo(() => {
    const term = search.trim().toLowerCase();
    const grouped = new Map<string, EntityConfig[]>();
    for (const item of entityConfigs) {
      if (term && !`${item.label} ${item.key} ${item.group}`.toLowerCase().includes(term)) continue;
      grouped.set(item.group, [...(grouped.get(item.group) ?? []), item]);
    }
    return [...grouped.entries()];
  }, [search]);

  const loadEntity = useCallback(async () => {
    if (!config) return;
    setLoading(true);
    setStatus(null);
    setLoadError(null);
    try {
      const response = await fetch(`/api/cms/${config.key}?all=1`, { cache: "no-store" });
      const payload = (await response.json()) as { ok?: boolean; data?: unknown; error?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error ?? `Request failed (${response.status})`);
      if (config.kind === "singleton") {
        const row = isRow(payload.data) ? payload.data : null;
        setSingleton(row);
        setDraft(row ? { ...row } : emptyRow(config));
        setRows([]);
      } else {
        const list = Array.isArray(payload.data) ? payload.data.filter(isRow) : [];
        setRows(list);
        setSingleton(null);
        setDraft(null);
        setEditingId(null);
      }
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Could not load data";
      setLoadError(message);
      setStatus({ kind: "error", message });
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    queueMicrotask(() => void loadEntity());
  }, [loadEntity]);

  function selectEntity(key: string) {
    setSelectedKey(key);
    setStatus(null);
    setLoadError(null);
    setCopied(false);
  }

  function startCreate() {
    if (!config) return;
    setDraft(emptyRow(config));
    setEditingId("new");
    setStatus(null);
  }

  function startEdit(row: Row) {
    setDraft({ ...row });
    setEditingId(valueAsString(row.id));
    setStatus(null);
  }

  function resetDraft() {
    if (!config) return;
    if (config.kind === "singleton") setDraft(singleton ? { ...singleton } : emptyRow(config));
    else {
      setDraft(null);
      setEditingId(null);
    }
    setStatus(null);
  }

  async function save() {
    if (!config || !draft) return;
    const invalid = validateDraft(config, draft);
    if (invalid) {
      setStatus({ kind: "error", message: invalid });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const isCreate = config.kind === "list" && editingId === "new";
      const method = isCreate ? "POST" : "PUT";
      const body: Row = Object.fromEntries(config.fields.map((item) => [item.name, draft[item.name]]));
      if (!isCreate) body.id = config.kind === "singleton" ? "default" : editingId;
      const response = await fetch(`/api/cms/${config.key}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error ?? `Request failed (${response.status})`);
      setStatus({ kind: "ok", message: `${config.label} saved successfully.` });
      setEditingId(config.kind === "singleton" ? "default" : null);
      await loadEntity();
      router.refresh();
    } catch (cause) {
      setStatus({ kind: "error", message: cause instanceof Error ? cause.message : "Could not save" });
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!config || !deleteTarget) return;
    const id = valueAsString(deleteTarget.id);
    if (!id) {
      setStatus({ kind: "error", message: "This row has no id and cannot be deleted." });
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`/api/cms/${config.key}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const payload = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error ?? `Request failed (${response.status})`);
      setDeleteTarget(null);
      setStatus({ kind: "ok", message: `${config.label} entry deleted.` });
      await loadEntity();
      router.refresh();
    } catch (cause) {
      setStatus({ kind: "error", message: cause instanceof Error ? cause.message : "Could not delete" });
    } finally {
      setBusy(false);
    }
  }

  async function copyEndpoint() {
    if (!config) return;
    try {
      await navigator.clipboard.writeText(`/api/cms/${config.key}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setStatus({ kind: "error", message: "Clipboard unavailable in this browser." });
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => undefined);
    router.push("/admin/login");
    router.refresh();
  }

  function renderFields() {
    if (!config || !draft) return null;
    return (
      <div className="grid gap-5 md:grid-cols-2">
        {config.fields.map((item) => (
          <label key={item.name} className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-ink-700 dark:text-slate-200">{item.label}</span>
              <span className="font-mono text-[10px] text-ink-500 dark:text-slate-500">{item.name}</span>
            </div>
            <FieldInput
              field={item}
              value={draft[item.name]}
              onChange={(value) => setDraft((previous) => (previous ? { ...previous, [item.name]: value } : previous))}
            />
          </label>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-ink dark:bg-[#080816] dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[292px] flex-col border-r border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0b1d]/90 lg:flex">
        <div className="flex h-full flex-col p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-[#4b3bff] text-white shadow-lg shadow-brand-600/25">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-base font-semibold">Infinity Admin</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-slate-400">
                Content studio
              </p>
            </div>
          </div>

          <label className="relative mt-6 block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search entities..."
              aria-label="Search entities"
              className={`${inputClass} pl-9 text-xs`}
            />
          </label>

          <nav className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1" aria-label="Content entities">
            {groups.map(([group, items]) => (
              <div key={group}>
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-slate-400">
                  {group}
                </p>
                <div className="space-y-1">
                  {items.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      aria-current={selectedKey === item.key ? "page" : undefined}
                      onClick={() => selectEntity(item.key)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                        selectedKey === item.key
                          ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
                          : "text-ink-500 hover:bg-slate-100 hover:text-ink dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                      }`}
                    >
                      {item.kind === "singleton" ? (
                        <Settings2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <Layers3 className="h-4 w-4 shrink-0" />
                      )}
                      <span className="min-w-0 flex-1 truncate text-xs font-semibold">{item.label}</span>
                      <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-bold">
                        {item.kind === "singleton" ? "one" : "list"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {groups.length === 0 && (
              <p className="px-2 py-6 text-center text-xs text-ink-500 dark:text-slate-400">No entities found.</p>
            )}
          </nav>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-brand-100 bg-brand-50/70 p-3 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-700 dark:text-brand-200">
                <ShieldCheck className="h-4 w-4" /> Protected workspace
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-500 dark:text-slate-400">
                Every save updates the shared content API and refreshes the public site.
              </p>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-ink-500 transition hover:text-brand-700 dark:text-slate-400 dark:hover:text-white"
            >
              View live site <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[292px]">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0b1d]/85">
          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-slate-400">
              <span>Content studio</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-semibold text-ink dark:text-white">{config?.label ?? "Entity"}</span>
            </div>
            <button type="button" onClick={logout} className={secondary}>
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
          <nav className="mx-auto flex max-w-[1400px] gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:hidden" aria-label="Content entities">
            {entityConfigs.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => selectEntity(item.key)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  selectedKey === item.key
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-ink-500 dark:bg-white/5 dark:text-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-[#3b2fff] p-6 text-white shadow-lg shadow-brand-600/20 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85">Content studio</p>
                <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{config?.label ?? "Entity"}</h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
                  Manage this content through one normalized API used by both the public site and this dashboard.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-semibold backdrop-blur">
                  {config?.kind === "singleton" ? "Single record" : `${rows.length} records`}
                </span>
                <button
                  type="button"
                  onClick={copyEndpoint}
                  title="Copy API endpoint"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 font-mono text-xs backdrop-blur transition hover:bg-white/20"
                >
                  /api/cms/{config?.key}
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
          </section>

          {status && (
            <div
              role="status"
              aria-live="polite"
              className={`fixed right-4 top-20 z-50 flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur sm:right-6 ${
                status.kind === "ok"
                  ? "border-emerald-200 bg-emerald-50/95 text-emerald-800 dark:border-emerald-500/20 dark:bg-[#0f2a24]/95 dark:text-emerald-200"
                  : "border-red-200 bg-red-50/95 text-red-800 dark:border-red-500/20 dark:bg-[#2a1218]/95 dark:text-red-200"
              }`}
            >
              {status.kind === "ok" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{status.kind === "ok" ? "Success" : "Couldn’t complete"}</p>
                <p className="mt-0.5 break-words text-xs opacity-80">{status.message}</p>
              </div>
              <button
                type="button"
                aria-label="Dismiss message"
                onClick={() => setStatus(null)}
                className="rounded-lg p-1 transition hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {loading ? (
            <div className={`${panel} grid min-h-[320px] place-items-center p-10`}>
              <div className="text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-brand-600" />
                <p className="mt-3 text-sm font-semibold">Loading {config?.label}…</p>
              </div>
            </div>
          ) : loadError ? (
            <section className={`${panel} grid min-h-[320px] place-items-center p-10`}>
              <div className="max-w-lg text-center">
                <AlertCircle className="mx-auto h-8 w-8 text-rose-500" />
                <p className="mt-3 text-sm font-semibold">Couldn’t load {config?.label}</p>
                <p className="mt-1 break-words text-xs text-ink-500 dark:text-slate-400">{loadError}</p>
                <button type="button" className={`${secondary} mt-4`} onClick={() => void loadEntity()}>
                  <RotateCcw className="h-3.5 w-3.5" /> Retry
                </button>
              </div>
            </section>
          ) : config?.kind === "singleton" ? (
            <section className={`${panel} overflow-hidden`}>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 p-5 dark:border-white/10">
                <div>
                  <h2 className="font-display text-lg font-semibold">Edit record</h2>
                  <p className="mt-1 text-xs text-ink-500 dark:text-slate-400">Table: {config.table}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className={secondary} disabled={busy || !draft} onClick={resetDraft}>
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </button>
                  <button type="button" className={primary} disabled={busy || !draft} onClick={save}>
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
                  </button>
                </div>
              </div>
              <div className="p-5">
                {singleton || draft ? renderFields() : (
                  <div className="grid min-h-[240px] place-items-center text-center">
                    <div>
                      <Database className="mx-auto h-8 w-8 text-ink-500" />
                      <p className="mt-3 text-sm font-semibold">No record yet</p>
                      <p className="mt-1 text-xs text-ink-500">Fill in the fields and save to create one.</p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section className="space-y-5">
              <div className={`${panel} flex flex-wrap items-center justify-between gap-4 p-5`}>
                <div>
                  <h2 className="font-display text-lg font-semibold">Records</h2>
                  <p className="mt-1 text-xs text-ink-500 dark:text-slate-400">Table: {config?.table}</p>
                </div>
                <button type="button" className={primary} onClick={startCreate}>
                  <Plus className="h-4 w-4" /> Add record
                </button>
              </div>

              {draft && (
                <div className={`${panel} overflow-hidden`}>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 p-5 dark:border-white/10">
                    <div>
                      <h2 className="font-display text-lg font-semibold">
                        {editingId === "new" ? "New record" : "Edit record"}
                      </h2>
                      <p className="mt-1 text-xs text-ink-500 dark:text-slate-400">
                        Fields marked as required are validated before saving.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className={secondary} disabled={busy} onClick={resetDraft}>
                        <RotateCcw className="h-3.5 w-3.5" /> Cancel
                      </button>
                      <button type="button" className={primary} disabled={busy} onClick={save}>
                        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
                      </button>
                    </div>
                  </div>
                  <div className="p-5">{renderFields()}</div>
                </div>
              )}

              {rows.length === 0 ? (
                <div className={`${panel} grid min-h-[240px] place-items-center p-10 text-center`}>
                  <div>
                    <FileText className="mx-auto h-8 w-8 text-ink-500" />
                    <p className="mt-3 text-sm font-semibold">No records found</p>
                    <p className="mt-1 text-xs text-ink-500">Add a record to publish it on the public site.</p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-3">
                  {rows.map((row, index) => (
                    <article key={valueAsString(row.id) || `row-${index}`} className={`${panel} p-4`}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {valueAsString(row.title || row.label || row.name || row.page_key || row.asset_key) ||
                              `Record ${index + 1}`}
                          </p>
                          <p className="truncate font-mono text-[10px] text-ink-500 dark:text-slate-500">
                            {valueAsString(row.id)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" className={secondary} onClick={() => startEdit(row)}>
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </button>
                          <button type="button" className={danger} onClick={() => setDeleteTarget(row)}>
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </main>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className={`${panel} w-full max-w-md p-6`} role="dialog" aria-modal="true" aria-label="Confirm delete">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300">
                <Trash2 className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-semibold">Delete this record?</h2>
                <p className="mt-1 text-sm text-ink-500 dark:text-slate-400">
                  This cannot be undone. The public site will update immediately.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" className={secondary} disabled={busy} onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button type="button" className={danger} disabled={busy} onClick={confirmDelete}>
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
