import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user?.id)
    .maybeSingle()

  if (!project) {
    notFound()
  }

  const { data: units } = await supabase
    .from('units')
    .select('*')
    .eq('project_id', params.id)

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('project_id', params.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{project.name}</h1>
            <p className="text-muted-foreground mt-1">
              {project.description || 'No description provided'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <span className={`px-2 py-1 rounded-full text-sm ${
              project.status === 'active'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-gray-500/10 text-gray-500'
            }`}>
              {project.status}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${project.budget ? project.budget.toLocaleString() : '0'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Units</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{units?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Latest project activities</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
