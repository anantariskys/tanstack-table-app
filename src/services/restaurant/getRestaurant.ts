import { Restaurant } from '@/schemas/restaurant';
import { QueryParams } from '@/types/core/queryParams';
import { PaginatedResponseType } from '@/types/core/response';
import { api } from '@/utils/axios';
import { getSession } from 'next-auth/react';

export async function getRestaurant(
  params?: QueryParams,
): Promise<PaginatedResponseType<Restaurant>> {
  const session = await getSession();

  const response = await api.get('/restaurant', {
    headers: {
      Authorization: `Bearer ${session?.tokens?.accessToken}`,
    },
    params,
  });

  return response.data;
}
