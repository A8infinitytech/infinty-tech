"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { 
    number: "01",
    title: "Scalable Development", 
    slug: "scalable-development",
    description: "Crafting efficient and scalable web solutions to support your business growth.",
    color: "#3b82f6",
  },
  { 
    number: "02",
    title: "AI & Chatbot Integration", 
    slug: "ai-chatbot-integration",
    description: "Integrating basic AI and chatbot functionalities to enhance user interaction.",
    color: "#8b5cf6",
  },
  { 
    number: "03",
    title: "Premium UI/UX", 
    slug: "premium-ui-ux",
    description: "Designing intuitive and visually appealing user interfaces for exceptional experiences.",
    color: "#64748b",
  },
  { 
    number: "04",
    title: "Optimized Code", 
    slug: "optimized-code",
    description: "Delivering clean, maintainable, and high-performance code for optimal website functionality.",
    color: "#2563eb",
  }
];

export default function PinnedCapabilitiesShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const container = containerRef.current;
        if (!container) return;

        // Perfect tracking setup to eliminate dead scroll space completely
        const getScrollAmount = () => -(container.scrollWidth - window.innerWidth);

        gsap.to(container, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${container.scrollWidth - window.innerWidth}`,
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const cards = document.querySelectorAll('.capability-card-wrapper');
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0,
              duration: 0.5,
              delay: i * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full min-h-screen bg-white flex items-center overflow-hidden">
      
      {/* Horizontal Moving Ribbon Container */}
      <div ref={containerRef} className="flex flex-col lg:flex-row lg:flex-nowrap relative w-full lg:w-max gap-0 items-center h-full">
        
        {/* Philosophy Panel - Perfectly Matched to the New Height Framework */}
        <div className="capability-card-wrapper h-auto lg:h-[72vh] w-full lg:w-[40vw] flex flex-col justify-center px-6 sm:px-10 lg:px-16 relative overflow-hidden shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 opacity-40" />
          
          <div className="max-w-md relative z-10">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[9px] mb-3 block">
              Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 uppercase leading-[0.95] tracking-tighter text-slate-900 italic">
              The{" "}
              <br className="hidden sm:block" />
              <span className="text-blue-600 italic">Infinity</span>{" "}
              <br className="hidden sm:block" />
              Core.
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xs italic border-l-2 border-blue-600/20 pl-4">
              I build robust and visually appealing digital solutions, ensuring your online presence is effective and professional.
            </p>
          </div>
        </div>

        {/* Premium Tall Service Cards: Width reduced to 32vw and Height stretched to 72vh */}
        {features.map((f, i) => (
          <div
            key={i}
            className="capability-card-wrapper w-full lg:w-[32vw] h-auto lg:h-[72vh] flex items-center justify-center shrink-0 grow-0 bg-slate-50/10 relative border-b lg:border-b-0 lg:border-r border-slate-100/60 p-4 sm:p-5 lg:p-6"
          >
            {/* Subtle Dot Grid Background Accent */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle, ${f.color} 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />

            {/* Custom Frosted Rim Frame */}
            <div 
              className="relative w-full h-full rounded-[32px] p-[1.5px] group/card transition-all duration-500 hover:scale-[1.002]"
              style={{
                background: `linear-gradient(135deg, ${f.color}30, ${f.color}10, transparent)`,
                boxShadow: `0 30px 60px -30px ${f.color}05`,
              }}
            >
              {/* Tall Inner Premium White Matte Box */}
              <div className="relative rounded-[30px] overflow-hidden w-full h-full bg-white flex flex-col justify-between p-6 sm:p-8 lg:p-10 border border-white/80">
                
                {/* Top Section Layout */}
                <div className="relative flex justify-end items-start w-full z-10">
                  <span className="text-3xl lg:text-4xl font-black tracking-tighter opacity-[0.12] select-none group-hover/card:opacity-[0.25] transition-opacity duration-500" style={{ color: f.color }}>
                    {f.number}
                  </span>
                </div>

                {/* Bottom Core Typography Space */}
                <div className="relative z-10 mt-12 lg:mt-0">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-1.5">
                    Capability Class
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 uppercase tracking-tighter italic mb-2 leading-[1.05]">
                    {f.title}
                  </h3>

                  <div className="w-12 h-0.5 transition-all duration-500 rounded-full mb-4" style={{ backgroundColor: `${f.color}40` }} />

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-8 font-medium">
                    {f.description}
                  </p>
                  
                  {/* Action Link Anchor Trigger */}
                  <Link
                    href={`/services/${f.slug}`}
                    className="flex items-center gap-2 text-slate-900 font-bold uppercase text-[9px] tracking-widest group/arrow cursor-pointer w-fit"
                  >
                    <span style={{ color: f.color }} className="font-black">Explore More</span>
                    <ArrowUpRight size={13} style={{ color: f.color }} className="transition-transform group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                  </Link>
                </div>

                {/* Soft Color Orb Background Flare */}
                <div className="absolute -bottom-24 -right-24 w-40 h-40 rounded-full blur-3xl opacity-[0.05] pointer-events-none z-0"
                  style={{ background: f.color }} />
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}