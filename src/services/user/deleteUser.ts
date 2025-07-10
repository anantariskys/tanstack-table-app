import { DeleteUserPayload, User } from '@/schemas/users/user';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function deleteUser(payload: DeleteUserPayload): Promise<ResponseType<User>> {
  const session = await getSession();
  const response = await api.delete(`/user/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
  });
  return response.data;
}
