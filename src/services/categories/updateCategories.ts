import { Category, UpdateCategoryPayload } from '@/schemas/categories';
import { ResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function updateCategories(
  payload: UpdateCategoryPayload & { id: number },
): Promise<ResponseType<Category>> {
  const session = await getSession();
  const response = await api.patch(`/categories/${payload.id}`, payload, {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
  });
  return response.data;
}
