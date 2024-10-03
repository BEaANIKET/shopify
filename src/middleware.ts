import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuthToken } from './utils/auth';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const pathname = request.nextUrl.pathname;

    const isPublicRoute = ['/sign-in', '/sign-up'].includes(pathname);

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    if (token) {
        const user = await verifyAuthToken(token);

        if (!user) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }

        if (isPublicRoute) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (user.role !== 'Admin' && pathname.startsWith('/admin-view')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin-view/:path*', '/admin-view', '/dashboard', '/profile', '/account', '/sign-in', '/sign-up', '/ckeckout'],
};
