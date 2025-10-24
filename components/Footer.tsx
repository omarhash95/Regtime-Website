import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

const navigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path
            fillRule="evenodd"
            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.38-2.277-1.382 0-1.594 1.08-1.594 2.197v4.258H8.026V7.5h2.559v1.205h.036c.356-.674 1.227-1.386 2.525-1.386 2.7 0 3.197 1.777 3.197 4.088v4.931zM5.337 6.295a1.53 1.53 0 110-3.06 1.53 1.53 0 010 3.06zM6.68 16.338H3.994V7.5H6.68v8.838zM17.668 1H2.332C1.598 1 1 1.581 1 2.298v15.404C1 18.419 1.598 19 2.332 19h15.336C18.402 19 19 18.419 19 17.702V2.298C19 1.581 18.402 1 17.668 1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.638 0-.177 0-.355-.012-.53A8.36 8.36 0 0020 3.548a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.806-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.744 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.482A4.073 4.073 0 01.8 6.803v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.833 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--brand-night))] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <img
                src="/Wordmark White 1080px.png"
                alt="Regtime"
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm text-white max-w-sm">
              Professional project management platform for affordable housing development in NYC.
            </p>
          </div>

          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold leading-6 text-white">Navigation</h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-white hover:text-white/80 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold leading-6 text-white">Follow</h3>
            <ul role="list" className="mt-6 flex gap-4">
              {navigation.social.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white hover:text-white/80 transition-colors" aria-label={item.name}>
                    <item.icon className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold leading-6 text-white">Contact Info</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white" />
                <span className="text-sm text-white">hello@regtime.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white" />
                <span className="text-sm text-white">212-343-1111</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-white" />
                <span className="text-sm text-white">109 E 9th St, New York, NY 10003</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-white text-center">
            &copy; {new Date().getFullYear()} Regtime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
