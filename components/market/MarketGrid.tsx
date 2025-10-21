'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Zap, Code, Database } from 'lucide-react';
import MarketCard from './MarketCard';

interface MarketItem {
  id: string;
  title: string;
  description: string;
  category: 'ai-agent' | 'automation' | 'analytics' | 'integration';
  trend: 'up' | 'down' | 'stable';
  metrics: {
    users: number;
    growth: number;
    rating: number;
  };
  image?: string;
  tags: string[];
  featured?: boolean;
}

const mockMarketData: MarketItem[] = [
  {
    id: '1',
    title: 'Smart Time Tracker',
    description: 'AI-powered time tracking that learns your patterns and automatically categorizes work.',
    category: 'ai-agent',
    trend: 'up',
    metrics: { users: 12500, growth: 23, rating: 4.8 },
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    tags: ['AI', 'Automation', 'Productivity'],
    featured: true
  },
  {
    id: '2',
    title: 'Workflow Optimizer',
    description: 'Analyze team workflows and suggest optimizations for maximum efficiency.',
    category: 'analytics',
    trend: 'up',
    metrics: { users: 8900, growth: 18, rating: 4.6 },
    tags: ['Analytics', 'Optimization', 'Teams'],
    featured: true
  },
  {
    id: '3',
    title: 'Project Predictor',
    description: 'Machine learning model that predicts project completion times with 95% accuracy.',
    category: 'ai-agent',
    trend: 'stable',
    metrics: { users: 5600, growth: 5, rating: 4.7 },
    tags: ['ML', 'Prediction', 'Planning']
  },
  {
    id: '4',
    title: 'Slack Integration Pro',
    description: 'Advanced Slack integration with custom commands and automated reporting.',
    category: 'integration',
    trend: 'up',
    metrics: { users: 15200, growth: 31, rating: 4.9 },
    tags: ['Slack', 'Integration', 'Reporting']
  },
  {
    id: '5',
    title: 'Auto Timesheet',
    description: 'Automatically generate timesheets from calendar events and app usage.',
    category: 'automation',
    trend: 'down',
    metrics: { users: 3400, growth: -8, rating: 4.2 },
    tags: ['Automation', 'Calendar', 'Timesheets']
  },
  {
    id: '6',
    title: 'Team Dashboard',
    description: 'Real-time team performance dashboard with customizable widgets.',
    category: 'analytics',
    trend: 'up',
    metrics: { users: 7800, growth: 15, rating: 4.5 },
    tags: ['Dashboard', 'Real-time', 'Teams']
  }
];

const categories = [
  { id: 'all', label: 'All', icon: Zap },
  { id: 'ai-agent', label: 'AI Agents', icon: Code },
  { id: 'automation', label: 'Automation', icon: Zap },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'integration', label: 'Integrations', icon: Database }
];

const sortOptions = [
  { id: 'trending', label: 'Trending' },
  { id: 'users', label: 'Most Users' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest' }
];

interface MarketGridProps {
  className?: string;
}

export default function MarketGrid({ className = '' }: MarketGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null);

  const filteredItems = useMemo(() => {
    let items = mockMarketData;

    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    items = [...items].sort((a, b) => {
      switch (sortBy) {
        case 'users':
          return b.metrics.users - a.metrics.users;
        case 'rating':
          return b.metrics.rating - a.metrics.rating;
        case 'newest':
          return a.id.localeCompare(b.id);
        case 'trending':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.metrics.growth - a.metrics.growth;
      }
    });

    return items;
  }, [searchQuery, selectedCategory, sortBy]);

  const getTrendIcon = (trend: MarketItem['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />;
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Productivity Marketplace
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover AI agents, automations, and integrations to supercharge your workflow.
          Built by the community, for the community.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search marketplace..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <category.icon className="h-4 w-4" />
              {category.label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {selectedCategory !== 'all' && categories.find(c => c.id === selectedCategory)?.label}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MarketCard
            key={item.id}
            item={item}
            onPeek={() => setSelectedItem(item)}
            trendIcon={getTrendIcon(item.trend)}
          />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-[hsl(var(--primary))] text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}

      {selectedItem && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSelectedItem(null)}
          />

          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {selectedItem.title}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {selectedItem.image && (
                <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <p className="text-muted-foreground mb-6">
                {selectedItem.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(var(--primary))]">
                        {selectedItem.metrics.users.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(var(--primary))]">
                        {selectedItem.metrics.growth > 0 ? '+' : ''}{selectedItem.metrics.growth}%
                      </div>
                      <div className="text-xs text-muted-foreground">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[hsl(var(--primary))]">
                        {selectedItem.metrics.rating}
                      </div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full bg-[hsl(var(--primary))] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-colors">
                  Install
                </button>
                <button className="w-full border border-border py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
