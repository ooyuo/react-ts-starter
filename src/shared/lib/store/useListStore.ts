import { create } from 'zustand';

interface FilterConfig {
  key: string;
  defaultValue?: string;
}

interface ListState {
  searchType: string;
  searchValue: string;
  selectedLimitCount: number;
  totalCount: number;
  currentPage: number;
  filters: Record<string, string>;
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

const createInitialFilters = (filterConfigs: FilterConfig[]) => {
  return filterConfigs.reduce(
    (acc, { key, defaultValue }) => ({
      ...acc,
      [key]: defaultValue || '',
    }),
    {}
  );
};

export const createListStore = (storeName: string, filterConfigs: FilterConfig[] = []) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[${storeName}] 리스트 store 생성`);
  }

  const INITIAL_STATE = {
    searchType: 'id',
    searchValue: '',
    selectedLimitCount: 10,
    totalCount: 0,
    currentPage: 1,
    filters: createInitialFilters(filterConfigs),
  };

  return create<ListState>()(set => ({
    ...INITIAL_STATE,
    setSearchType: (value: string) =>
      set(state => ({
        ...state,
        searchType: value,
        currentPage: 1,
      })),
    setSearchValue: (value: string) =>
      set(state => ({
        ...state,
        searchValue: value,
        currentPage: 1,
      })),
    setSelectedLimitCount: (count: number) =>
      set(state => ({
        ...state,
        selectedLimitCount: count,
      })),
    setTotalCount: (count: number) =>
      set(state => ({
        ...state,
        totalCount: count,
      })),
    setCurrentPage: (page: number) =>
      set(state => ({
        ...state,
        currentPage: page,
      })),
    onShowSizeChange: (current: number, pageSize: number) =>
      set(state => {
        if (pageSize !== state.selectedLimitCount) {
          return { selectedLimitCount: pageSize, currentPage: 1 };
        }
        return { currentPage: current };
      }),
    onPageChange: (page: number, pageSize: number) =>
      set(state => ({
        ...state,
        currentPage: page,
        selectedLimitCount: pageSize,
      })),
    setFilter: (key: string, value: string) =>
      set(state => ({
        ...state,
        filters: {
          ...state.filters,
          [key]: value,
        },
        currentPage: 1,
      })),
    setFilters: (newFilters: Record<string, string>) =>
      set(state => ({
        ...state,
        filters: {
          ...state.filters,
          ...newFilters,
        },
        currentPage: 1,
      })),
    setSearchParams: (params: { type?: string; value?: string }) =>
      set(state => ({
        ...state,
        ...params,
        currentPage: 1,
      })),
    reset: () => set(INITIAL_STATE),
  }));
};
