import Link from 'next/link';
import { Home, FolderKanban, Building2, Calculator, Upload, HelpCircle } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Properties', href: '/dashboard/properties', icon: Building2 },
    { name: 'Calculator', href: '/dashboard/calculator', icon: Calculator },
    { name: 'Import/Export', href: '/dashboard/import-export', icon: Upload },
    { name: 'Help', href: '/dashboard/help', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-border">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-brand-primary">
            Regtime
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Dashboard</span>
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r border-border min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
              >
                <item.icon className="h-5 w-5 text-muted-foreground" />
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
