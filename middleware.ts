import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'fr'];
const DEFAULT_LOCALE = 'fr';

function detectLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('Accept-Language') ?? '';
  const langs = acceptLang.split(',').map(l => l.split(';')[0].trim().toLowerCase());
  for (const lang of langs) {
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('en')) return 'en';
  }
  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|favicon\\.ico|locales|.*\\..*).*)', '/'],
};
