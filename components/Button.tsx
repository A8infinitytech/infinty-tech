import React from 'react';
import { motion } from 'framer-motion';

// Simple reusable button with Framer Motion hover effect
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass =
    variant === 'primary'
      ? 'bg-primary text-white hover:bg-primary/90'
      : 'bg-accent text-white hover:bg-accent/90';
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClass} ${className} rounded-md px-6 py-3 font-medium transition-colors`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
