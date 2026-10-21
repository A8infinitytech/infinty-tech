"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Code, ShoppingCart, Layout, Search, Settings } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'website-development',
    title: 'Full‑stack Web Development',
    description: 'High‑performance, responsive websites built with Next.js, TypeScript, HTML & CSS.',
    icon: Settings,
    color: '#2563eb',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'React‑based interfaces with responsive, accessible layouts.',
    icon: Layout,
    color: '#7c3aed',
  },
  {
    id: 'chatbot-integration',
    title: 'Custom Chatbots & AI',
    description: 'Simple API‑based bots and FAQ assistants integrated into web apps.',
    icon: Code,
    color: '#3b82f6',
  },
  {
    id: 'optimization',
    title: 'Website Optimization & Bug Fixing',
    description: 'Performance tuning, SEO improvements, and error resolution.',
    icon: Search,
    color: '#2563eb',
  },
  {
    id: 'responsive-sites',
    title: 'Responsive Modern Websites',
    description: 'Tailored sites for businesses, startups, and individuals across all devices.',
    icon: Smartphone,
    color: '#7c3aed',
  }
];

export default function HorizontalServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const container = sectionRef.current;
        if (!container) return;

        // Perfect tracking to eliminate dead space at the end
        const getScrollAmount = () => -(container.scrollWidth - window.innerWidth);

        gsap.to(container, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => `+=${container.scrollWidth - window.innerWidth}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        const slides = document.querySelectorAll('.service-slide');
        slides.forEach((slide) => {
          gsap.fromTo(
            slide,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
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
      
      {/* Horizontal Ribbon Wrapper */}
      <div ref={sectionRef} className="flex flex-col lg:flex-row lg:flex-nowrap relative w-full lg:w-max gap-0 items-center h-full">
        
        {/* Title Slide Panel */}
        <div className="service-slide h-auto lg:h-[72vh] w-full lg:w-[40vw] flex flex-col justify-center px-6 sm:px-10 lg:px-16 relative overflow-hidden shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50 opacity-40" />
          
          <div className="max-w-md relative z-10">
            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-[9px] mb-3 block">
              My Capabilities
            </span>
            <h3 className="font-black mb-4 uppercase leading-[0.95] tracking-tighter text-slate-900 italic">
              Focused{" "}
              <br className="hidden sm:block" />
              <span className="text-blue-600 italic">Expertise</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed italic border-l-2 border-blue-600/20 pl-4">
              I specialize in modern web technologies, delivering clean code and exceptional user interfaces from initial concept to final launch.
            </p>
          </div>
        </div>

        {/* Premium Tall Service Cards: Width reduced to 32vw and Height stretched to 72vh */}
        {services.map((service :any, i : any) => {
          const IconComponent = service.icon;
          return (
            <div
              key={i}
              className="service-slide group w-full lg:w-[32vw] h-auto lg:h-[72vh] flex items-center justify-center shrink-0 grow-0 bg-slate-50/10 relative border-b lg:border-b-0 lg:border-r border-slate-100/60 p-4 sm:p-5 lg:p-6"
            >
              {/* Subtle Grid Accent */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle, ${service.color} 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }} />

              {/* Dynamic Rim Frame */}
              <div 
                className="relative w-full h-full rounded-[32px] p-[1.5px] transition-all duration-500 hover:scale-[1.002]"
                style={{
                  background: `linear-gradient(135deg, ${service.color}30, ${service.color}10, transparent)`,
                  boxShadow: `0 30px 60px -30px ${service.color}05`,
                }}
              >
                {/* Tall Inner Content Canvas */}
                <div className="relative rounded-[30px] overflow-hidden w-full h-full bg-white flex flex-col justify-between p-6 sm:p-8 lg:p-10 border border-white/80">
                  
                  {/* Top Block */}
                  <div className="relative flex justify-between items-start w-full z-10">
                    <div 
                      className="p-3.5 bg-white shadow-md shadow-slate-100 rounded-2xl transition-transform duration-500 group-hover:scale-105 border border-slate-50/80"
                      style={{ color: service.color }}
                    >
                      <IconComponent className="w-5 h-5 sm:w-6 h-6" />
                    </div>
                    <span className="text-3xl lg:text-4xl font-black tracking-tighter opacity-[0.12] select-none group-hover:opacity-[0.25] transition-opacity duration-500" style={{ color: service.color }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Core Content Segment */}
                  <div className="relative z-10 mt-12 lg:mt-0">
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 block mb-1.5">
                      Service Vector
                    </span>
                    <h3 className="font-black text-slate-900 uppercase tracking-tighter italic mb-2 leading-[1.05]">
                      {service.title}
                    </h3>
                    
                    <div className="w-12 h-0.5 transition-all duration-500 rounded-full mb-4" style={{ backgroundColor: `${service.color}40` }} />
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mb-8 font-medium">
                      {service.description}
                    </p>

                    <Link href={`/services/${service.id}`} className="flex items-center gap-2 group/btn w-fit">
                      <span className="text-[9px] font-black uppercase tracking-widest transition-opacity duration-300" style={{ color: service.color }}>
                        Discover More
                      </span>
                      <div 
                        className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center transition-all group-hover/btn:text-white shrink-0 shadow-sm
                                   group-hover/btn:bg-primary group-hover/btn:border-primary"
                      >
                        <span className="text-xs transition-transform group-hover/btn:translate-x-0.5">→</span>
                      </div>
                    </Link>
                  </div>

                  {/* Micro Backlight Flare */}
                  <div className="absolute -bottom-24 -right-24 w-40 h-40 rounded-full blur-3xl opacity-[0.05] pointer-events-none z-0"
                    style={{ background: service.color }} />
                </div>
              </div>
            </div>
          );
        })}

        {/* Final Outro Action CTA Panel - Matched perfectly to new tall dimension height */}
        <div className="service-slide h-[60vh] lg:h-[72vh] w-full lg:w-[35vw] flex items-center justify-center p-6 sm:p-10 lg:p-12 text-center relative overflow-hidden shrink-0 bg-primary lg:rounded-r-[32px]">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary via-indigo-600 to-blue-700" />
          <div className="absolute top-6 right-6 w-20 h-20 border border-white/5 rounded-full z-[2]" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border border-white/5 rounded-full z-[2]" />
          
          <div className="relative z-10 max-w-xs">
            <h2 className="font-black uppercase text-white tracking-tighter leading-[0.95] mb-6 italic">
              Ready to <br />Innovate?
            </h2>
            <Link href="/contact" className="inline-block px-8 py-4 bg-white text-primary font-black uppercase tracking-widest text-[10px] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/10 active:scale-95">
              Let's Talk
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}