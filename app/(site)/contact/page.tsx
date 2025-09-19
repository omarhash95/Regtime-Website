import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HubSpotEmbed from '@/components/HubSpotEmbed';

export default function ContactPage() {
  return (
    <div className="bg-background">
      <Header />
      <main className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Contact Sales
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Tell us about your portfolio, programs, and timelines. We'll follow up shortly.
          </p>

          <HubSpotEmbed className="mt-8" showSkeleton={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
}