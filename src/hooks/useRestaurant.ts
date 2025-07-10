import { Restaurant } from '@/schemas/restaurant';
import { getRestaurant } from '@/services/restaurant/getRestaurant';

import { QueryParams } from '@/types/core/queryParams';
import { PaginatedResponseType } from '@/types/core/response';
import { useQuery } from '@tanstack/react-query';

export function useRestaurant(params?: QueryParams) {
  return useQuery<PaginatedResponseType<Restaurant>>({
    queryKey: [
      'restaurant',
      {
        ...params,
      },
    ],
    queryFn: getRestaurant.bind(null, params),
  });
}
