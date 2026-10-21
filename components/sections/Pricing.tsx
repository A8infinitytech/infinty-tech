"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PRICING_DATA } from "@/data/pricingData";

type Currency = "USD" | "PKR";

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [detected, setDetected] = useState(false);

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_code === "PK") {
          setCurrency("PKR");
        }
      } catch {
        // Silent fallback to USD
      } finally {
        setDetected(true);
      }
    };
    detectCurrency();
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handleInquire = (planName: string) => {
    const encodedPlan = encodeURIComponent(planName);
    window.location.href = `/contact?plan=${encodedPlan}&currency=${currency}`;
  };

  const handleCustomInquire = () => {
    window.location.href = `/contact?type=custom`;
  };

  return (
    <section id="pricing" className="py-32 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Pricing Plans
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            Transparent <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. No hidden costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {PRICING_DATA.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-[2rem] bg-white dark:bg-slate-900 flex flex-col ${
                plan.popular
                  ? "border-2 border-blue-600 shadow-xl"
                  : "border border-slate-200 dark:border-slate-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-muted">{currency === "USD" ? "$" : "₨"}</span>
                  <span className="text-5xl font-black tabular-nums">
                    {formatPrice(plan.prices[currency])}
                  </span>
                </div>
                <p className="text-muted text-sm mt-4 leading-relaxed">{plan.desc}</p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-muted">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleInquire(plan.name)}
                className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] hover:scale-[1.02]"
                    : "bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700"
                }`}
              >
                Inquire Now
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem]">
            <p className="text-lg font-medium text-muted">
              Have Unique Requirements or a Custom Scope?
            </p>
            <button
              onClick={handleCustomInquire}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
            >
              Inquire Custom Scope
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}