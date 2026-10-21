"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/animations/MagneticButton';
import HeroScene from '@/components/3d/HeroScene';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.5
      });
      gsap.from(subRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.7
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <HeroScene />
      
      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-6 py-2 mb-8 bg-glass rounded-full text-primary font-medium tracking-widest uppercase text-xs"
        >
          Modern Web Development Solutions
        </motion.div>
        
        <h1 
          ref={titleRef}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tight leading-none"
        >
          Building Digital <br />
          <span className="text-gradient">Experiences</span> That <br />
          Deliver Results
        </h1>
        
        <p 
          ref={subRef}
          className="text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          I build high-performance websites and custom web applications tailored for businesses and personal brands.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <MagneticButton className="bg-primary text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            Get Started
          </MagneticButton>
          <MagneticButton className="bg-transparent border border-white/20 hover:border-white/40 text-white">
            View Our Work
          </MagneticButton>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
