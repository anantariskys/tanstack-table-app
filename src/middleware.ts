export { auth as middleware } from '@/utils/auth';

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:js|css|png|jpg|jpeg|svg|ico|woff2?)$).*)',
  ],
};
