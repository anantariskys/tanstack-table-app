import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { User } from '@/schemas/users/user';
import { jwtDecode } from 'jwt-decode';
export function useProfile(): User | null {
  const session = useSession();

  return useMemo(() => {
    if (!session.data?.tokens?.accessToken) return null;

    try {
      const decodedAT = jwtDecode(session.data.tokens.accessToken) as User;
      return decodedAT;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }, [session.data?.tokens?.accessToken]);
}
