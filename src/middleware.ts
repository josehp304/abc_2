import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple admin credentials (in a real app, use environment variables)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'abc123studio';

export function middleware(request: NextRequest) {
  // Only protect the admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check if user is authenticated
    const authCookie = request.cookies.get('admin_authenticated');
    
    if (!authCookie || authCookie.value !== 'true') {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/login', request.url);
      // Add the original URL as a parameter to redirect after login
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 