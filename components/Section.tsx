"use client";
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ children, id, className = '' }: SectionProps) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6 }}
    className={`py-12 ${className}`}
  >
    <div className="container mx-auto px-4">
      {children}
    </div>
  </motion.section>
);
