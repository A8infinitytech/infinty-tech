"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const categories = ['All', 'Corporate', 'E-Commerce', 'Real Estate', 'Software', 'Education'];

const projects = [
  {
    title: 'Future Corp Identity',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Luxe Fashion Store',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Modern Estates',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Nexus Dashboard',
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Alpha Academy',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Gourmet Bistro',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              Our Portfolio
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-black">Latest <span className="text-gradient">Innovations</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === cat 
                  ? 'bg-primary text-white' 
                  : 'bg-white/5 text-muted hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-surface cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex flex-col justify-end p-10">
                  <span className="text-primary font-bold uppercase text-xs tracking-widest mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-black mb-4">{project.title}</h3>
                  <div className="flex items-center gap-2 text-white font-bold group/link">
                    View Case Study 
                    <ExternalLink size={18} className="group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
