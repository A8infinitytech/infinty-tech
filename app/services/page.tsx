"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, ShoppingCart, Layout, Globe } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'High-performance, responsive websites built with Next.js and React, tailored to your specific business needs.',
    icon: <Globe size={32} />,
  },
  {
    id: 'web-applications',
    title: 'Web Applications',
    description: 'Custom web applications built with Next.js, TypeScript, and API integrations for complex functionality.',
    icon: <Code size={32} />,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    description: 'Modern online stores with secure payment integration, responsive design, and optimized checkout flows.',
    icon: <ShoppingCart size={32} />,
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'High-quality interface design that balances modern aesthetics with intuitive user experiences.',
    icon: <Layout size={32} />,
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <main className="pt-40">
        <section className="section-padding overflow-hidden">
          <div className="container-custom">
            <div className="max-w-4xl mb-32">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8 block"
              >
                My Expertise
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-12 text-slate-900"
              >
                Developing <br /> <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">Solutions</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-slate-600 leading-tight font-medium italic border-l-2 border-primary/20 pl-8"
              >
                I provide specialized web development services to help you build a strong and effective digital presence.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-12 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/30 hover:shadow-2xl transition-all duration-700 group"
                >
                  <div className="mb-12 p-6 bg-white rounded-3xl w-fit shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter text-slate-900">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-12 font-medium">
                    {service.description}
                  </p>
                  <Link href={`/services/${service.id}`} className="flex items-center gap-4 group/link">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">View Details</span>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-white transition-all">
                      <span>→</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-slate-900 text-white">
          <div className="container-custom text-center">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12">
              Ready to build <br /> your <span className="text-primary italic">Idea?</span>
            </h2>
            <Link href="/contact" className="inline-block px-16 py-6 bg-primary text-white font-black uppercase tracking-[0.2em] text-sm rounded-full transition-transform hover:scale-110 shadow-2xl">
              Start Project
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
