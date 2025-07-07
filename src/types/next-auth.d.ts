import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    restaurantId: number;
    id: number;

    tokens?: {
      accessToken?: string;
      refreshToken?: string;
    };
    user: {
      email?: string | null;
    };
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    restaurantId: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}
