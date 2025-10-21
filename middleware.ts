import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  // Simple pass-through middleware
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
