import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json(project)
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const { data: project, error } = await supabase
    .from('projects')
    .update(body)
    .eq('id', params.id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(project)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
