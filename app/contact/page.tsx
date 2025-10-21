'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Contact Sales
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Tell us about your portfolio, programs, and timelines. We'll follow up shortly.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              {submitted ? (
                <div className="rounded-lg bg-[hsl(var(--primary))] bg-opacity-10 p-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground">Thank you!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We'll be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-2 block w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--primary))]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Get in Touch</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Have questions? Reach out to our team directly.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <span className="text-sm text-foreground">hello@regtime.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <span className="text-sm text-foreground">212-343-1111</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <span className="text-sm text-foreground">109 E 9th St, New York, NY 10003</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
