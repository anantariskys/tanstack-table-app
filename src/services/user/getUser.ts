import { User } from '@/schemas/users/user';
import { QueryParams } from '@/types/core/queryParams';
import { PaginatedResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function getUser(params?: QueryParams): Promise<PaginatedResponseType<User>> {
  const session = await getSession();
  const response = await api.get('/user', {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
    params: {
      ...params,
    },
  });
  return response.data;
}
