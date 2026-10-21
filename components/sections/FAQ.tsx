"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What industries do you specialize in?",
    answer: "I work with a wide range of industries including Business, E-Commerce, Real Estate, Education, and Healthcare. My solutions are custom-built to meet the unique challenges of each client."
  },
  {
    question: "How long does a typical project take?",
    answer: "A standard website typically takes 1-3 weeks, while more complex web applications can take 4-8 weeks. I provide a detailed timeline after our initial discussion."
  },
  {
    question: "Do you offer maintenance after launch?",
    answer: "Yes, I offer maintenance support to ensure your website stays secure, fast, and updated with the latest technological advancements."
  },
  {
    question: "Can you redesign existing websites?",
    answer: "Absolutely. I specialize in modernizing existing sites with clean code, improved performance, and high-quality UI/UX implementation."
  },
  {
    question: "What technologies do you use?",
    answer: "I primarily use Next.js, React, TypeScript, and Tailwind CSS. For interactive elements, I leverage high-performance motion engines like GSAP and Three.js."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4 block">
            Common Questions
          </span>
          <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tight text-slate-900">
            FAQ<span className="text-primary">.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Everything you need to know about my process and services.
          </p>
        </div>

        {/* Accordion Wrapper */}
        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = activeIndex === i;
            return (
              <div 
                key={i}
                className={`group rounded-2xl border transition-all duration-300 ${
                  isOpen 
                    ? 'border-primary/20 bg-slate-50/50 shadow-lg shadow-primary/[0.02]' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                >
                  <span className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${
                    isOpen ? 'text-primary' : 'text-slate-900 group-hover:text-primary'
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 ml-4 ${
                    isOpen ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                  }`}>
                    {isOpen ? (
                      <Minus size={18} className="transform rotate-180 transition-transform duration-300" />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 text-slate-600 leading-relaxed text-base md:text-lg font-normal border-t border-slate-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
