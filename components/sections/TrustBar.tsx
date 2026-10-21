"use client";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Globe, ShoppingCart, Layout, Search, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
  { label: 'Next.js Expert', icon: <Settings size={16} /> },
  { label: 'React Interfaces', icon: <Code size={16} /> },
  { label: 'Custom E-Commerce', icon: <ShoppingCart size={16} /> },
  { label: 'UI Implementation', icon: <Layout size={16} /> },
  { label: 'SEO Optimization', icon: <Search size={16} /> },
  { label: 'API Integrations', icon: <Globe size={16} /> },
];

export default function TrustBar() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const scrollRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label smooth drop-in reveal
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Safe Seamless Infinite Translation Loop Logic
      if (scrollRowRef.current) {
        const row = scrollRowRef.current;
        
        // Exact mathematical mid-point displacement allocation
        gsap.to(row, {
          xPercent: -50,
          duration: 25, // Control loop velocity here (Lower number means faster marquee)
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-white border-y border-slate-100 overflow-hidden relative"
    >
      {/* Section Label Headspace */}
      <div className="container mx-auto mb-8 sm:mb-10 text-center">
        <span
          ref={labelRef}
          className="inline-block text-[8px] sm:text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.6em]"
        >
          My Technical Expertise
        </span>
      </div>

      {/* Outer Marquee Structural Boundary */}
      <div className="relative w-full overflow-hidden flex">
        
        {/* Row Canvas Layout - Rendered twice back-to-back to feed absolute infinite continuity */}
        <div ref={scrollRowRef} className="flex whitespace-nowrap will-change-transform shrink-0">
          
          {/* Track Phase 1 (Original Set) */}
          <div className="flex shrink-0 items-center">
            {trustItems.map((item, idx) => (
              <div
                key={`orig-${idx}`}
                className="trust-item flex items-center gap-3 sm:gap-4 md:gap-6 cursor-default group px-6 sm:px-8 md:px-10"
              >
                <div className="p-2.5 sm:p-3 md:p-4 bg-slate-50 rounded-xl sm:rounded-2xl group-hover:bg-primary/10 transition-all duration-300">
                  <div className="text-slate-500 group-hover:text-primary transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>

                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tighter uppercase italic text-slate-900 group-hover:text-primary transition-colors duration-300">
                  {item.label}
                </span>

                <span className="text-slate-400 text-2xl font-light ml-6 sm:ml-8 md:ml-10 select-none">•</span>
              </div>
            ))}
          </div>

          {/* Track Phase 2 (Seamless Mirror Clone Loop Matcher) */}
          <div className="flex shrink-0 items-center">
            {trustItems.map((item, idx) => (
              <div
                key={`clone-${idx}`}
                className="trust-item flex items-center gap-3 sm:gap-4 md:gap-6 cursor-default group px-6 sm:px-8 md:px-10"
              >
                <div className="p-2.5 sm:p-3 md:p-4 bg-slate-50 rounded-xl sm:rounded-2xl group-hover:bg-primary/10 transition-all duration-300">
                  <div className="text-slate-500 group-hover:text-primary transition-colors duration-300">
                    {item.icon}
                  </div>
                </div>

                <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tighter uppercase italic text-slate-900 group-hover:text-primary transition-colors duration-300">
                  {item.label}
                </span>

                <span className="text-slate-400 text-2xl font-light ml-6 sm:ml-8 md:ml-10 select-none">•</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Cinematic Linear Left/Right Fog Gradient Fades */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
