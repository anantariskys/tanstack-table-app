export type QueryParams = Partial<{
  page: string | number;
  limit: string | number;
  search: string;
  orderBy: string;
  orderDirection: 'ASC' | 'DESC';
}>;

export type MenuQueryParams = QueryParams &
  Partial<{
    isAvailable: boolean;
  }>;
