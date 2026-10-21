"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: 'Project Completions', value: 50, suffix: '+' },
  { label: 'Client Satisfaction', value: 100, suffix: '%' },
  { label: 'Technical Support', value: 12, suffix: 'hr' },
  { label: 'Years Experience', value: 5, suffix: '+' },
];

export default function WhyChoose() {
  return (
    <section className="py-16 sm:py-24 lg:py-36 bg-slate-50 relative overflow-hidden border-y border-slate-100">
      {/* Normalized Responsive Layout Core Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Alignment Grid */}
        <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16 lg:gap-24 xl:gap-32">
          
          {/* Left Text and Grid Segment */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <span className="text-blue-600 font-bold uppercase tracking-[0.4em] text-[9px] sm:text-[10px] mb-4 sm:mb-6 block">
              The Infinity Standard
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 md:mb-10 leading-[0.95] tracking-tighter uppercase italic text-slate-900">
              Reliable <br /> 
              <span className="text-blue-600 not-italic">Execution</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12 max-w-xl border-l-2 border-blue-600/20 pl-4 sm:pl-6 italic font-medium leading-relaxed">
              I am committed to technical excellence. I don&apos;t compromise on quality, performance, or user experience. Every project is built with precision and future-scalability in mind.
            </p>
            
            {/* Smooth Micro-Padded Responsive Stats Blueprint Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] bg-white border border-slate-100/80 group transition-all duration-500 hover:border-blue-600/20 shadow-sm hover:shadow-xl hover:shadow-blue-600/5"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-2 sm:mb-3 tracking-tighter transition-transform group-hover:scale-[1.03] origin-left">
                    <Counter value={stat.value} />
                    <span className="text-blue-600 font-extrabold">{stat.suffix}</span>
                  </div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Showcase Image Layer with Multi-Device Boundary Mapping */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 max-w-md lg:max-w-none mx-auto relative aspect-[4/3] sm:aspect-square">
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-[80px] sm:blur-[120px] animate-pulse pointer-events-none" />
            
            {/* Primary Visual Media Wrapper */}
            <div className="relative h-full w-full z-10 rounded-[28px] sm:rounded-[4rem] overflow-hidden border border-slate-200 shadow-xl sm:shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                alt="Development Workspace"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent opacity-90" />
              
              {/* Bottom Typography Accent */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12">
                <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-[8px] mb-2 block">
                  My Philosophy
                </span>
                <p className="text-slate-900 text-base sm:text-xl font-black uppercase tracking-tight leading-tight italic">
                  Crafting Digital Excellence <br /> For Ambitious Brands
                </p>
              </div>
            </div>
            
            {/* Dynamic Floating Badge Accent: Perfectly scales down on phones smoothly */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 p-4 sm:p-6 md:p-8 bg-white rounded-[20px] sm:rounded-[2rem] shadow-xl border border-slate-100 z-20"
            >
              <div className="font-black text-blue-600 text-xl sm:text-2xl md:text-3xl uppercase tracking-tighter italic leading-none mb-1">
                99%
              </div>
              <div className="text-[7px] sm:text-[8px] md:text-[9px] text-slate-400 uppercase tracking-widest font-black leading-none">
                Performance Score
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMilliseconds = 1600;
    const incrementTime = Math.max(totalMilliseconds / end, 16); // Performance constraint engine safeguard

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}
