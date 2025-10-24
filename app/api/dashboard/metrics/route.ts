import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [projectsRes, timeEntriesRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/projects?select=id,status`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      }),
      fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/time_entries?select=hours`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      })
    ]);

    const projects = projectsRes.ok ? await projectsRes.json() : [];
    const timeEntries = timeEntriesRes.ok ? await timeEntriesRes.json() : [];

    const totalProjects = projects.length;
    const activeProjects = projects.filter((p: any) => p.status === 'active').length;
    const totalHours = timeEntries.reduce((sum: number, entry: any) => sum + (entry.hours || 0), 0);

    return NextResponse.json({
      totalProjects,
      activeProjects,
      totalHours,
      properties: 0,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
