import { createSearchParamsStore } from './create-search-params';

// 기본 필터 타입
export interface BaseFilters {
  search?: string;
  page?: number;
  limit?: number;
}

// 정렬 필터를 위한 제네릭 타입
export interface SortableFilters<T extends string> extends BaseFilters {
  sortBy?: T;
}

// 상태 필터를 위한 제네릭 타입
export interface StatusFilters<T extends string> extends BaseFilters {
  status?: T;
}

// 어드민 스토어 인터페이스
export interface AdminStore<T extends BaseFilters> {
  filters: T;
  setFilters: (filters: Partial<T>) => void;
}

export const createAdminStore = <T extends BaseFilters>(
  resource: string,
  initialFilters?: Partial<T>
) => {
  return createSearchParamsStore<AdminStore<T>>(
    `admin.${resource}`,
    (set) => ({
      filters: {
        page: 1,
        limit: 10,
        ...initialFilters,
      } as T,
      setFilters: (filters) => set((state) => ({
        ...state,
        filters: { ...state.filters, ...filters }
      })),
    }),
    { debounceTime: 300 }
  );
};

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface AdminListState<
  TFilter extends Record<string, any> = {},
  TSort extends string = string
> {
  pagination: PaginationState;
  filter: TFilter;
  sort: {
    field: TSort;
    order: 'asc' | 'desc';
  };
  search: string;
}

export interface AdminListActions<TFilter> {
  setPage: (page: number) => void;
  setFilter: (filter: Partial<TFilter>) => void;
  setSort: (field: string, order: 'asc' | 'desc') => void;
  setSearch: (search: string) => void;
  reset: () => void;
}
