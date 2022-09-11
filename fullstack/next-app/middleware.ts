import { NextResponse, NextRequest } from 'next/server'

export function middleware(req, ev) {
    const { pathname } = req.nextUrl
    if (pathname == '/') {
        return NextResponse.redirect(new URL('/tasks', req.url))
    }
    return NextResponse.next()
}

