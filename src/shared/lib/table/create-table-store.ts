import { create } from 'zustand';

import {
  TableState,
  TableStore,
} from './types';

const INITIAL_STATE: TableState = {
  searchType: 'id',
  searchValue: '',
  selectedLimitCount: 10,
  totalCount: 0,
  currentPage: 1,
  filters: {},
};

export const createTableStore = () => {
  return create<TableStore>((set) => ({
    ...INITIAL_STATE,
    updateState: (newState) => set((state) => ({ ...state, ...newState })),
    resetState: () => set(INITIAL_STATE),
  }));
};
