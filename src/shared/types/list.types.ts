export interface FilterConfig {
  key: string;
  defaultValue?: string;
}

export interface BaseListState {
  searchType: string;
  searchValue: string;
  selectedLimitCount: number;
  totalCount: number;
  currentPage: number;
  filters: Record<string, string>;
}

export interface BaseListActions {
  setSearchType: (value: string) => void;
  setSearchValue: (value: string) => void;
  setSelectedLimitCount: (count: number) => void;
  setTotalCount: (count: number) => void;
  setCurrentPage: (page: number) => void;
  onShowSizeChange: (current: number, pageSize: number) => void;
  onPageChange: (page: number, pageSize: number) => void;
  setFilter: (key: string, value: string) => void;
  setFilters: (newFilters: Record<string, string>) => void;
  setSearchParams: (params: { type?: string; value?: string }) => void;
  reset: () => void;
}
