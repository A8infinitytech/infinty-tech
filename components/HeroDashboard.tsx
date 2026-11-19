// components/HeroDashboard.tsx
"use client";
// Hero dashboard visual: clickable service tabs, animated chart and workflow (illustrative, no real data).
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSiteContent } from "@/lib/useSiteContent";
import { iconElement } from "@/lib/data";

type ServiceItem = {
  id?: string | number;
  title: string;
  description?: string;
  icon: string;
};

function isServiceItem(row: unknown): row is ServiceItem {
  if (typeof row !== "object" || row === null) return false;
  const value = row as { title?: unknown; icon?: unknown };
  return typeof value.title === "string" && typeof value.icon === "string";
}

export default function HeroDashboard() {
  const content = useSiteContent();
  // API se data laane ke liye states
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [chartKey, setChartKey] = useState(0);
  const [workflowStep, setWorkflowStep] = useState(0);

  // API Call
  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch("/api/cms/services");
        if (res.ok) {
          const payload = await res.json();
          const rows = Array.isArray(payload) ? payload : Array.isArray(payload.data) ? payload.data : [];
          setServices(rows.filter(isServiceItem));
        }
      } catch (err) {
        console.error("Failed to load services in HeroDashboard", err);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  // Get Workflow Steps based on title
  const getWorkflowSteps = (title: string) => {
    return content.dashboard.workflowSteps[title] || content.dashboard.defaultSteps;
  };

  // Safe access to current service
  const s = services[i] || services[0] || null;
  const currentSteps = s ? getWorkflowSteps(s.title) : content.dashboard.defaultSteps;

  // Auto Scroll Timer
  useEffect(() => {
    if (!auto || services.length === 0) {
      if (!auto) {
        const resumeTimer = setTimeout(() => setAuto(true), 6000);
        return () => clearTimeout(resumeTimer);
      }
      return;
    }
    const t = setInterval(() => {
      setI((x) => (x + 1) % services.length);
      setWorkflowStep(0);
    }, 4500);
    return () => clearInterval(t);
  }, [auto, services.length]);

  // Chart Animation Timer
  useEffect(() => {
    const t = setInterval(() => {
      setChartKey((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Workflow Animation Timer
  useEffect(() => {
    const t = setInterval(() => {
      setWorkflowStep((prev) => (prev + 1) % 4); 
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const handleTabClick = (index: number) => {
    setI(index);
    setAuto(false);
  };

  // LOADING SKELETON (Agar data abhi nahi aaya hai)
  if (loading || !s) {
    return (
      <div className="relative">
        <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-brand-100 via-brand-50 to-white blur-2xl" />
        <div className="relative flex h-[480px] flex-col overflow-hidden rounded-2xl border border-surface-border bg-white shadow-glow">
          <div className="flex shrink-0 items-center gap-2 border-b border-surface-border bg-surface px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
            <span className="ml-3 text-xs font-medium text-ink-500">{content.dashboard.loadingLabel}</span>
          </div>
          <div className="grid flex-1 gap-4 p-5 sm:grid-cols-5 min-h-0 animate-pulse">
            <div className="sm:col-span-2 space-y-2">
              <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>
              {content.dashboard.skeletonRows.map((n) => (
                <div key={n} className="h-10 bg-gray-100 rounded-xl"></div>
              ))}
            </div>
            <div className="sm:col-span-3 space-y-4">
              <div className="h-32 bg-gray-100 rounded-xl"></div>
              <div className="h-20 bg-gray-100 rounded-xl"></div>
              <div className="h-20 bg-gray-100 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-brand-100 via-brand-50 to-white blur-2xl"
      />
      <div className="relative flex h-[480px] flex-col overflow-hidden rounded-2xl border border-surface-border bg-white shadow-glow">
        
        {/* Mac-style Window Header */}
        <div className="flex shrink-0 items-center gap-2 border-b border-surface-border bg-surface px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-300/60" />
          <span className="ml-3 text-xs font-medium text-ink-500">
            {content.dashboard.consoleLabel}
          </span>
        </div>

        <div className="grid flex-1 gap-4 p-5 sm:grid-cols-5 min-h-0">
          
          {/* Left Side: Tabs */}
          <div className="flex flex-col sm:col-span-2 min-h-0">
            <p className="mb-2 shrink-0 text-xs font-semibold uppercase tracking-wider text-ink-500">
              {content.dashboard.servicesLabel}
            </p>
            <div
              className="flex flex-1 flex-col gap-2 overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative"
              role="tablist" 
              aria-label={content.dashboard.tablistLabel}
            >
              {services.map((a, k) => (
                <button
                  key={a.id || a.title}
                  role="tab"
                  aria-selected={k === i}
                  onClick={() => handleTabClick(k)}
                  className={`group flex shrink-0 w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all duration-300 ${
                    k === i 
                      ? "border-brand-200 bg-brand-50/60 shadow-sm" 
                      : "border-surface-border hover:border-brand-200 hover:bg-brand-50/30"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                      k === i ? "bg-brand-600 text-white shadow-sm" : "bg-brand-50 text-brand-600 group-hover:bg-brand-100"
                    }`}
                  >
                    {iconElement(a.icon || content.iconMeta.fallbackName, { className: "h-4 w-4", "aria-hidden": true })}
                  </span>
                  <span className="text-sm font-semibold leading-tight text-ink-700">{a.title}</span>
                  {k === i && (
                    <span className="pulse-dot ml-auto h-1.5 w-1.5 rounded-full bg-brand-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Content Panel */}
          <div className="flex flex-col gap-3 sm:col-span-3 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" role="tabpanel" aria-live="polite">
            
            {/* Main Service Card */}
            <div
              key={i} 
              className="reveal in shrink-0 rounded-xl border border-brand-200 bg-brand-50/50 p-3.5 transition-all"
            >
              <div className="flex items-start justify-between">
                {iconElement(s.icon || content.iconMeta.fallbackName, { className: "h-5 w-5 text-brand-600", "aria-hidden": true })}
                {auto && (
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-600 bg-brand-100/50 px-2 py-1 rounded-full">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse" /> {content.dashboard.autoLabel}
                  </span>
                )}
              </div>
              <h3 className="mt-1.5 font-display text-sm font-semibold text-ink-900">{s.title}</h3>
              {/* Database mein description hai, desc nahi */}
              <p className="mt-1 text-xs leading-relaxed text-ink-500 line-clamp-2">{s.description}</p>
              <Link
                href={`/contact?service=${encodeURIComponent(s.title)}`}
                className="group/link mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                {content.dashboard.quoteLabel} {iconElement("ArrowRight", { className: "h-3 w-3 transition-transform group-hover/link:translate-x-1", "aria-hidden": true })}
              </Link>
            </div>

            {/* CHART */}
            <div className="shrink-0 rounded-xl border border-surface-border p-3.5 transition-colors hover:border-brand-200" aria-hidden>
              <div className="mb-2 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                  {iconElement("Sparkles", { className: "h-3 w-3 text-brand-600", "aria-hidden": true })}
                  {s.title} {content.dashboard.performanceLabel}
                </p>
                <span className="flex items-center gap-1 text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-200">
                  {iconElement("Activity", { className: "h-2.5 w-2.5", "aria-hidden": true })} {content.dashboard.liveLabel}
                </span>
              </div>
              <div className="relative h-14 w-full">
                <svg viewBox="0 0 300 100" className="h-full w-full overflow-visible">
                  <defs>
                    <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#1018F8" stopOpacity=".15" />
                      <stop offset="1" stopColor="#1018F8" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 80 C40 70 60 40 100 50 S170 75 210 35 S270 20 300 15 V100 H0Z"
                    fill="url(#g)"
                  />
                  <path
                    key={chartKey} 
                    className="draw"
                    d="M0 80 C40 70 60 40 100 50 S170 75 210 35 S270 20 300 15"
                    fill="none"
                    stroke="#1018F8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="300" cy="15" r="2.5" fill="#1018F8" className="animate-pulse" />
                </svg>
              </div>
            </div>

            {/* WORKFLOW DESIGN */}
            <div className="shrink-0 rounded-xl border border-surface-border p-3.5 transition-colors hover:border-brand-200" aria-hidden>
              <div className="mb-3 flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                  {iconElement("Workflow", { className: "h-3 w-3 text-brand-600", "aria-hidden": true })}
                  {content.dashboard.processLabel}
                </p>
                <span className={`text-[9px] font-bold tracking-wider transition-colors ${workflowStep === 3 ? "text-green-600" : "text-brand-600 animate-pulse"}`}>
                  {workflowStep === 3 ? content.dashboard.completedLabel : content.dashboard.inProgressLabel}
                </span>
              </div>
              
              <div className="relative flex items-center justify-between px-2">
                {/* Background Connecting Line */}
                <div className="absolute left-4 right-4 top-1/2 -z-10 h-[2px] -translate-y-1/2 bg-brand-100 rounded-full">
                  {/* Animated Progress Line */}
                  <div 
                    className="h-full bg-brand-600 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${(Math.min(workflowStep, 2) / 2) * 100}%` }}
                  />
                </div>

                {/* Steps */}
                {currentSteps.map((step, k) => {
                  const isActive = k === workflowStep;
                  const isDone = k < workflowStep;
                  return (
                    <div key={step} className="flex flex-col items-center gap-1.5">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-500 ${
                          isActive 
                            ? "bg-brand-600 text-white ring-4 ring-brand-100 scale-110" 
                            : isDone 
                              ? "bg-brand-600 text-white" 
                              : "bg-white border-2 border-brand-200 text-brand-300"
                        }`}
                      >
                        {isDone || isActive ? iconElement("Check", { className: "h-3.5 w-3.5", "aria-hidden": true }) : k + 1}
                      </div>
                      <span className={`text-[9px] font-semibold transition-colors duration-300 ${isActive || isDone ? "text-brand-700" : "text-ink-400"}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}