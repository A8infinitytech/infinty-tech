"use client";
import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import { Send } from 'lucide-react';

export default function ContactCTA() {
  return (
    <Section className="mb-20">
      <div className="bg-gradient-to-br from-primary to-accent rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
            Ready to Build the Future?
          </h2>
          <p className="text-white/80 text-xl mb-10">
            Let&apos;s collaborate to bring your next big idea to life with cutting-edge AI and premium digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto text-lg px-8">
              Schedule a Consultation
            </Button>
            <a href="mailto:infinitytech@gmail.com" className="text-white font-semibold hover:underline flex items-center gap-2">
              <Send size={20} /> infinitytech@gmail.com
            </a>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
      </div>
    </Section>
  );
}
