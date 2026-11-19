// app/admin/login/page.tsx
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ArrowUpRight, Database, Layers3, LockKeyhole, Settings2, Sparkles } from "lucide-react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

function LoginFallback() {
  return (
    <main className="grid min-h-screen bg-[#f6f7fb] dark:bg-[#080816] lg:grid-cols-[1.05fr_0.95fr]">
      <div className="hidden bg-gradient-to-br from-brand-600 to-[#3b2fff] p-12 lg:block" />
      <div className="grid place-items-center px-4 py-12">
        <div className="h-[420px] w-full max-w-md animate-pulse rounded-3xl bg-slate-200/70 dark:bg-white/5" />
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <AdminLoginContent />
    </Suspense>
  );
}

async function AdminLoginContent() {
  await connection();
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <main className="grid min-h-screen bg-[#f6f7fb] dark:bg-[#080816] lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-[#3b2fff] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15 backdrop-blur">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-display text-base font-semibold">Infinity Tech</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">Admin console</p>
          </div>
        </div>

        <div className="relative max-w-lg">
          <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Your site, fully under control.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            One secure workspace for every word, service and setting on your public site.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <Database className="h-5 w-5" />
              <p className="mt-3 text-sm font-semibold">Content library</p>
              <p className="mt-1 text-xs text-white/65">Edit structured sections with ease.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <Layers3 className="h-5 w-5" />
              <p className="mt-3 text-sm font-semibold">Service cards</p>
              <p className="mt-1 text-xs text-white/65">Update titles, icons and descriptions.</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:col-span-2">
              <Settings2 className="h-5 w-5" />
              <p className="mt-3 text-sm font-semibold">Instant publishing</p>
              <p className="mt-1 text-xs text-white/65">Every save refreshes the public site right away.</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between text-xs text-white/60">
          <span>Protected workspace</span>
          <a href="/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
            Back to site <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display font-semibold">Infinity Tech</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink-500">Admin console</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-900/5 dark:border-white/10 dark:bg-white/5 sm:p-9">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-600/15 dark:text-brand-200">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold">Welcome back</h2>
            <p className="mt-2 text-sm text-ink-500 dark:text-slate-400">
              Enter the admin password to open the dashboard.
            </p>
            <AdminLoginForm />
          </div>

          <p className="mt-5 text-center text-[11px] text-ink-500 dark:text-slate-500">
            Only authorized users can manage site content.
          </p>
        </div>
      </section>
    </main>
  );
}
