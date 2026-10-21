"use client";
import { Section } from '@/components/Section';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const reasons = [
  {
    title: 'Expertise in AI',
    description: 'Our team stays ahead of the curve, leveraging the latest advancements in artificial intelligence.',
  },
  {
    title: 'Scalable Solutions',
    description: 'We build with the future in mind, ensuring your solutions can grow as your business does.',
  },
  {
    title: 'User-Centric Approach',
    description: 'We prioritize the end-user in every design and development decision we make.',
  },
  {
    title: 'Agile Methodology',
    description: 'Our efficient development process ensures timely delivery and high-quality results.',
  },
];

export default function WhyChoose() {
  return (
    <Section id="why-choose" className="bg-white/5 rounded-3xl p-8 md:p-16">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose Infinity Tech?</h2>
          <p className="text-secondaryText mb-8 text-lg">
            We are more than just a tech agency; we are your strategic partner in digital innovation. Our commitment to excellence and passion for technology drive us to deliver exceptional results.
          </p>
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4"
              >
                <div className="mt-1 text-primary">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">{reason.title}</h4>
                  <p className="text-secondaryText">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="aspect-square bg-gradient-to-tr from-primary to-accent opacity-20 blur-3xl absolute inset-0 rounded-full" />
          <div className="relative z-10 bg-glass p-8 rounded-2xl border border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-1">99%</div>
                <div className="text-sm text-secondaryText">Client Satisfaction</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-secondaryText">Projects Delivered</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-secondaryText">Expert Support</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-primary mb-1">10+</div>
                <div className="text-sm text-secondaryText">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
