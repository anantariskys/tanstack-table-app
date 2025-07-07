import { Category } from '@/schemas/categories';
import { getCategories } from '@/services/categories/getCategories';
import { PaginatedResponseType } from '@/types/core/response';
import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  return useQuery<PaginatedResponseType<Category>>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
}
