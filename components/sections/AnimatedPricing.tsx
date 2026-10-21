"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, MessageCircle } from "lucide-react";
import Link from "next/link";
import { PRICING_DATA } from "@/data/pricingData";

type Currency = 'USD' | 'PKR';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  PKR: "Rs",
};

export default function AnimatedPricing() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code === 'PK') {
          setCurrency('PKR');
          setDetectedLocation('Pakistan');
        }
      } catch (error) {
        console.error("Location detection failed:", error);
      }
    };
    detectLocation();
  }, []);

  const getCtaLink = (planName: string) => {
    if (currency === 'PKR') {
      const message = `Hi! I'm interested in the ${planName} plan. Please provide details for local payment (Bank Transfer / EasyPaisa / JazzCash).`;
      return `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    }
    return "/contact";
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full w-fit mx-auto mb-6"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
              Investment Tiers {detectedLocation && `• Detected in ${detectedLocation}`}
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase italic">
            Choose Your <span className="text-gradient">Growth</span> Plan
          </h2>
          <p className="text-slate-600 text-lg font-medium italic">
            Transparent pricing models designed to scale with your digital ambitions.
          </p>
        </div>

        {/* Currency Switcher Pill */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-100 p-1.5 rounded-full flex items-center gap-1 border border-slate-200 shadow-inner">
            {(['USD', 'PKR'] as Currency[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-8 py-2 rounded-full text-xs font-black tracking-widest transition-all duration-300 ${
                  currency === cur
                    ? "bg-white text-primary shadow-md"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {cur} ({CURRENCY_SYMBOLS[cur]})
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_DATA.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative flex flex-col h-full rounded-[2.5rem] p-8 lg:p-10 transition-all duration-500 group ${
                plan.popular
                  ? "bg-slate-900 text-white shadow-2xl shadow-primary/20 ring-4 ring-primary/20 scale-105 z-10"
                  : "bg-white border border-slate-200 hover:border-primary/30 hover:shadow-xl text-slate-900"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-2xl font-black uppercase italic mb-2 ${plan.popular ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm font-medium leading-relaxed ${plan.popular ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="mb-8 pb-8 border-b border-white/10 flex items-baseline gap-1">
                <span className="text-xl font-bold text-primary">
                  {CURRENCY_SYMBOLS[currency]}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currency}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-4xl lg:text-5xl font-black tracking-tighter tabular-nums"
                  >
                    {plan.prices[currency as keyof typeof plan.prices].toLocaleString()}
                  </motion.span>
                </AnimatePresence>
                {plan.isPlus && <span className="text-2xl font-black text-primary ml-1">+</span>}
                <span className={`text-xs font-bold uppercase tracking-widest ml-2 ${plan.popular ? "text-slate-500" : "text-slate-400"}`}>
                  / project
                </span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className={`mt-1 p-0.5 rounded-full ${plan.popular ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className={`text-sm font-semibold leading-tight ${plan.popular ? "text-slate-300" : "text-slate-600"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-4">
                {currency === 'PKR' && (
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary/80 text-center italic">
                    Local Payments: Bank Transfer / EasyPaisa / JazzCash
                  </p>
                )}
                <Link 
                  href={getCtaLink(plan.name)}
                  target={currency === 'PKR' ? "_blank" : "_self"}
                >
                  <button
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-2 ${
                      plan.popular
                        ? "bg-primary text-white hover:bg-white hover:text-slate-900 shadow-xl shadow-primary/20"
                        : "bg-slate-900 text-white hover:bg-primary"
                    }`}
                  >
                    {currency === 'PKR' && <MessageCircle size={16} />}
                    Select {plan.name} Plan
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}