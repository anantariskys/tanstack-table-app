import { Menu } from '@/schemas/menu';
import { getMenus } from '@/services/menus/getMenus';
import { MenuQueryParams } from '@/types/core/queryParams';
import { PaginatedResponseType } from '@/types/core/response';
import { useQuery } from '@tanstack/react-query';

export function useMenus(params?: MenuQueryParams) {
  return useQuery<PaginatedResponseType<Menu>>({
    queryKey: [
      'menus',
      {
        ...params,
      },
    ],
    queryFn: getMenus.bind(null, params),
    // queryFn: () => {
    //   return getMenus(params);
    // }
  });
}
