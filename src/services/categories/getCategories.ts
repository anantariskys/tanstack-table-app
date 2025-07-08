import { Category } from '@/schemas/categories';
import { QueryParams } from '@/types/core/queryParams';
import { PaginatedResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function getCategories(params: QueryParams): Promise<PaginatedResponseType<Category>> {
  const session = await getSession();
  const response = await api.get('/categories', {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
    params,
  });
  return response.data;
}
