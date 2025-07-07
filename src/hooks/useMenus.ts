import { Menu } from '@/schemas/menu';
import { getMenus } from '@/services/menus/getMenus';
import { PaginatedResponseType } from '@/types/core/response';
import { useQuery } from '@tanstack/react-query';

export function useMenus() {
  return useQuery<PaginatedResponseType<Menu>>({
    queryKey: ['menus'],
    queryFn: getMenus,
  });
}
