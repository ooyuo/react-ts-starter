import { create } from 'zustand';
import { INITIAL_LIST_STATE } from '@/shared/constants/list.constants';
import type { BaseListState, BaseListActions, FilterConfig } from '@/shared/types/list.types';

const createInitialFilters = (filterConfigs: FilterConfig[]) => {
  return filterConfigs.reduce(
    (acc, { key, defaultValue }) => ({
      ...acc,
      [key]: defaultValue || '',
    }),
    {}
  );
};

export const createBaseListStore = (storeName: string, filterConfigs: FilterConfig[] = []) => {
  if (process.env.NODE_ENV === 'development') {
    console.debug(`[${storeName}] 리스트 store 생성`);
  }

  const INITIAL_STATE = {
    ...INITIAL_LIST_STATE,
    filters: createInitialFilters(filterConfigs),
  };

  return create<BaseListState & BaseListActions>()(set => ({
    ...INITIAL_STATE,
    setSearchType: value => set(state => ({ ...state, searchType: value, currentPage: 1 })),
    setSearchValue: value => set(state => ({ ...state, searchValue: value, currentPage: 1 })),
    setSelectedLimitCount: count => set(state => ({ ...state, selectedLimitCount: count })),
    setTotalCount: count => set(state => ({ ...state, totalCount: count })),
    setCurrentPage: page => set(state => ({ ...state, currentPage: page })),
    onShowSizeChange: (current, pageSize) =>
      set(state => {
        if (pageSize !== state.selectedLimitCount) {
          return { selectedLimitCount: pageSize, currentPage: 1 };
        }
        return { currentPage: current };
      }),
    onPageChange: (page, pageSize) =>
      set(state => ({
        ...state,
        currentPage: page,
        selectedLimitCount: pageSize,
      })),
    setFilter: (key, value) =>
      set(state => ({
        ...state,
        filters: { ...state.filters, [key]: value },
        currentPage: 1,
      })),
    setFilters: newFilters =>
      set(state => ({
        ...state,
        filters: { ...state.filters, ...newFilters },
        currentPage: 1,
      })),
    setSearchParams: params => set(state => ({ ...state, ...params, currentPage: 1 })),
    reset: () => set(INITIAL_STATE),
  }));
};
