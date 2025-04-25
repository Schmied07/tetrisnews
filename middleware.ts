import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Vérifier si la route nécessite une authentification
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Vérifier si l'utilisateur est admin
    const { data: adminRole } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'admin')
      .single();

    if (adminRole) {
      const { data: userRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('role_id', adminRole.id)
        .single();

      if (!userRole) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}; 