import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function getProjectData(projectId: string) {
  try {
    const [projectRes, unitsRes, tasksRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?id=eq.${projectId}&select=*`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/units?project_id=eq.${projectId}&select=*`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/tasks?project_id=eq.${projectId}&select=*&order=created_at.desc&limit=5`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })
    ]);

    const projects = await projectRes.json();
    const project = projects && projects.length > 0 ? projects[0] : null;
    const units = await unitsRes.json();
    const tasks = await tasksRes.json();

    return { project, units, tasks };
  } catch (error) {
    return { project: null, units: [], tasks: [] };
  }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { project, units, tasks } = await getProjectData(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects" className="p-2 hover:bg-gray-100 rounded-lg transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <p className="text-muted-foreground mt-1">
              {project.description || 'No description provided'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted transition">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-3">Status</div>
          <span className={`px-2 py-1 rounded-full text-sm ${
            project.status === 'active'
              ? 'bg-green-500/10 text-green-500'
              : 'bg-gray-500/10 text-gray-500'
          }`}>
            {project.status}
          </span>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-3">Budget</div>
          <div className="text-2xl font-bold">
            ${project.budget ? project.budget.toLocaleString() : '0'}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="text-sm font-medium text-muted-foreground mb-3">Units</div>
          <div className="text-2xl font-bold">{units?.length || 0}</div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Project Information</h2>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Type</div>
              <div className="text-foreground">{project.project_type || 'Not specified'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">Created</div>
              <div className="text-foreground">
                {new Date(project.created_at).toLocaleDateString()}
              </div>
            </div>
            {project.start_date && (
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Start Date</div>
                <div className="text-foreground">
                  {new Date(project.start_date).toLocaleDateString()}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-2">Recent Tasks</h2>
          <p className="text-sm text-muted-foreground mb-4">Latest project activities</p>
          {tasks && tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task: any) => (
                <div key={task.id} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{task.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.status === 'completed'
                      ? 'bg-green-500/10 text-green-500'
                      : 'bg-yellow-500/10 text-yellow-500'
                  }`}>
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No tasks yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
