import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    // Check for auth cookie or header
    const accessToken = request.cookies.get('sb-access-token')?.value;
    
    // Allow build to proceed without supabase config
    if (!supabase) {
      return NextResponse.next();
    }

    if (!accessToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/auth/signin';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};