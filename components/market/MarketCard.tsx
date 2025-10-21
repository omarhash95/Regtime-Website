'use client';

import { ReactNode } from 'react';
import { Star, Users, ExternalLink } from 'lucide-react';

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

interface MarketCardProps {
  item: MarketItem;
  onPeek: () => void;
  trendIcon: ReactNode;
  className?: string;
}

export default function MarketCard({
  item,
  onPeek,
  trendIcon,
  className = ''
}: MarketCardProps) {
  const categoryColors = {
    'ai-agent': 'bg-blue-100 text-blue-800 border-blue-200',
    'automation': 'bg-green-100 text-green-800 border-green-200',
    'analytics': 'bg-purple-100 text-purple-800 border-purple-200',
    'integration': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  return (
    <div className={`group relative overflow-hidden bg-white border border-border rounded-lg hover:border-[hsl(var(--primary))] transition-all ${className}`}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                {item.title}
              </h3>
              {item.featured && (
                <span className="px-2 py-0.5 bg-[hsl(var(--primary))] text-white text-xs rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${categoryColors[item.category]}`}>
                {item.category.replace('-', ' ')}
              </span>
              {trendIcon}
            </div>
          </div>
        </div>

        {item.image && (
          <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{item.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{item.metrics.users.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            <span>{item.metrics.rating}</span>
          </div>
          <div className={`text-sm font-medium ${
            item.metrics.growth > 0 ? 'text-green-600' :
            item.metrics.growth < 0 ? 'text-red-600' :
            'text-gray-600'
          }`}>
            {item.metrics.growth > 0 ? '+' : ''}{item.metrics.growth}%
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onPeek}
            className="flex-1 bg-[hsl(var(--primary))] text-white py-2 px-4 rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
          >
            View Details
          </button>
          <button
            className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
            onClick={() => window.open('#', '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
