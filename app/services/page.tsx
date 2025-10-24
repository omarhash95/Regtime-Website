import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const services = [
  {
    name: 'Regtime Builder',
    description: 'Model incentives and lower costs. Faster.',
    image: '/Regtime Builder White 1080px.png',
    features: [
      'Incentive modeling',
      'Workflow templates',
      'Subcontractor coordination',
      'Progress reporting',
    ],
    cta: 'Talk to Sales',
    href: '/contact'
  },
  {
    name: 'Regtime Marketer',
    description: 'Grow demand and prove ROI.',
    image: '/Regtime Marketer White 1080px.png',
    features: [
      'Campaign tracking',
      'ROI analytics',
      'Client billing',
      'Performance metrics',
    ],
    cta: 'Talk to Sales',
    href: '/contact'
  },
  {
    name: 'Regtime Manager',
    description: 'Coordinate teams and ship on time.',
    image: '/Regtime Manager White 1080px.png',
    features: [
      'Advanced time tracking',
      'Project management',
      'Team collaboration',
      'Custom reporting',
    ],
    cta: 'Talk to Sales',
    href: '/contact'
  }
];

const additionalServices = [
  {
    name: 'Enterprise Implementation',
    description: 'Full-service setup and customization for large organizations',
    features: ['Custom integrations', 'Data migration', 'Training programs', 'Dedicated support']
  },
  {
    name: 'Consulting Services',
    description: 'Expert guidance on productivity optimization and process design',
    features: ['Process audits', 'KPI dashboards', 'Change management', 'Playbooks']
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">Integrated Suite of Products</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
            Choose the product that fits today and grow into the rest — all designed to work together.
          </p>

          <section className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div key={s.name} className="p-6 ring-1 ring-border rounded-2xl bg-card shadow-sm">
                <div className="flex items-center gap-3">
                  <img src={s.image} alt={`${s.name} logo`} className="h-14 w-auto" />
                  <h3 className="text-xl font-semibold text-foreground">{s.name}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-[2px] h-4 w-4 text-[hsl(var(--primary))]" />
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href={s.href}
                    className="inline-flex items-center rounded-xl px-4 py-2 ring-1 ring-border hover:bg-muted transition-colors"
                  >
                    {s.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-foreground">Professional Services</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {additionalServices.map((svc) => (
                <div key={svc.name} className="rounded-2xl ring-1 ring-border p-6 bg-card shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground">{svc.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{svc.description}</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="mt-[2px] h-4 w-4 text-[hsl(var(--primary))]" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
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
