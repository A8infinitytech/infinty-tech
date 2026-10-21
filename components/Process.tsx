"use client";
import { Section } from '@/components/Section';

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We dive deep into your business goals, challenges, and target audience to define a clear strategy.',
  },
  {
    number: '02',
    title: 'Strategy & Planning',
    description: 'We create a detailed roadmap, outlining every stage of the development process and project milestones.',
  },
  {
    number: '03',
    title: 'Design & Prototype',
    description: 'Our designers craft high-fidelity prototypes to visualize the user experience and interface.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Our engineers build your solution using modern technologies and best practices.',
  },
];

export default function Process() {
  return (
    <Section id="process">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Process</h2>
        <p className="text-secondaryText max-w-2xl mx-auto">
          A streamlined, transparent approach to bringing your vision to life.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="relative group">
            <div className="mb-6">
              <span className="text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                {step.number}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-secondaryText">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-8 -right-4 w-8 h-px bg-white/10" />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
