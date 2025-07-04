import { login } from '@/services/auth/login';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const res = await login({
            email: email,
            password: password,
          });
          console.log('Authorization response:', res);

          if (res.data.email && res.data.accessToken) {
            return {
              email: res.data.email,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            };
          }
          return null;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublicPath =
        nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register');

      if (isPublicPath) {
        if (isLoggedIn) {
          return Response.redirect(new URL('/', nextUrl));
        }
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
