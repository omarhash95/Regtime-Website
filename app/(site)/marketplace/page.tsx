// TODO: repurpose to /resources
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarketGrid from '@/components/market/MarketGrid';

export default function Marketplace() {
  return (
    <div className="bg-background">
      <Header />
      
      {/* Hero section */}
      <div className="bg-gradient-to-b from-brand-primary/10 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Productivity <span className="text-brand-primary">Marketplace</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover AI agents, automations, and integrations built by our community. 
            Extend Regtime with powerful tools designed to supercharge your workflow.
          </p>
        </div>
      </div>

      {/* Market Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <MarketGrid />
        </div>
      </div>

      <Footer />
    </div>
  );
}