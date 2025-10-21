import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-muted-foreground">
          <p className="text-base font-semibold leading-7 text-[hsl(var(--primary))]">Legal</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-6 text-xl leading-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="mt-10 max-w-2xl">
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Information We Collect</h2>
            <p className="mt-6">
              We collect information you provide directly to us when you create an account or use our services.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">How We Use Your Information</h2>
            <p className="mt-6">
              We use the information we collect to provide, maintain, and improve our services.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Data Security</h2>
            <p className="mt-6">
              We implement appropriate technical and organizational measures to protect your personal information.
            </p>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-foreground">Contact Us</h2>
            <p className="mt-6">
              If you have questions about this Privacy Policy, contact us at privacy@regtime.com
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
