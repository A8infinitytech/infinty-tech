"use client";
import CinematicHero from '@/components/sections/CinematicHero';
import HorizontalServices from '@/components/sections/HorizontalServices';
import CinematicPortfolio from '@/components/sections/CinematicPortfolio';
import PinnedShowcase from '@/components/sections/PinnedShowcase';
import WhyChoose from '@/components/sections/WhyChoose';
import AnimatedPricing from '@/components/sections/AnimatedPricing';
import FAQ from '@/components/sections/FAQ';
import ImmersiveContact from '@/components/sections/ImmersiveContact';
import SmoothScroll from '@/components/animations/SmoothScroll';
import TrustBar from '@/components/sections/TrustBar';
import ProjectVideo from '@/components/sections/ProjectVideo';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div className="relative bg-white overflow-x-hidden">
      <CinematicHero />
      <TrustBar />
      <HorizontalServices />
      <CinematicPortfolio />
      <ProjectVideo />
      <PinnedShowcase />
      <WhyChoose />
      <AnimatedPricing />
      <FAQ />
      <ImmersiveContact />
    </div>
  );
}
