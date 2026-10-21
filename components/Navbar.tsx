"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          A8 Infiniti Tech
        </Link>
        {/* Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-secondaryText hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" className="ml-4">Get Started</Button>
        </div>
        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:bg-white/10"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: open ? 'auto' : 0 }}
        className="overflow-hidden md:hidden bg-background border-t border-white/10"
      >
        <div className="px-4 py-2 flex flex-col space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-secondaryText hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="primary" className="mt-2" onClick={() => setOpen(false)}>
            Get Started
          </Button>
        </div>
      </motion.div>
    </nav>
  );
}
