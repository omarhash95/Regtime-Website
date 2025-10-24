'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/services' },
  { name: 'Contact', href: '/contact' },
  { name: 'Dashboard', href: '/dashboard' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-background sticky top-0 z-40 border-b border-[hsl(var(--border))]/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" aria-label="Regtime home" className="-m-1.5 p-1.5">
            <div className="flex items-center gap-2">
              <img
                src="/IconMark Night 540px.png"
                alt="Regtime icon"
                className="h-7 w-auto dark:hidden"
              />
              <img
                src="/IconMark White 540px.png"
                alt="Regtime icon"
                className="h-7 w-auto hidden dark:block"
              />
              <img
                src="/Wordmark Night 1080px.png"
                alt="Regtime"
                className="h-8 w-auto md:h-10 md:w-auto dark:hidden"
              />
              <img
                src="/Wordmark White 1080px.png"
                alt="Regtime"
                className="h-8 w-auto md:h-10 md:w-auto hidden dark:block"
              />
            </div>
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-foreground hover:text-brand-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex lg:flex-1 items-center justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-foreground lg:hidden ring-1 ring-[hsl(var(--border))]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open main menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-background shadow-xl ring-1 ring-[hsl(var(--border))] focus:outline-none">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[hsl(var(--border))]">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileOpen(false)} aria-label="Regtime home">
                <div className="flex items-center gap-2">
                  <img src="/IconMark Night 540px.png" alt="Regtime icon" className="h-6 w-auto dark:hidden" />
                  <img src="/IconMark White 540px.png" alt="Regtime icon" className="h-6 w-auto hidden dark:block" />
                  <img src="/Wordmark Night 1080px.png" alt="Regtime" className="h-7 w-auto dark:hidden" />
                  <img src="/Wordmark White 1080px.png" alt="Regtime" className="h-7 w-auto hidden dark:block" />
                </div>
              </Link>
              <button
                type="button"
                className="rounded-md p-2.5 text-foreground ring-1 ring-[hsl(var(--border))]"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1 px-4 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-[hsl(var(--muted))]"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
