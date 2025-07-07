import { Menu } from '@/schemas/menu';
import { PaginatedResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function getMenus(): Promise<PaginatedResponseType<Menu>> {
  const session = await getSession();
  const response = await api.get('/menus', {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
  });
  return response.data;
}
