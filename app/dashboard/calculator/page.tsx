import { Calculator } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function CalculatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">FAR Calculator</h1>
        <p className="text-muted-foreground mt-1">
          Calculate Floor Area Ratio for your development projects
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-border">
        <div className="py-16 text-center">
          <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">
            FAR Calculator functionality will be available soon
          </p>
        </div>
      </div>
    </div>
  );
}
