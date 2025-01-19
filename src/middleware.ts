import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { cookieNames } from '@/lib/cookies';

// Rutas que no requieren autenticación
const publicPaths = ['/authentication', '/api/auth/login', '/images'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Ignorar rutas públicas
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Verificar tokens
    const accessToken = request.cookies.get(cookieNames.accessToken);
    const refreshToken = request.cookies.get(cookieNames.refreshToken);

    if (!accessToken || !refreshToken) {
        const url = new URL('/authentication', request.url);
        url.searchParams.set('from', pathname);

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|public/).*)'
    ]
};
