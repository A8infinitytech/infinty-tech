"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); 
    return () => clearTimeout(timer);
  }, []);

  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Floating Dots (Increased Size & Opacity) */}
          <div className="absolute inset-0">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2.5 h-2.5 bg-blue-600/70 rounded-full shadow-sm"
                style={{
                  left: `${(i * 17) % 100}%`,
                  top: `${(i * 23) % 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  scale: [0.8, 1.4, 0.8],
                  opacity: [0.3, 0.9, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (i % 5) * 0.3,
                }}
              />
            ))}
          </div>

          {/* Center Logo & Spinner Container */}
          <div className="relative flex items-center justify-center">
            
            {/* Outer Continuous Smooth Rotating Ring */}
            <motion.div
              className="absolute w-36 h-36 rounded-full border-4 border-slate-100 border-t-blue-600 border-r-blue-500"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />

            {/* Inner Glow Background */}
            <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />

            {/* Logo Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="z-10 p-4"
            >
              <img 
                src="/logo/logo.png" 
                alt="Infinity Tech Logo" 
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-md"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}