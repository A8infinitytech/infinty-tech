"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    id: 'aether-core',
    title: 'Aether Core',
    category: 'AI Integration',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    description: 'A custom web application featuring integrated AI chatbot capabilities for automated customer support.'
  },
  {
    id: 'nova-retail',
    title: 'Nova Retail',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    description: 'A modern e-commerce platform with a focus on responsive design and a seamless checkout experience.'
  },
  {
    id: 'zenith-hub',
    title: 'Zenith Hub',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    description: 'A comprehensive data dashboard for real-time visualization of business metrics and performance.'
  },
  {
    id: 'prism-ui',
    title: 'Prism UI',
    category: 'UI Implementation',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    description: 'A high-performance component library built for consistent branding across multiple digital products.'
  },
  {
    id: 'luxe-estates',
    title: 'Luxe Estates',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    description: 'An interactive real estate platform with high-quality imagery and responsive property listings.'
  },
  {
    id: 'alpha-academy',
    title: 'Alpha Academy',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    description: 'A modern learning management system interface designed for collaborative online education.'
  }
];

export default function PortfolioPage() {
  return (
    <div className="bg-white">
      <main className="pt-40">
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mb-32">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8 block"
              >
                Selected Work
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-slate-900"
              >
                Project <br /> <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">Showcase</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-slate-600 leading-tight font-medium italic border-l-2 border-primary/20 pl-8"
              >
                A collection of web development projects that demonstrate technical expertise and attention to detail.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Link href={`/portfolio/${project.id}`} className="block relative overflow-hidden rounded-[3rem] aspect-[4/3] mb-8 bg-slate-100">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute bottom-10 left-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="px-8 py-3 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-full shadow-2xl">
                        View Project
                      </div>
                    </div>
                  </Link>
                  <div className="px-4">
                    <span className="text-primary font-black uppercase tracking-[0.4em] text-[8px] mb-4 block">{project.category}</span>
                    <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-4">{project.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed max-w-md italic">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
