import Link from 'next/link';
import { Plus, FolderKanban } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getProjects() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?select=*&order=created_at.desc`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      return [];
    }

    return await response.json();
  } catch (error) {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your affordable housing projects
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center px-4 py-2 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <div className="bg-white p-6 rounded-lg border border-border hover:border-[hsl(var(--primary))] transition-colors cursor-pointer h-full">
                <div className="flex items-center gap-2 mb-2">
                  <FolderKanban className="h-5 w-5" />
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description || 'No description provided'}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full ${
                    project.status === 'active'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-gray-500/10 text-gray-500'
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex flex-col items-center justify-center py-16">
            <FolderKanban className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Get started by creating your first affordable housing project
            </p>
            <Link
              href="/dashboard/projects/new"
              className="inline-flex items-center px-4 py-2 bg-[hsl(var(--primary))] text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
