"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Project {
  title: string;
  category: string;
  image: string;
  color: string;
  description: string;
  strategy: string;
  results: string[];
}

const portfolioData: Record<string, Project> = {
  'aether-core': {
    title: 'Aether Core',
    category: 'AI Integration',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop',
    color: '#2563eb',
    description: 'A custom web application with integrated AI chatbot capabilities for automated customer support.',
    strategy: 'The objective was to build a responsive interface that could interact with AI models in real-time. I implemented a custom state-management system to ensure data integrity and a smooth user experience.',
    results: ['Improved user engagement', 'Seamless AI interaction', 'Responsive across all devices', 'Clean technical implementation']
  },
  'nova-retail': {
    title: 'Nova Retail',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop',
    color: '#7c3aed',
    description: 'A modern e-commerce platform designed for a personalized and smooth shopping experience.',
    strategy: 'Leveraging Next.js and server-side rendering, I built a shopping engine that remains fast and responsive. I integrated modern UI elements and optimized performance to improve conversion rates.',
    results: ['Faster page load times', 'Improved checkout flow', 'Responsive product catalogs', 'Secure payment integration']
  },
  'zenith-hub': {
    title: 'Zenith Hub',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    color: '#3b82f6',
    description: 'A data dashboard designed to provide clear visibility of business metrics.',
    strategy: 'The challenge was to present complex data in a way that is easy to understand. I developed a dashboard system with clear visualizations and intuitive interactions for real-time data tracking.',
    results: ['Enhanced data visibility', 'Real-time performance tracking', 'Clean and modern UI', 'Efficient data management']
  },
  'prism-ui': {
    title: 'Prism UI',
    category: 'UI Implementation',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2000&auto=format&fit=crop',
    color: '#2563eb',
    description: 'A high-performance component library for consistent and efficient product development.',
    strategy: 'I developed Prism UI to streamline the development process and ensure visual consistency. Every component is optimized for performance, accessibility, and clean code standards.',
    results: ['Faster development cycles', 'Consistent brand presentation', 'High accessibility standards', 'Optimized code quality']
  },
  'luxe-estates': {
    title: 'Luxe Estates',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
    color: '#7c3aed',
    description: 'An interactive real estate platform featuring high-quality property listings and responsive design.',
    strategy: 'I implemented an optimized image loading strategy and interactive property maps to allow users to explore listings easily. The focus was on performance and a high-end visual presentation.',
    results: ['Increased user engagement', 'High-quality lead generation', 'Seamless property discovery', 'Professional brand positioning']
  },
  'alpha-academy': {
    title: 'Alpha Academy',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    color: '#3b82f6',
    description: 'A modern learning management system interface designed for online education and collaboration.',
    strategy: 'The objective was to create a digital environment that supports learning and interaction. I built a custom interface that organizes course materials and collaborative tools effectively.',
    results: ['Improved student experience', 'Clean curriculum organization', 'Intuitive navigation', 'Reliable technical performance']
  }
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const project = portfolioData[id] || portfolioData['aether-core'];

  return (
    <div className="bg-white">
      <main className="pt-20">
        <section className="h-[80vh] w-full relative overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div className="max-w-7xl">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-8 block"
              >
                Case Study / {project.category}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] text-slate-900"
              >
                {project.title}
              </motion.h1>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
              <div className="lg:col-span-7">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 text-slate-900 border-b-2 border-slate-100 pb-6 italic">The Vision</h2>
                  <p className="text-2xl text-slate-600 leading-relaxed mb-16 italic font-medium">
                    {project.description}
                  </p>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 text-slate-900 border-b-2 border-slate-100 pb-6 italic">Project Execution</h2>
                  <p className="text-lg text-slate-500 leading-relaxed mb-16 font-medium">
                    {project.strategy}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="bg-slate-50 p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                  <h3 className="text-xl font-black uppercase tracking-widest mb-10 text-primary">Project Outcomes</h3>
                  <ul className="space-y-10">
                    {project.results.map((result: string, i: number) => (
                      <li key={i} className="flex flex-col gap-2 group">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-primary transition-colors">Goal — 0{i+1}</span>
                        <span className="text-2xl font-black uppercase tracking-tighter text-slate-900 italic">{result}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="mt-16 w-full inline-block text-center py-6 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-primary transition-all">
                    Start Your Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding overflow-hidden">
          <div className="container-custom">
            <div className="relative rounded-[4rem] overflow-hidden aspect-video shadow-2xl">
              <img 
                src={project.image} 
                alt={`${project.title} Full View`}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
