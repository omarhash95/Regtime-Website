'use client';

import { Bell, Search, User } from 'lucide-react';

interface DashboardHeaderProps {
  user?: {
    name?: string;
    email?: string;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search projects, properties..."
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-muted rounded-lg transition">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-foreground">{user?.name || 'User'}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
