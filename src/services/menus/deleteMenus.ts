import { DeleteMenuPayload, Menu } from '@/schemas/menu';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function deleteMenus(payload: DeleteMenuPayload): Promise<ResponseType<Menu>> {
  const session = await getSession();
  const response = await api.delete(`/menus/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
  });
  return response.data;
}
