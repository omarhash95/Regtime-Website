import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const [
    { count: totalProjects },
    { count: activeProjects },
    { data: timeEntries }
  ] = await Promise.all([
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true }),
    supabase
      .from('projects')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active'),
    supabase
      .from('time_entries')
      .select('hours')
  ])

  const totalHours = timeEntries?.reduce((sum, entry) => sum + (entry.hours || 0), 0) || 0

  return NextResponse.json({
    totalProjects: totalProjects || 0,
    activeProjects: activeProjects || 0,
    totalHours: totalHours,
    properties: 0,
  })
}
