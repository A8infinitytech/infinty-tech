"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Code, ShoppingCart, Layout, Globe, CheckCircle2, Sparkles, Zap, Search, Smartphone } from 'lucide-react';
import Link from 'next/link';

interface Service {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  features: string[];
}

const servicesData: Record<string, Service> = {
  'website-development': {
    title: 'Website Development',
    icon: <Globe size={40} />,
    description: 'I build high-performance, responsive websites that serve as a strong digital foundation for your brand.',
    details: 'My development process focuses on fast loading speeds, technical SEO optimization, and seamless responsiveness across all devices. I leverage Next.js and React to deliver websites that look professional and perform exceptionally well.',
    features: ['Next.js / React Frameworks', 'Core Web Vitals Optimization', 'Clean Technical SEO', 'Reliable Cloud Deployment']
  },
  'web-applications': {
    title: 'Web Applications',
    icon: <Code size={40} />,
    description: 'Custom web applications designed to handle complex business logic and provide smooth user experiences.',
    details: 'I build robust web systems that manage data efficiently and provide intuitive interfaces for users. From custom management tools to specialized SaaS platforms, I deliver reliable, high-quality solutions.',
    features: ['Custom Web Engineering', 'Efficient Data Management', 'Secure API Integration', 'Scalable Architecture']
  },
  'ecommerce': {
    title: 'E-Commerce',
    icon: <ShoppingCart size={40} />,
    description: 'Conversion-focused online stores designed for a seamless shopping experience.',
    details: 'I help businesses build modern e-commerce sites with secure payment integrations, optimized product management, and clear user journeys. My focus is on creating a fast and reliable shopping environment that encourages sales.',
    features: ['Modern E-Commerce Stores', 'Secure Payment Gateways', 'Inventory Management Setup', 'Performance Optimization']
  },
  'ui-ux-design': {
    title: 'UI/UX Design',
    icon: <Layout size={40} />,
    description: 'Quality interface implementation that balances modern aesthetics with user-focused design.',
    details: 'Design is about more than just looks. I create immersive digital experiences that reflect your brand identity and guide users through clear, intuitive interaction design.',
    features: ['Modern Interface Design', 'Interactive Prototyping', 'Consistent Brand Identity', 'Smooth User Experience']
  },
  'scalable-development': {
    title: 'Scalable Development',
    icon: <Code size={40} />,
    description: 'Crafting efficient and scalable web solutions to support your business growth with modern architectures.',
    details: 'I build scalable web applications using Next.js, TypeScript, and cloud-native architectures that grow with your business. From startup MVPs to enterprise platforms, every solution is engineered for performance, maintainability, and long-term success.',
    features: ['Next.js / TypeScript Architecture', 'Microservices & API Design', 'Database Optimization', 'Cloud-Native Deployment', 'CI/CD Pipeline Setup', 'Performance Monitoring']
  },
  'ai-chatbot-integration': {
    title: 'AI & Chatbot Integration',
    icon: <Sparkles size={40} />,
    description: 'Integrating intelligent AI and chatbot functionalities to enhance user interaction and automate workflows.',
    details: 'I implement custom AI agents, chatbots, and LLM-powered features that integrate seamlessly into your web applications. From customer support automation to intelligent content generation, I deliver AI solutions that provide real business value.',
    features: ['Custom AI Agents', 'LLM Integration (OpenAI, Anthropic)', 'Chatbot Development', 'Vector Database Setup', 'RAG Implementation', 'AI Workflow Automation']
  },
  'premium-ui-ux': {
    title: 'Premium UI/UX',
    icon: <Layout size={40} />,
    description: 'Designing intuitive and visually stunning user interfaces for exceptional digital experiences.',
    details: 'I create premium user interfaces that combine aesthetic excellence with usability. Every design decision is backed by user research and usability principles, resulting in interfaces that not only look beautiful but drive conversions and user satisfaction.',
    features: ['User Research & Strategy', 'High-Fidelity Prototyping', 'Design System Creation', 'Accessibility (WCAG) Compliance', 'Motion Design & Micro-interactions', 'Usability Testing']
  },
  'optimized-code': {
    title: 'Optimized Code',
    icon: <Zap size={40} />,
    description: 'Delivering clean, maintainable, and high-performance code for optimal website functionality.',
    details: 'I write production-grade code following best practices in software engineering. From performance optimization and code splitting to type safety and testing strategies, every line of code is crafted for maintainability, scalability, and peak performance.',
    features: ['TypeScript & Strict Typing', 'Performance Optimization', 'Code Splitting & Lazy Loading', 'Automated Testing (Unit/E2E)', 'Code Quality & Linting', 'Bundle Size Optimization']
  },
  'chatbot-integration': {
    title: 'Custom Chatbots & AI',
    icon: <Sparkles size={40} />,
    description: 'Simple API-based bots and FAQ assistants integrated into web apps.',
    details: 'I build intelligent chatbot solutions that integrate seamlessly into your web applications. From simple FAQ bots to advanced AI agents with natural language understanding, I deliver conversational experiences that enhance user engagement and automate support.',
    features: ['Custom Chatbot Development', 'LLM Integration', 'Natural Language Processing', 'Multi-channel Deployment', 'Analytics & Insights', 'Human Handoff Support']
  },
  'optimization': {
    title: 'Website Optimization & Bug Fixing',
    icon: <Search size={40} />,
    description: 'Performance tuning, SEO improvements, and error resolution.',
    details: 'I optimize websites for peak performance, better search rankings, and reliability. From Core Web Vitals optimization to debugging complex issues, I ensure your digital presence runs smoothly and efficiently.',
    features: ['Core Web Vitals Optimization', 'SEO Technical Audits', 'Performance Profiling', 'Bug Diagnosis & Resolution', 'Bundle Size Reduction', 'Caching Strategy Implementation']
  },
  'responsive-sites': {
    title: 'Responsive Modern Websites',
    icon: <Smartphone size={40} />,
    description: 'Tailored sites for businesses, startups, and individuals across all devices.',
    details: 'I create responsive websites that work flawlessly across all devices and screen sizes. Using modern CSS techniques and mobile-first approaches, I ensure your website delivers a consistent experience everywhere.',
    features: ['Mobile-First Development', 'Cross-Browser Compatibility', 'Responsive Design Systems', 'Touch-Friendly Interactions', 'Progressive Enhancement', 'Performance on Mobile Networks']
  }
};

export default function ServiceDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const service = servicesData[id] || servicesData['website-development'];

  return (
    <div className="bg-white">
      <main className="pt-40">
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
              <div className="lg:col-span-7">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-12 p-8 bg-slate-50 rounded-3xl w-fit text-primary shadow-sm"
                >
                  {service.icon}
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-12 text-slate-900 italic"
                >
                  {service.title} <br /> <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">Expertise</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl text-slate-600 leading-relaxed mb-12 font-medium italic border-l-4 border-primary/20 pl-8"
                >
                  {service.description}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-slate-500 leading-relaxed mb-16 max-w-2xl font-medium"
                >
                  {service.details}
                </motion.div>
              </div>
              
              <div className="lg:col-span-5 sticky top-40">
                <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl">
                  <h3 className="text-xl font-black uppercase tracking-widest mb-10 text-primary">Key Advantages</h3>
                  <ul className="space-y-8">
                    {service.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-6 group">
                        <div className="text-primary group-hover:scale-125 transition-transform">
                          <CheckCircle2 size={24} />
                        </div>
                        <span className="font-bold uppercase tracking-widest text-[10px] italic">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="mt-16 w-full flex items-center justify-center py-6 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-primary hover:text-white transition-all">
                    Start Project
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
