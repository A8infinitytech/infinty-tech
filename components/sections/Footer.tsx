"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { ChevronUp } from 'lucide-react'; // Import ChevronUp icon

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // Show button after scrolling 300px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-24 pb-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <img 
                src="/logo/logo.png" 
                alt="Infinity Tech" 
                className="h-8 w-auto object-contain transition-transform group-hover:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <span className="text-2xl font-black text-slate-900 block tracking-tighter uppercase">
                Infinity <span className="text-primary">Tech</span>
              </span>
            </Link>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-sm">
              Building high-performance digital solutions for businesses and personal brands. Delivering modern web experiences through clean code and quality design.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<FaLinkedin />} href="#" /> {/* User to fill */}
              <SocialIcon icon={<FaTwitter />} href="#" /> {/* User to fill */}
              <SocialIcon icon={<FaGithub />} href="#" /> {/* User to fill */}
              <SocialIcon icon={<FaWhatsapp />} href="https://wa.me/923012229525" />
              <SocialIcon icon={<FaInstagram />} href="https://www.instagram.com/its_infinity_tech/" />
              <SocialIcon icon={<FaFacebook />} href="https://www.facebook.com/profile.php?id=61590980911003" />
            </div>
          </div>
          
          <div>
            <h4 className="text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] mb-10">Services</h4>
            <ul className="space-y-6">
              <FooterLink href="/services/website-development">Website Development</FooterLink>
              <FooterLink href="/services/web-applications">Web Applications</FooterLink>
              <FooterLink href="/services/ecommerce">E-Commerce</FooterLink>
              <FooterLink href="/services/ui-ux-design">UI/UX Design</FooterLink>
              <FooterLink href="/services/optimization">Website Optimization</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] mb-10">Navigation</h4>
            <ul className="space-y-6">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 text-[11px] font-black uppercase tracking-[0.3em] mb-10">Contact Information</h4>
            <ul className="space-y-6">
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Email</span>
                <span className="text-slate-600 font-medium">a8infinitytech@gmail.com</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Phone</span>
                <span className="text-slate-600 font-medium">03181935228</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Availability</span>
                <span className="text-slate-600 font-medium">Worldwide (Remote)</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] text-center">
            © {new Date().getFullYear()} Infinity Tech. All rights reserved.
          </p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-slate-500 hover:text-primary transition-colors flex items-center gap-2 group">
        <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
    >
      {icon}
    </a>
  );
}
