import { NextResponse, type NextRequest } from 'next/server'
import { defaultLocale, isValidLocale } from '@/lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (isValidLocale(firstSegment)) {
    return NextResponse.next()
  }

  const preferredLocale = request.cookies.get('NEXT_LOCALE')?.value
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const host = request.headers.get('host') ?? ''
  const isLocalhostRequest = host.includes('localhost') || host.includes('127.0.0.1') || host.includes('::1')

  let locale = isValidLocale(preferredLocale) ? preferredLocale : defaultLocale

  if (!preferredLocale) {
    if (isLocalhostRequest) {
      locale = acceptLanguage.toLowerCase().includes('id') ? 'id' : defaultLocale
    } else {
      // `request.geo` was removed in Next 15; the edge runtime exposes the
      // country via this header instead.
      const country = request.headers.get('x-vercel-ip-country')
      if (country === 'ID') {
        locale = 'id'
      }
    }
  }

  const targetPath = `/${locale}${pathname === '/' ? '' : pathname}${search}`
  const response = NextResponse.redirect(new URL(targetPath, request.url))
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
}
