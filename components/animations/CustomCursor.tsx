"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Direct GPU transform for instant dot movement (Zero Delay)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    // Fast & Smooth Lerp Loop for outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.25; // High responsiveness factor
      ringY += (mouseY - ringY) * 0.25;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseleave', handleMouseLeave);

    render();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block overflow-hidden">
      {/* Dynamic Outer Ring / Aura */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 will-change-transform transition-all duration-150 ease-out"
      >
        <motion.div
          animate={{
            scale: isActive ? 0.7 : isHovering ? 1.8 : 1,
            rotate: isHovering ? 90 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isHovering
              ? 'border-2 border-cyan-400 bg-cyan-500/10 shadow-[0_0_20px_rgba(34,211,238,0.4)]'
              : 'border border-primary/50 bg-primary/5 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
          }`}
        >
          {/* Subtle Cyber Corner Indicator when Hovering */}
          {isHovering && (
            <span className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
          )}
        </motion.div>
      </div>

      {/* Ultra-Fast Center Glowing Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 will-change-transform"
      >
        <motion.div
          animate={{
            scale: isActive ? 1.5 : isHovering ? 0 : 1,
          }}
          className={`w-2.5 h-2.5 rounded-full shadow-lg transition-colors duration-200 ${
            isHovering ? 'bg-cyan-300 shadow-cyan-400' : 'bg-primary shadow-blue-500'
          }`}
        />
      </div>
    </div>
  );
}