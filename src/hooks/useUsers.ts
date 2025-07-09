import { User } from '@/schemas/users/user';
import { getUser } from '@/services/user/getUser';
import { QueryParams } from '@/types/core/queryParams';
import { PaginatedResponseType } from '@/types/core/response';
import { useQuery } from '@tanstack/react-query';

export function useUser(params?: QueryParams) {
  return useQuery<PaginatedResponseType<User>>({
    queryKey: [
      'user',
      {
        ...params,
      },
    ],
    queryFn: getUser.bind(null, params),
  });
}
