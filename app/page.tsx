import Link from 'next/link';
import { Building2, Users, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Professional Project Management for <span className="text-[hsl(var(--brand-primary))]">Affordable Housing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Streamline your affordable housing development projects with Regtime's comprehensive management platform. Track properties, manage compliance, and collaborate with your team.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-[hsl(var(--primary))] text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition"
              >
                Get Started
              </Link>
              <Link
                href="/dashboard"
                className="bg-background border border-border px-8 py-3 rounded-lg font-medium hover:bg-muted transition"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Regtime?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <Building2 className="h-12 w-12 text-[hsl(var(--primary))] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Property Management</h3>
                <p className="text-muted-foreground">
                  Track NYC properties with BBL lookup, manage units, and monitor compliance requirements seamlessly.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <Users className="h-12 w-12 text-[hsl(var(--secondary))] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Coordinate with architects, engineers, contractors, and attorneys all in one platform.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <TrendingUp className="h-12 w-12 text-[hsl(var(--accent))] mb-4" />
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor milestones, track time entries, and ensure projects stay on schedule and budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
