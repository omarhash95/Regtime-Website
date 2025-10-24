import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/properties?or=(bbl.ilike.*${query}*,address.ilike.*${query}*,owner_name.ilike.*${query}*)&limit=20`,
      {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 })
    }

    const properties = await response.json()
    return NextResponse.json(properties)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
