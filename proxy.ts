import { NextRequest, NextResponse } from 'next/server';

export async function proxy(_request: NextRequest) {
  // Simple pass-through - auth handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
