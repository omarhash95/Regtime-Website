import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import RouteTransition from '@/components/ux/RouteTransition';
import { ToastProvider } from '@/components/toast/ToastProvider';

const aspekta = localFont({
  src: [
    {
      path: '../public/fonts/Aspekta-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Aspekta-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aspekta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Regtime - Professional Time Management Solutions',
  description: 'Transform your business with Regtime\'s comprehensive time management platform. Streamline operations, boost productivity, and drive growth.',
  keywords: 'time management, business productivity, project management, team collaboration',
  authors: [{ name: 'Regtime' }],
  creator: 'Regtime',
  publisher: 'Regtime',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://regtime.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Regtime - Professional Time Management Solutions',
    description: 'Transform your business with Regtime\'s comprehensive time management platform.',
    url: 'https://regtime.com',
    siteName: 'Regtime',
    images: [
      {
        url: '/IconMark Alice Blue 540px.png',
        width: 540,
        height: 540,
        alt: 'Regtime Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regtime - Professional Time Management Solutions',
    description: 'Transform your business with Regtime\'s comprehensive time management platform.',
    images: ['/IconMark Alice Blue 540px.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  themeColor: '#0b0b0b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/IconMark Alice Blue 540px.png" type="image/png" />
        <link rel="apple-touch-icon" href="/IconMark Alice Blue 540px.png" />
      </head>
      <body className={`${aspekta.variable} font-aspekta antialiased`}>
        <ToastProvider>
          <SmoothScrollProvider>
            <RouteTransition>
              {children}
            </RouteTransition>
          </SmoothScrollProvider>
        </ToastProvider>
        
        {/* Google Analytics 4 */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        
        {/* HubSpot Tracking */}
        {process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID && (
          <Script
            id="hubspot-tracking"
            strategy="afterInteractive"
            src={`//js.hs-scripts.com/${process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}.js`}
          />
        )}
      </body>
    </html>
  );
}