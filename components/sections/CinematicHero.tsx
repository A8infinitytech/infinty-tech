"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroScene from '@/components/3d/HeroScene';
import Link from 'next/link';
import { ChevronDown, Sparkles, Code, Cpu, Globe, Zap } from 'lucide-react';
import { MagneticButton } from '@/components/animations/MagneticButton';

export default function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 500], [1, 1.15]);
  const contentY = useTransform(scrollY, [0, 400], [0, -40]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.innerText.split(" ");
    textRef.current.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block overflow-hidden pb-2"><span class="inline-block">${word}</span></span>`
      )
      .join(" ");

    const innerSpans = textRef.current.querySelectorAll("span span");

    gsap.fromTo(
      innerSpans,
      { y: "110%", skewY: 10 },
      {
        y: "0%",
        skewY: 0,
        duration: 1.6,
        stagger: 0.05,
        ease: "expo.out",
        delay: 0.6,
      }
    );

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const floatingIcons = [
    { Icon: Code, top: '15%', left: '10%', delay: 0 },
    { Icon: Cpu, top: '25%', right: '15%', delay: 0.5 },
    { Icon: Globe, bottom: '20%', left: '15%', delay: 1 },
    { Icon: Zap, bottom: '30%', right: '10%', delay: 1.5 },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-[110vh] w-full relative flex flex-col justify-center overflow-hidden bg-white pt-20"
    >
      {/* Background Layer 1: Video */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        style={{ scale: videoScale }}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source 
            src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" 
            type="video/mp4" 
          />
        </video>
      </motion.div>

      {/* Background Layer 2: 3D Scene */}
      <div className="absolute inset-0 z-[1] opacity-40">
        <HeroScene />
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] z-0 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] z-0 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Overlay Gradients */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-white via-transparent to-white/90 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_center,transparent_0%,white_90%)] pointer-events-none" />

      {/* Floating Elements */}
      {floatingIcons.map(({ Icon, ...pos }, i) => (
        <motion.div
          key={i}
          className="absolute z-10 hidden lg:block text-primary/20"
          style={pos}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={48} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Hero Content */}
      <motion.div
        className="container-custom z-10 relative"
        style={{ y: contentY, opacity }}
      >
        <div className="max-w-7xl mx-auto flex flex-col items-start lg:items-center lg:text-center">
          {/* Glass Card Container */}
          <div className="bg-white/40 backdrop-blur-md border border-white/40 p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-2xl shadow-primary/5">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex items-center gap-4 mb-8 justify-start lg:justify-center"
            >
              <div className="flex items-center gap-2 px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full">
                <Sparkles size={14} className="text-primary animate-pulse" />
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">
                  Elite Digital Engineering Studio
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <h1
              ref={textRef}
              className="font-black uppercase italic text-slate-900 mb-8 leading-[0.9] tracking-tighter drop-shadow-sm"
            >
              Engineering <br className="hidden md:block" />
              The Infinite <br className="hidden md:block" />
              <span className="text-gradient">Potential</span>
            </h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="max-w-2xl mx-auto"
            >
              <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-12 font-medium leading-relaxed italic">
                Infinity Tech crafts high-performance digital ecosystems, 
                scalable software architectures, and visionary user experiences 
                for brands that demand excellence.
              </p>

              <div className="flex flex-wrap items-center justify-start lg:justify-center gap-6">
                <Link href="/contact">
                  <MagneticButton className="bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40">
                    START PROJECT
                  </MagneticButton>
                </Link>
                <Link href="/portfolio">
                  <MagneticButton className="bg-white border border-slate-200 text-slate-900 hover:bg-slate-50 shadow-lg">
                    VIEW SHOWCASE
                  </MagneticButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-black text-slate-400">
          Scroll
        </span>
        <ChevronDown size={20} className="text-primary" />
      </motion.div>
    </section>
  );
}

