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

          if (res.data.email && res.data.accessToken) {
            const decodedToken = JSON.parse(atob(res.data.accessToken.split('.')[1]));
            return {
              email: res.data.email,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              id: decodedToken.id,
              restaurantId: decodedToken.restaurantId,
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
    async jwt({ token, user }) {
      console.log('jwt callback', { token, user });
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.restaurantId = user.restaurantId;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('session callback', { session, token });
      const formatSession = {
        ...session,
        tokens: {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        },
        id: token.id,
        restaurantId: token.restaurantId,
      };
      return formatSession;
    },
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
