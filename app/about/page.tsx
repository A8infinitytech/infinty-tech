"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Sparkles, Target, Users, Zap, Shield, Award, Smile, PhoneCall } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Counter Component
function Counter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          if (end === 0) {
            setCount(0);
            return;
          }
          if (start === end) {
            setCount(end);
            return;
          }

          const totalMilliseconds = 1600;
          const incrementTime = Math.max(totalMilliseconds / end, 16);

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
          }, incrementTime);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value]);

  return <span ref={ref}>{count}</span>;
}

export default function AboutPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const processSteps = gsap.utils.toArray('.process-step');
    processSteps.forEach((step: any) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center+=100",
        end: "bottom center",
        toggleClass: "active",
      });
    });
  }, []);

  return (
    <div className="bg-white font-sans antialiased selection:bg-[#001eff]/30 overflow-x-hidden">
      <main>
        
        {/* SECTION 1: HERO */}
        <section className="min-h-screen relative flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50 pt-20">
          <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc9af59bb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
          </div>
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#001eff]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#0026ff]/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#001eff]/10 border border-[#001eff]/20 text-[#001eff] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles size={12} /> Innovation Lives Here
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
                Building Digital Experiences <br />That Drive <span className="bg-gradient-to-r from-[#0026ff] to-[#0015b3] bg-clip-text text-transparent italic font-serif">Results</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                Infinity Tech helps businesses scale through hyper-modern web applications, premium architectures, robust engineering, and clean interactive user experiences.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-[#0026ff] to-[#001bcc] text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-xl shadow-[#001eff]/20 hover:shadow-[#001eff]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Start Your Project
                </Link>
                <Link
                  href="/portfolio"
                  className="px-8 py-4 border border-slate-200 text-slate-700 bg-white/80 font-bold uppercase tracking-wider text-xs rounded-xl hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all backdrop-blur-sm shadow-sm"
                >
                  View Our Work
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer hidden sm:flex"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">Scroll Down</span>
            <ChevronDown size={18} className="text-[#001eff]" />
          </motion.div>
        </section>

        {/* SECTION 2: COMPANY STORY */}
        <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#001eff]/10 rounded-full blur-[130px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-7 space-y-6"
            >
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Our <span className="bg-gradient-to-r from-[#0026ff] to-[#3355ff] bg-clip-text text-transparent italic font-serif">Story</span> & Core Mission
              </h2>
              <div className="h-1 w-20 bg-[#001eff] rounded" />
              
              <div className="space-y-4 text-slate-400 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Infinity Tech was founded with a unified clear vision: to completely eliminate the gap between high-level conceptual blueprints and flawless architectural digital deployment. We engineering high-performing, user-centric web platforms.
                </p>
                <p>
                  We build highly customized enterprise architectures that streamline workflows, solve operational bottlenecks, and expand online positioning globally. We make sure your technical engineering stays highly secure, blazing fast, and deeply responsive.
                </p>
                <p className="text-slate-300 font-medium">
                  Brands scale with Infinity Tech because of our clean product tracking metrics, complete clarity transparency, and an unbroken track record of strategic conversion delivery. We do not just code; we engineer partnerships.
                </p>
              </div>
            </motion.div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="w-full h-[350px] sm:h-[450px] bg-[url('https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center rounded-2xl shadow-2xl border border-white/5 relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl shadow-xl border border-white/10 text-center backdrop-blur-md"
              >
                <div className="inline-flex p-2 bg-[#001eff]/10 rounded-lg text-[#001eff] mb-2 border border-[#001eff]/20">
                  <Target size={20} />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Our Core Vision</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  To be the global gold standard for technical product design and enterprise web production.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COMPANY VIDEO */}
        <section className="py-24 bg-slate-50 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-12"
            >
              See Our <span className="bg-gradient-to-r from-[#0026ff] to-[#0015b3] bg-clip-text text-transparent italic font-serif">Craft</span> In Live Action
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl border border-slate-200 bg-black"
            >
              <video
                src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: TEAM / WORK CULTURE */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Our Ecosystem & <span className="bg-gradient-to-r from-[#0026ff] to-[#0015b3] bg-clip-text text-transparent italic font-serif">Values</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-500 font-medium">
                The strict guidelines that keep our high-level design engineering continuous, fast, and globally protective.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "High Innovation",
                  description: "Constantly testing and pushing bleeding-edge software models to give you unfair leverage.",
                  icon: <Zap size={22} />,
                  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"
                },
                {
                  title: "Direct Strategy",
                  description: "Full collaborative alignment with project metrics to protect deployment timelines.",
                  icon: <Users size={22} />,
                  image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                },
                {
                  title: "Clean Execution",
                  description: "Replacing dirty legacy frameworks with hyper-scalable system configurations.",
                  icon: <Target size={22} />,
                  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                },
                {
                  title: "Absolute Safety",
                  description: "Guaranteed architectural optimization and iron-clad structure parameters.",
                  icon: <Shield size={22} />,
                  image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2070&auto=format&fit=crop"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-44 mb-5 rounded-xl overflow-hidden bg-slate-200 shadow-inner">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute top-3 left-3 p-2 rounded-lg bg-white/90 backdrop-blur-sm text-[#001eff] shadow-sm border border-white/50">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: WHY CHOOSE INFINITY TECH */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Why Choose <span className="bg-gradient-to-r from-[#0026ff] to-[#0015b3] bg-clip-text text-transparent italic font-serif">Infinity Tech</span>?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Modern Development", description: "Utilizing top-tier protocols like Next.js App Router, advanced Tailwind engines, and clean TypeScript definitions.", icon: "🚀" },
                { title: "Insane Engine Speeds", description: "Minifying application loads to guarantee elite core web vitals performance scores across analytics trackers.", icon: "⚡" },
                { title: "Fluid Adaptation", description: "Pixel-perfect grid mapping and media boundaries ensure flawless performance across mobile and desktop devices.", icon: "📱" },
                { title: "Semantic SEO Structures", description: "Built with rich-structured metadata matrices directly from base build setups to maximize crawl indexing positioning.", icon: "🔍" },
                { title: "Direct Continuous Support", description: "Post-deployment validation checkpoints and instant continuous patch coverage parameters whenever needed.", icon: "🤝" },
                { title: "Modular Architecture", description: "Isolating code logic models so future updates can be deployed cleanly without cascading structural bugs.", icon: "📈" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col items-start"
                >
                  <div className="text-3xl mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">{feature.icon}</div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: STATS SECTION */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Projects Completed', value: 50, suffix: '+', icon: <Award size={20} className="text-[#001eff]" /> },
                { label: 'Happy Clients', value: 25, suffix: '+', icon: <Smile size={20} className="text-[#001eff]" /> },
                { label: 'Success Velocity', value: 99, suffix: '%', icon: <Zap size={20} className="text-[#001eff]" /> },
                { label: 'Daily Live Support', value: 12, suffix: 'hr', icon: <PhoneCall size={20} className="text-[#001eff]" /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 shadow-sm flex items-center gap-5"
                >
                  <div className="p-3 bg-[#001eff]/10 rounded-xl border border-[#001eff]/20 shrink-0">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 tracking-tight">
                      <Counter value={stat.value} />{stat.suffix}
                    </div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mt-0.5">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: PROCESS SECTION */}
        <section className="py-24 bg-slate-950 text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Our Seamless <span className="bg-gradient-to-r from-[#0026ff] to-[#3355ff] bg-clip-text text-transparent italic font-serif">Process</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium max-w-xl mx-auto">
                How we isolate complex systems engineering from initiation tracking to smooth deployment delivery.
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-slate-800 hidden md:block" />
              
              <div className="space-y-10">
                {[
                  { title: "Discovery & Analysis", description: "We run exhaustive evaluation parameters to detail scope tracking benchmarks and align design goals perfectly." },
                  { title: "Architecture Mapping", description: "Drafting layout structures and data definitions prior to production phases to maximize transparency." },
                  { title: "User Experience Design", description: "Constructing ultra-clean interactive visual configurations that maintain modern high aesthetic identity standards." },
                  { title: "System Engineering", description: "Coding isolated module trees using optimal component guidelines for performance preservation." },
                  { title: "Integrity Validation", description: "Exhaustive responsive stress testing sequences to track down and eliminate platform bugs completely." },
                  { title: "Product Deployment", description: "Direct server provisioning setup integration to give your target audience instant connection interfaces." },
                ].map((step, index) => (
                  <div key={index} className="process-step relative flex flex-col md:flex-row gap-6 md:gap-10 items-start pl-14 md:pl-0">
                    
                    {/* Number Pin Left side */}
                    <div className="absolute left-0 md:relative md:left-auto w-12 h-12 rounded-xl bg-gradient-to-br from-[#0026ff] to-[#0015b3] text-white font-black text-base flex items-center justify-center border border-white/10 shadow-lg shrink-0 z-10">
                      {index + 1}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="bg-slate-900 border border-white/5 p-6 rounded-2xl shadow-xl w-full"
                    >
                      <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-normal">{step.description}</p>
                    </motion.div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: GALLERY SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Our Showcase <span className="bg-gradient-to-r from-[#0026ff] to-[#0015b3] bg-clip-text text-transparent italic font-serif">Gallery</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=2070&auto=format&fit=crop"
              ].map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-xl overflow-hidden shadow-md aspect-video group border border-slate-150 relative bg-slate-100"
                >
                  <img
                    src={src}
                    alt={`Ecosystem Grid Visual ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-990/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: CLIENT TESTIMONIALS */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                Trusted Strategic <span className="bg-gradient-to-r from-[#0026ff] to-[#0015b3] bg-clip-text text-transparent italic font-serif">Feedback</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                { quote: "Infinity Tech completely restructured our application. Their execution efficiency in handling next-generation stack structures saved us months of debugging workflow optimization.", name: "Sarah Chen", title: "Founder, Tech Innovations" },
                { quote: "The deployment speed was excellent. Our data scaling loops run smoother than ever, and product iterations take zero configurations. Incredible architectural communication.", name: "David Lee", title: "CEO, Global Solutions" },
                { quote: "Absolute production mastery. Everything looks visually stunning and ranks smoothly on analytic tools across regions. Hands down our go-to software team.", name: "Emily White", title: "Marketing Director, Retail Brands" },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between"
                >
                  <p className="text-slate-600 italic text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0026ff]/10 to-[#0015b3]/10 text-[#0026ff] rounded-full flex items-center justify-center font-bold text-sm border border-[#001eff]/20 shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-slate-400 text-xs font-medium">{testimonial.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: FINAL CTA */}
        <section className="py-24 bg-gradient-to-br from-[#0026ff] via-[#001eff] to-[#0015b3] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-white/[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Let's Build Something Premium <span className="text-blue-200 italic font-serif">Together</span>
            </h2>
            <p className="text-blue-100/80 text-sm sm:text-base max-w-xl mx-auto font-medium">
              Get in touch today to see how Infinity Tech can scale your production velocity with stable, top-performing digital products.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#0026ff] font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl shadow-2xl hover:bg-slate-50 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
              >
                Start Your Project
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}