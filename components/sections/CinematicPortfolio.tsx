"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'aether-core',
    title: 'AI Integration',
    category: 'Custom Application',
    video: 'https://media.istockphoto.com/id/1324892058/video/robot-demonstration-in-futuristic-platform.mp4?b=1&s=192_srp&k=20&c=SI3uYTlxBA577SeYBArU7-RQBCkaSgH2-XPBIFE8YJA=',
    color: '#2563eb'
  },
  {
    id: 'nova-retail',
    title: 'E-Commerce Solution',
    category: 'Online Store',
    video: 'https://media.istockphoto.com/id/1773197892/video/corporate-and-technology-website-animation-for-e-commerce.mp4?b=1&s=192_srp&k=20&c=Md_Lm4mWdE82RFD3MoDPvnsixCU_9QDJbOGD-HC9bWU=',
    color: '#7c3aed'
  },
  {
    id: 'zenith-hub',
    title: 'Custom Web Application',
    category: 'Data Dashboard',
    video: 'https://media.istockphoto.com/id/1556389414/video/man-using-a-laptop-double-exposure-with-business-data-analytics-dashboard.mp4?b=1&s=192_srp&k=20&c=DNHcz4jNvTxFtECZHTFm3mealV8k_-AZws0ot2DI5oM=',
    color: '#3b82f6'
  },
  {
    id: 'prism-ui',
    title: 'UI Implementation',
    category: 'Design System',
    video: 'https://media.istockphoto.com/id/1315411378/video/businessman-with-web-design-hologram-concept.mp4?b=1&s=192_srp&k=20&c=ZATSTEqjMgfAX9Fb5GKxdRSK4AhoHNkoBLAHqo7_0MY=',
    color: '#2563eb'
  }
];

function PanelVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force load and play immediately
    video.load();
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for strict browsers: play on first user scroll/click
        const autoPlayFallback = () => {
          video.play().catch(e => console.log(e));
          window.removeEventListener('click', autoPlayFallback);
          window.removeEventListener('scroll', autoPlayFallback);
        };
        window.addEventListener('click', autoPlayFallback);
        window.addEventListener('scroll', autoPlayFallback);
      });
    }
  }, [src]);

  return (
    <div className="absolute inset-0 w-full h-full panel-video z-0 bg-slate-950">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        style={{ opacity: 1 }} // Removed transition opacity state to ensure it is ALWAYS visible
      />
    </div>
  );
}

export default function CinematicPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop sticky overlay animation
      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray('.portfolio-panel') as HTMLElement[];
        
        panels.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });

          const video = el.querySelector('.panel-video');
          const text = el.querySelector('.panel-text');

          if (video) {
            gsap.fromTo(video, 
              { scale: 1.1 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "top top",
                  scrub: true,
                }
              }
            );
          }

          if (text) {
            gsap.fromTo(text,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: el,
                  start: "top center",
                  end: "top top",
                  scrub: true,
                }
              }
            );

            // Fade out the text as the next section starts entering the viewport
            gsap.to(text, {
              opacity: 0,
              y: -50,
              scrollTrigger: {
                trigger: el,
                start: "top top",
                end: "bottom top",
                scrub: true,
              }
            });
          }
        });
      });

      // Mobile standard scroll animation
      mm.add("(max-width: 1023px)", () => {
        const panels = document.querySelectorAll('.portfolio-panel');
        
        panels.forEach((el) => {
          const text = el.querySelector('.panel-text');
          if (text) {
            gsap.fromTo(text,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                scrollTrigger: {
                  trigger: el,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                }
              }
            );
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-slate-950 w-full overflow-hidden">
      {projects.map((project, i) => (
        <div 
          key={i} 
          className="portfolio-panel h-screen w-full flex items-center justify-center overflow-hidden relative"
          // Crucial CSS update: layers stack properly on top of each other
          style={{ 
            zIndex: i + 1,
            position: 'relative'
          }}
        >
          {/* Background Video */}
          <PanelVideo src={project.video} />
          
          {/* Overlays (Adjusted opacity so video is perfectly clear) */}
          <div className="absolute inset-0 bg-slate-950/40 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10 pointer-events-none" />
          
          {/* Content */}
          <div className="panel-text relative z-20 text-center px-6 max-w-6xl w-full">
            <span 
              className="font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] lg:tracking-[0.6em] text-[8px] md:text-[10px] lg:text-xs mb-6 md:mb-8 block"
              style={{ color: project.color }}
            >
              Case Study 0{i + 1} / {project.category}
            </span>
            
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-black text-white leading-[0.95] lg:leading-none uppercase tracking-tighter mb-8 md:mb-12 lg:mb-16">
              {project.title}
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-12">
              <Link 
                href={`/portfolio/${project.id}`} 
                className="px-8 sm:px-10 md:px-12 py-4 md:py-5 bg-white text-slate-900 font-black uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:scale-105 lg:hover:scale-110 active:scale-95 transition-transform shadow-xl lg:shadow-2xl"
              >
                Explore Strategy
              </Link>
              
              <div className="h-px w-16 md:w-24 bg-white/20 hidden md:block" />
              
              <p className="text-white/60 font-medium tracking-wide text-xs md:text-sm max-w-[260px] sm:max-w-xs text-center md:text-left leading-relaxed italic">
                Showcasing expert craftsmanship and impactful digital solutions.
              </p>
            </div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-[15vw] lg:text-[10vw] font-black text-white/5 select-none leading-none pointer-events-none z-10">
            {project.title.split(' ')[0]}
          </div>
        </div>
      ))}
    </section>
  );
}