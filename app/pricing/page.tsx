"use client";
import React from 'react';
import AnimatedPricing from '@/components/sections/AnimatedPricing';

export default function PricingPage() {
  return (
    <div className="bg-white">
      <main className="pt-20">
        <AnimatedPricing />
        
        <section className="section-padding border-t border-slate-100 bg-slate-50">
  <div className="container-custom">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

      <div>
        <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
          Enterprise Solutions
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-slate-900">
          Need a <span className="text-primary">Custom Solution?</span>
        </h2>

        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
          Every business has unique requirements. Infinity Tech provides
          custom web solutions, scalable applications, business automation,
          and enterprise-grade development tailored to your goals.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300"
        >
          Get Free Consultation
        </a>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <h3 className="text-2xl font-bold mb-6 text-slate-900">
          What's Included
        </h3>

        <ul className="space-y-4">
          {[
            "Dedicated Project Manager",
            "Custom UI/UX Design",
            "Responsive Development",
            "SEO Optimization",
            "API Integrations",
            "Performance Optimization",
            "Source Code Ownership",
            "Post-Launch Support",
          ].map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
</section>
      </main>
    </div>
  );
}
