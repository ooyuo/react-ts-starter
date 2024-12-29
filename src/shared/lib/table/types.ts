export interface TableState {
  searchType: string;
  searchValue: string;
  currentPage: number;
  selectedLimitCount: number;
  filters: Record<string, string>;
  totalCount: number;
}

export interface TableStore extends TableState {
  updateState: (state: Partial<TableState>) => void;
  resetState: () => void;
}
