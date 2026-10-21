"use client";
import { Section } from '@/components/Section';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What industries do you specialize in?',
    answer: 'We work with a wide range of industries including FinTech, Healthcare, SaaS, E-commerce, and specialized AI startups.',
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on complexity. A typical MVP can take 4-8 weeks, while larger enterprise solutions may take several months.',
  },
  {
    question: 'Do you offer ongoing support?',
    answer: 'Yes, we provide flexible maintenance and support packages to ensure your digital products continue to perform optimally.',
  },
  {
    question: 'How do you handle data security?',
    answer: 'Security is baked into our process. We follow industry best practices and compliance standards to protect your sensitive data.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Section id="faq">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Common Questions</h2>
        <p className="text-secondaryText max-w-2xl mx-auto">
          Everything you need to know about working with Infinity Tech.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
          >
            <button
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6 pt-0 text-secondaryText leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
