"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wide uppercase border border-primary/30 rounded-full bg-primary/10 text-primary"
          >
            The Future of Digital Transformation
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Infinite Possibilities with <span className="text-primary">AI‑Powered</span> Solutions
          </h1>
          <p className="text-xl text-secondaryText mb-10 max-w-2xl mx-auto leading-relaxed">
            Infinity Tech delivers premium AI automation, custom software, and high-end UI/UX design to scale your business into the future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" className="w-full sm:w-auto text-lg group">
              Start Your Project
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto text-lg">
              View Our Work
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10" />
    </section>
  );
}
