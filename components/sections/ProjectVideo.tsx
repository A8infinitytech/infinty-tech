"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

export default function ProjectVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="section-padding bg-white relative z-20 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-primary" />
                <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">
                  Featured Production
                </span>
              </div>
              
              <h2 className="font-black text-slate-900 mb-8 uppercase italic leading-[0.9] tracking-tighter">
                Visualizing <br />
                <span className="text-gradient">Technical</span> <br />
                Mastery
              </h2>
              
              <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium italic border-l-2 border-primary/20 pl-8">
                Our recent project for a high-growth fintech startup involved building a 
                complex real-time dashboard with seamless data visualization and 
                ultra-low latency performance.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Architecture</h4>
                    <p className="text-sm text-slate-500 font-medium">Next.js 15 & High-concurrency Node.js backend.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Interaction</h4>
                    <p className="text-sm text-slate-500 font-medium">Fluid GSAP-driven motion and Framer Canvas.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video Showcase */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div
              style={{ scale, opacity }}
              className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 border border-white group"
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/logo/logo.png"
              >
                <source src="/videos/webdevelopments.mp4" type="video/mp4" />
              </video>
              
              {/* Overlay Overlay */}
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-all duration-700" />
              
              {/* Play Button Icon (Visual only as it's auto-playing) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-xl">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
