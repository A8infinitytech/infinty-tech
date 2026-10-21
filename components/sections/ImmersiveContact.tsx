"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactForm from './contactform'; // Form component name updated for clarity

gsap.registerPlugin(ScrollTrigger);

export default function ImmersiveContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Memory cleanup context for React Strict Mode and Router changes
    const ctx = gsap.context(() => {
      gsap.fromTo(innerRef.current, 
        { 
          opacity: 0,
          y: 60,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out", // Smooth professional decelerating ease
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%", // Jab section screen ke 75% par aaye to animation chal pare
            toggleActions: "play none none reverse", // Scroll back karne par smoothly reset ho jaye
          }
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen bg-slate-50/60 flex items-center justify-center py-24 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Infinity Tech Signature Blue Premium Soft Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[130px] pointer-events-none animate-pulse duration-[5000ms]" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[3500ms]" />
      
      {/* Premium Clean Tech Grid Line Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-60 pointer-events-none" />
      
      {/* Main Container Card */}
      <div 
        ref={innerRef}
        className="w-full max-w-6xl mx-auto rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-slate-200/80 bg-white/80 backdrop-blur-3xl shadow-[0_30px_100px_primary/5,0_10px_30px_rgba(15,23,42,0.03)]"
      >
        <ContactForm />
      </div>
    </section>
  );
}