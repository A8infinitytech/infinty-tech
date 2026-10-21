"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FaLinkedin, FaTwitter, FaGithub, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'; // Import social icons
import Logo from '../logo';

// Reusable SocialIcon component (if not already defined globally or imported)
function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
    >
      {icon}
    </a>
  );
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'py-3 sm:py-4 bg-white/90 backdrop-blur-3xl border-b border-slate-200/50 shadow-sm'
            : 'py-4 sm:py-5 md:py-8 lg:py-10'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
  <Logo />
</Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[10px] xl:text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-all relative group py-1"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 xl:px-8 py-2.5 xl:py-3 rounded-full bg-slate-900 text-white font-bold text-[10px] xl:text-[11px] uppercase tracking-widest hover:bg-primary transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-slate-200 whitespace-nowrap"
            >
              Start Project
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2.5 sm:p-3 text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl sm:rounded-2xl transition-all active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          >
            {isOpen ? <X size={18} className="sm:w-5 sm:h-5" /> : <Menu size={18} className="sm:w-5 sm:h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-white lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-screen px-6 sm:px-8 pt-20 sm:pt-24 pb-8">
              {/* Mobile Nav Links */}
              <div className="flex flex-col gap-4 sm:gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tighter hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Socials */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-slate-100"
              >
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] mb-4">
                  Connect With Us
                </p>
                <div className="flex gap-4">
                  <SocialIcon icon={<FaLinkedin />} href="#" /> {/* User to fill */}
                  <SocialIcon icon={<FaTwitter />} href="#" /> {/* User to fill */}
                  <SocialIcon icon={<FaGithub />} href="#" /> {/* User to fill */}
                  <SocialIcon icon={<FaWhatsapp />} href="https://wa.me/923012229525" />
                  <SocialIcon icon={<FaInstagram />} href="https://www.instagram.com/its_infinity_tech/" />
                  <SocialIcon icon={<FaFacebook />} href="https://www.facebook.com/profile.php?id=61590980911003" />
                </div>
              </motion.div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 sm:mt-10"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block">
                  <div className="w-full py-4 sm:py-5 rounded-2xl sm:rounded-3xl bg-primary text-white font-black text-lg sm:text-xl uppercase tracking-widest shadow-xl shadow-primary/20 text-center">
                    Start Project
                  </div>
                </Link>
              </motion.div>

              {/* Mobile Footer Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-8 sm:pt-10 border-t border-slate-100"
              >
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] mb-1.5 sm:mb-2">
                  Get in Touch
                </p>
                <p className="text-slate-600 font-medium text-sm sm:text-base md:text-lg">
                  a8infinitytech@gmail.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}