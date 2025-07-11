import { Menu } from '@/schemas/menu';
import { MenuQueryParams } from '@/types/core/queryParams';
import { PaginatedResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function getMenus(params?: MenuQueryParams): Promise<PaginatedResponseType<Menu>> {
  const session = await getSession();
  const response = await api.get('/menus', {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
    params: {
      ...params,
    },
  });
  return response.data;
}
