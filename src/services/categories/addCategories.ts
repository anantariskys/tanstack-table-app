import { Category, CreateCategoryPayload } from '@/schemas/categories';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function addCategories(
  payload: CreateCategoryPayload,
): Promise<ResponseType<Category>> {
  const session = await getSession();
  const response = await api.post('/categories', payload, {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
  });
  return response.data;
}
