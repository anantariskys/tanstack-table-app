import { Category } from '@/schemas/categories';
import { getCategories } from '@/services/categories/getCategories';
import { QueryParams } from '@/types/core/queryParams';
import { PaginatedResponseType } from '@/types/core/response';
import { useQuery } from '@tanstack/react-query';

export function useCategories(params: QueryParams) {
  return useQuery<PaginatedResponseType<Category>>({
    queryKey: [
      'categories',
      {
        ...params,
      },
    ],
    queryFn: getCategories.bind(null, params),
  });
}
