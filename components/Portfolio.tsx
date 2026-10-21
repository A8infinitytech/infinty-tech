"use client";
import { Section } from '@/components/Section';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'AI Analytics Platform',
    category: 'SaaS / AI',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    link: '#',
  },
  {
    title: 'FinTech Dashboard',
    category: 'Web App',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    link: '#',
  },
  {
    title: 'E-commerce Redesign',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    link: '#',
  },
];

export default function Portfolio() {
  return (
    <Section id="portfolio">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Work</h2>
          <p className="text-secondaryText max-w-xl">
            A showcase of our latest projects and digital innovations across various industries.
          </p>
        </div>
        <button className="text-primary font-medium hover:underline flex items-center gap-2">
          View All Projects <ExternalLink size={18} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-white/10"
          >
            <div className="aspect-video relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <a href={project.link} className="bg-primary text-white p-3 rounded-full">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-xl font-bold mt-2">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
