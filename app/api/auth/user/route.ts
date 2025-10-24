import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    user: {
      id: '00000000-0000-0000-0000-000000000000',
      email: 'guest@regtime.com',
      name: 'Guest User'
    }
  })
}
