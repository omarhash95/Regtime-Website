import { Target, Award, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const values = [
  {
    name: 'Innovation',
    description: 'We continuously push the boundaries of what\'s possible in affordable housing project management.',
    icon: Target,
  },
  {
    name: 'Reliability',
    description: 'Our platform provides consistent, dependable service that development teams can count on.',
    icon: Award,
  },
  {
    name: 'Community Impact',
    description: 'We\'re building solutions that help create affordable housing in NYC and beyond.',
    icon: Globe,
  },
];

const team = [
  { name: 'Yuri Geylik', role: 'CEO & Founder' },
  { name: 'Kirill Boyarkin', role: 'CTO' },
  { name: 'Omar Hashmi', role: 'Head of Revenue Operations' },
  { name: 'Anna Martynova', role: 'Director of Incentives' },
  { name: 'Max Isakov', role: 'Director of Product' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">About Regtime</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            We're building a professional project management platform that helps affordable housing development teams work smarter with intuitive tools and comprehensive tracking.
          </p>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Leadership</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((person) => (
                <div key={person.name} className="p-6 ring-1 ring-border bg-card rounded-2xl shadow-sm">
                  <div className="h-32 bg-muted rounded-xl flex items-center justify-center text-sm text-muted-foreground">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-foreground">{person.name}</h3>
                    <p className="text-sm text-[hsl(var(--primary))]">{person.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Our Values</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {values.map((v) => (
                <div key={v.name} className="rounded-2xl ring-1 ring-border p-6 bg-card shadow-sm">
                  <v.icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{v.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
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
