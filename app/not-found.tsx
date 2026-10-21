"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img 
            src="/logo/logo.png" 
            alt="Infinity Tech" 
            className="h-12 w-auto mx-auto mb-6"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1 className="text-[15vw] font-black text-slate-100 leading-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none uppercase">
            404
          </h1>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">
              Lost in the <span className="text-primary">Infinite?</span>
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-md mx-auto mb-10 italic">
              The page you are looking for has drifted beyond our current digital horizon.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative z-10"
        >
          <Link 
            href="/" 
            className="inline-block px-10 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-full shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
          >
            Return to Core
          </Link>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
