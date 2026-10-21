import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-background/80 border-t border-white/10 py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-secondaryText">
        <div>
          <h3 className="text-primary font-semibold mb-2">Infinity Tech</h3>
          <p>Transforming businesses with AI‑powered digital solutions.</p>
        </div>
        <div>
          <h4 className="font-medium mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Connect</h4>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaLinkedin size={20} /></a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaTwitter size={20} /></a>
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors"><FaGithub size={20} /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-secondaryText text-xs">
        © {new Date().getFullYear()} Infinity Tech. All rights reserved.
      </div>
    </footer>
  );
}
