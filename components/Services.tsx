"use client";
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { Cpu, Globe, Layout, Cloud, Shield, Zap } from 'lucide-react';

const services = [
  {
    title: 'AI Automation',
    description: 'Custom AI agents and workflows to automate repetitive tasks and boost productivity.',
    icon: <Cpu />,
  },
  {
    title: 'Custom Software',
    description: 'Tailored web and mobile applications built with the latest technologies for scale.',
    icon: <Globe />,
  },
  {
    title: 'UI/UX Design',
    description: 'User-centric designs that are visually stunning and highly functional.',
    icon: <Layout />,
  },
  {
    title: 'Cloud Solutions',
    description: 'Secure and scalable cloud infrastructure to power your digital ecosystem.',
    icon: <Cloud />,
  },
  {
    title: 'Cybersecurity',
    description: 'Robust security measures to protect your data and ensure business continuity.',
    icon: <Shield />,
  },
  {
    title: 'Digital Strategy',
    description: 'Expert consulting to help you navigate the complex digital landscape.',
    icon: <Zap />,
  },
];

export default function Services() {
  return (
    <Section id="services">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
        <p className="text-secondaryText max-w-2xl mx-auto">
          We provide a comprehensive suite of digital services designed to help your business thrive in the modern age.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </Section>
  );
}
