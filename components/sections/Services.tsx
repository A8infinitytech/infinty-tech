"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, ShoppingCart, Search, Settings, Smartphone } from 'lucide-react';

const services = [
  {
    title: 'Website Development',
    description: 'Full‑stack web development with Next.js & TypeScript, UI/UX design, AI chatbot integration, performance & SEO optimization, and responsive modern sites.',
    icon: <Globe size={32} />,
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    title: 'Custom Web Apps',
    description: 'Scalable and secure web applications tailored to your specific business requirements.',
    icon: <Code size={32} />,
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    title: 'E-Commerce Solutions',
    description: 'Powerful online stores with seamless payment integration and optimized user journeys.',
    icon: <ShoppingCart size={32} />,
    color: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive and visually stunning designs that prioritize user experience and brand identity.',
    icon: <Layout size={32} />,
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    title: 'SEO Optimization',
    description: 'Strategic optimization to improve search engine rankings and drive organic traffic.',
    icon: <Search size={32} />,
    color: 'from-red-500/20 to-orange-500/20'
  },
  {
    title: 'Maintenance & Support',
    description: 'Ongoing technical support and maintenance to ensure your digital products stay up-to-date.',
    icon: <Settings size={32} />,
    color: 'from-indigo-500/20 to-blue-500/20'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
          >
            Our Expertise
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-black mb-6">Premium <span className="text-gradient">Solutions</span></h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            We combine technical excellence with artistic design to deliver digital products that stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-10 rounded-[2rem] bg-glass hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="mb-8 text-primary group-hover:scale-110 group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted group-hover:text-white/80 transition-colors leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Learn More <span className="text-lg">→</span>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-6xl select-none group-hover:text-white/10 transition-colors">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Globe(props: React.ComponentProps<typeof Smartphone>) {
  return <Smartphone {...props} /> // Fallback or replacement
}
