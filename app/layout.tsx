import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regtime - Affordable Housing Project Management',
  description: 'Professional project management platform for affordable housing development in NYC',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
