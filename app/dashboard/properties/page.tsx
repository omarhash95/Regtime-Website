'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function PropertiesPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Property Search</h1>
        <p className="text-muted-foreground mt-1">
          Search NYC properties by BBL, address, or owner
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">Search Properties</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter BBL, address, or owner name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
          />
          <button className="inline-flex items-center px-4 py-2 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg hover:opacity-90 transition">
            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Search for NYC properties using Borough-Block-Lot (BBL) numbers or property details
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-border">
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            Enter a search query to find properties
          </p>
        </div>
      </div>
    </div>
  );
}
