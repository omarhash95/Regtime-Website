import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
  const supabase = await createClient()

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const body = await request.json()

  const { data: project, error } = await supabase
    .from('projects')
    .insert({
      ...body,
      user_id: '00000000-0000-0000-0000-000000000000',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(project, { status: 201 })
}
