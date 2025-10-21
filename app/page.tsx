import Link from 'next/link';
import { Building2, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-brand-primary">Regtime</div>
          <nav className="flex gap-6">
            <Link href="/about" className="text-sm hover:text-brand-primary">About</Link>
            <Link href="/services" className="text-sm hover:text-brand-primary">Services</Link>
            <Link href="/contact" className="text-sm hover:text-brand-primary">Contact</Link>
            <Link href="/login" className="text-sm font-medium text-brand-primary hover:text-brand-primary/80">Login</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Professional Project Management for <span className="text-brand-primary">Affordable Housing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Streamline your affordable housing development projects with Regtime's comprehensive management platform. Track properties, manage compliance, and collaborate with your team.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-brand-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-primary/90 transition"
              >
                Get Started
              </Link>
              <Link
                href="/dashboard"
                className="bg-white border border-border px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Regtime?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-border">
                <Building2 className="h-12 w-12 text-brand-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Property Management</h3>
                <p className="text-muted-foreground">
                  Track NYC properties with BBL lookup, manage units, and monitor compliance requirements seamlessly.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <Users className="h-12 w-12 text-brand-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground">
                  Coordinate with architects, engineers, contractors, and attorneys all in one platform.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-border">
                <TrendingUp className="h-12 w-12 text-brand-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Monitor milestones, track time entries, and ensure projects stay on schedule and budget.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-night text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Regtime. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
