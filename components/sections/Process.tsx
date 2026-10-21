"use client";
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Discovery',
    description: 'We dive deep into your business goals, target audience, and market landscape.',
    icon: '01'
  },
  {
    title: 'Planning',
    description: 'Developing a comprehensive roadmap and technical architecture for your project.',
    icon: '02'
  },
  {
    title: 'Design',
    description: 'Crafting pixel-perfect, intuitive user interfaces and seamless experiences.',
    icon: '03'
  },
  {
    title: 'Development',
    description: 'Building high-performance, scalable codebases using modern frameworks.',
    icon: '04'
  },
  {
    title: 'Launch',
    description: 'Rigorous testing and final deployment to ensure a flawless user experience.',
    icon: '05'
  }
];

export default function Process() {
  return (
    <section id="process" className="py-32 bg-[#050816] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="text-center mb-24">
          <span className="text-primary font-bold uppercase tracking-[0.4em] text-xs mb-6 block">Methodology</span>
          <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight">Our <span className="text-gradient">Strategic Process</span></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A precise, results-oriented framework designed to transform ambitious visions into high-performance digital reality.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-12 left-0 w-full h-px bg-white/5 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group text-center lg:text-left"
              >
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#0b1026] border border-white/10 flex items-center justify-center text-white font-black text-2xl mb-10 mx-auto lg:mx-0 shadow-2xl group-hover:border-primary/50 group-hover:bg-primary transition-all duration-500">
                  <span className="group-hover:scale-125 transition-transform">{step.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight text-white">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {step.description}
                </p>
                
                {/* Decorative element */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
