// components/admin/AdminLoginForm.tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"password" | "verify">("password");
  const [device, setDevice] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [visible, setVisible] = useState(false);

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
        stage?: string;
        device?: string;
      };
      if (!response.ok) throw new Error(body.error || "Login failed");
      setDevice(body.device || "This device");
      setStage("verify");
      setPassword("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(body.error || "Verification failed");
      router.push("/admin");
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Verification failed");
    } finally {
      setBusy(false);
    }
  }

  function backToPassword() {
    setStage("password");
    setCode("");
    setDevice("");
    setError("");
  }

  if (stage === "verify") {
    return (
      <form onSubmit={submitCode} className="mt-8 space-y-5">
        <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-3 py-3 text-xs text-brand-900 dark:border-brand-500/20 dark:bg-brand-600/10 dark:text-brand-200">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Verification code sent to the admin email.</p>
            <p className="mt-1 opacity-80">Device: <span className="font-semibold">{device}</span></p>
          </div>
        </div>

        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-slate-400">
            6-digit verification code
          </span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            autoFocus
            required
            aria-invalid={Boolean(error)}
            placeholder="000000"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-lg font-semibold tracking-[0.4em] text-ink outline-none transition placeholder:tracking-normal placeholder:text-ink-500/40 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:focus:bg-white/10"
          />
        </label>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy || code.length !== 6}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Verify and continue <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></>}
        </button>

        <button
          type="button"
          onClick={backToPassword}
          className="inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-ink-500 transition hover:text-brand-700 dark:text-slate-400 dark:hover:text-brand-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Use a different password
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submitPassword} className="mt-8 space-y-5">
      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-500 dark:text-slate-400">
          Admin password
        </span>
        <div className="relative">
          <input
            type={visible ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            autoFocus
            required
            aria-invalid={Boolean(error)}
            placeholder="Enter password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-ink outline-none transition placeholder:text-ink-500/50 focus:border-brand-600 focus:bg-white focus:ring-4 focus:ring-brand-100/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-white/10"
          />
          <button
            type="button"
            onClick={() => setVisible((previous) => !previous)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-ink-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </label>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={busy}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Send verification code
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
