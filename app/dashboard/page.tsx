import { FolderKanban, Building2, Clock, CheckCircle2 } from 'lucide-react';

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?select=*&order=created_at.desc&limit=5`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return { projectsCount: 0, activeProjectsCount: 0, recentProjects: [] };
    }

    const projects = await response.json();
    const activeProjects = projects.filter((p: any) => p.status === 'active');

    return {
      projectsCount: projects.length,
      activeProjectsCount: activeProjects.length,
      recentProjects: projects.slice(0, 5)
    };
  } catch (error) {
    return { projectsCount: 0, activeProjectsCount: 0, recentProjects: [] };
  }
}

export default async function DashboardPage() {
  const { projectsCount, activeProjectsCount, recentProjects } = await getStats();

  const stats = [
    {
      title: 'Total Projects',
      value: projectsCount || 0,
      icon: FolderKanban,
      color: 'text-blue-500'
    },
    {
      title: 'Active Projects',
      value: activeProjectsCount || 0,
      icon: CheckCircle2,
      color: 'text-green-500'
    },
    {
      title: 'Properties',
      value: 0,
      icon: Building2,
      color: 'text-purple-500'
    },
    {
      title: 'Hours Tracked',
      value: 0,
      icon: Clock,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your projects.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </div>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
        {recentProjects && recentProjects.length > 0 ? (
          <div className="space-y-4">
            {recentProjects.map((project: any) => (
              <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description || 'No description'}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <FolderKanban className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No projects yet. Create your first project to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
