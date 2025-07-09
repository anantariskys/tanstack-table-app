import { UpdateUserPayload, User } from '@/schemas/users/user';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function updateUser(payload: UpdateUserPayload): Promise<ResponseType<User>> {
  const session = await getSession();
  const response = await api.patch(`/user/${payload.id}`, payload, {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
  });
  return response.data;
}
