import { Category, DeleteCategoryPayload, UpdateCategoryPayload } from '@/schemas/categories';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function deleteCategories(
  payload: DeleteCategoryPayload,
): Promise<ResponseType<Category>> {
  const session = await getSession();
  const response = await api.delete(`/categories/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
  });
  return response.data;
}
