// app/admin/loading.tsx
export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-[#080816]">
      <aside className="fixed inset-y-0 left-0 hidden w-[272px] flex-col border-r border-slate-200/80 bg-white/90 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0b1d]/90 lg:flex">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10" />
          <div className="space-y-2">
            <div className="h-3 w-28 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
            <div className="h-2 w-16 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
          </div>
        </div>
        <div className="mt-8 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-14 animate-pulse rounded-xl bg-slate-200/70 dark:bg-white/5" />
          ))}
        </div>
      </aside>

      <div className="lg:pl-[272px]">
        <div className="h-16 border-b border-slate-200/80 bg-white/85 dark:border-white/10 dark:bg-[#0b0b1d]/85" />
        <main className="mx-auto max-w-[1400px] space-y-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="h-44 animate-pulse rounded-3xl bg-gradient-to-br from-brand-600/20 to-brand-100 dark:from-white/10 dark:to-white/5" />
          <div className="grid gap-5 lg:grid-cols-[290px_1fr]">
            <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/5" />
            <div className="h-[420px] animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/5" />
          </div>
        </main>
      </div>
    </div>
  );
}
