import Image from 'next/image';
import { Users, Target, Award, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/ui/Reveal';
import TiltCard from '@/components/ui/TiltCard';

const values = [
  {
    name: 'Innovation',
    description: 'We continuously push the boundaries of what\'s possible in time management technology.',
    icon: Target,
  },
  {
    name: 'Reliability',
    description: 'Our platform provides consistent, dependable service that businesses can count on.',
    icon: Award,
  },
  {
    name: 'Global Impact',
    description: 'We\'re building solutions that help teams around the world work smarter.',
    icon: Globe,
  },
];

const team = [
  { name: 'Yuri Geylik', role: 'CEO & Founder', image: '', bio: '' },
  { name: 'Kirill Boyarkin', role: 'CTO', image: '', bio: '' },
  { name: 'Omar Hashmi', role: 'Head of Revenue Operations', image: '', bio: '' },
  { name: 'Anna Martynova', role: 'Director of Incentives', image: '', bio: '' },
  { name: 'Max Isakov', role: 'Director of Product', image: '', bio: '' },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      <Header />
      <main className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">About Regtime</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
              We're building a premium, on-brand suite that helps teams work smarter with polished visuals and motion.
            </p>
          </Reveal>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Leadership</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((person) => (
                <TiltCard key={person.name} className="p-6 ring-1 ring-[hsl(var(--border))] bg-[hsl(var(--card))] rounded-2xl">
                  <div className="h-32 bg-[hsl(var(--muted))] rounded-xl flex items-center justify-center text-sm text-[hsl(var(--muted-foreground))]">
                    Photo coming soon
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                    <p className="text-sm text-brand-primary">{person.role}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Our Values</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {values.map((v) => (
                <div key={v.name} className="rounded-2xl ring-1 ring-[hsl(var(--border))] p-6 bg-[hsl(var(--card))]">
                  <v.icon className="h-6 w-6 text-brand-primary" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{v.name}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}