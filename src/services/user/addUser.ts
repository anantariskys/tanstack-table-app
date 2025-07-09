import { CreateUserPayload, User } from '@/schemas/users/user';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function addUser(payload: CreateUserPayload): Promise<ResponseType<User>> {
  const session = await getSession();
  const response = await api.post('/user', payload, {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
  });
  return response.data;
}
